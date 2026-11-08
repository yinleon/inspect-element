"""
label transcript segments by hand: does the segment mention elections or voting?

a simple labeling loop, adapted from the terminal tool used in the memories project.
shows one segment at a time with a youtube link to the moment it starts, and saves each
answer to fn_labels as soon as it's given, so a rerun picks up where you left off.
segments are shown in a seeded random order so review isn't biased toward whichever
video happens to sort first.

answers: t = true, f = false, s = skip (not sure), b = undo last, q = quit.
add i to mark a segment as interesting, independent of the answer, e.g. "ti" or "fi".
anything typed after the answer is saved as a note, e.g. "f talking about a selection".

input: data/classification/intermediary/voting_to_annotate.csv, every segment the keywords or the llm flagged,
written by classification_llms.ipynb. columns video_id, id, start, end, text; neither method's
label is included, so you label blind.
output: data/classification/hand/voting_labels.csv with columns video_id, id, contains_voting_human, interesting,
reviewer, note. contains_voting_human is True, False, or blank for skipped, the same values as the
llm's contains_voting_llm. interesting is True or blank.

usage, from the root of the repo: python scripts/classification/label_segments.py yourname
"""
import csv
import os
import random
import sys

fn_segments = "data/classification/intermediary/voting_to_annotate.csv"
fn_labels = "data/classification/hand/voting_labels.csv"

SEED = 303
fieldnames = ["video_id", "id", "contains_voting_human", "interesting", "reviewer", "note"]
answers = {"t": "True", "f": "False", "s": ""}

reviewer = sys.argv[1] if len(sys.argv) > 1 else input("your name > ").strip()

# one row per segment, shuffled the same way every time
with open(fn_segments) as f:
    segments = list(csv.DictReader(f))
random.Random(SEED).shuffle(segments)

# skip segments this reviewer already labeled
done = set()
if os.path.exists(fn_labels):
    with open(fn_labels) as f:
        for row in csv.DictReader(f):
            if row["reviewer"] == reviewer:
                done.add((row["video_id"], row["id"]))
queue = [seg for seg in segments if (seg["video_id"], seg["id"]) not in done]
print(f"{len(segments) - len(queue)} of {len(segments)} already labeled by {reviewer}")

os.makedirs("data/classification/hand", exist_ok=True)
is_new = not os.path.exists(fn_labels)
f = open(fn_labels, "a", newline="")
writer = csv.DictWriter(f, fieldnames=fieldnames)
if is_new:
    writer.writeheader()
    f.flush()

history = []  # (position in queue, file size before writing) for undo
i = 0
while i < len(queue):
    seg = queue[i]
    url = f"https://www.youtube.com/watch?v={seg['video_id']}&t={int(float(seg['start']))}s"
    print("\n" + "-" * 70)
    print(f"{len(segments) - len(queue) + i + 1} of {len(segments)}  |  {url}")
    print(seg["text"].strip())
    print("-" * 70)

    reply = input("mentions elections or voting? [t/f/s, add i = interesting, b = undo, q = quit] > ").strip()
    key, _, note = reply.partition(" ")
    key = key.lower()
    interesting = "i" in key and key != "i"
    key = key.replace("i", "") if interesting else key

    if key == "q":
        break
    if key == "b":
        if history:
            i, size = history.pop()
            f.truncate(size)
            f.seek(0, os.SEEK_END)
        else:
            print("nothing to undo")
        continue
    if key not in answers:
        print("answer t, f, s (add i for interesting), b or q")
        continue

    history.append((i, f.tell()))
    writer.writerow({
        "video_id": seg["video_id"],
        "id": seg["id"],
        "contains_voting_human": answers[key],
        "interesting": "True" if interesting else "",
        "reviewer": reviewer,
        "note": note,
    })
    f.flush()
    i += 1

f.close()
print(f"labels saved to {fn_labels}")
