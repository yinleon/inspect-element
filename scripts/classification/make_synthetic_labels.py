"""
make synthetic annotation files for the classification chapter, so students have something to
compare their own labels against before real hand labels exist. these are NOT real annotations.

input: data/classification/intermediary/voting_to_annotate.csv, the segments the keywords or the llm flagged,
written by classification_llms.ipynb.

outputs, in the same format label_segments.py writes (video_id, id, contains_voting_human,
interesting, reviewer, note):
- fn_reference (annotator c): a reference label for every segment, made by claude reading each segment and
  asking whether it mentions elections or voting. only segments in NOT_VOTING are False; the
  reason for each is recorded below. legislative votes and contests where fans vote count as
  False, since the question is about elections.
- fn_synthetic_a, fn_synthetic_b (annotators a and b): two fake annotators built from the reference. each one skips
  N_SKIP segments (mostly ambiguous ones, one skip shared) and gets N_WRONG of the segments it
  answers wrong, about 95% accuracy on answered segments. their errors don't overlap, so the two
  agree on about 85% of segments overall.

rows are written in the order the labeling tools show them (shuffled with SEED), like a real
labeling session. reviewers are named "annotator a" through "annotator c"; this docstring is the
record that a and b are synthetic and c is claude's reference labels.

usage, from the root of the repo: python scripts/classification/make_synthetic_labels.py
"""
import csv
import os
import random

fn_segments = "data/classification/intermediary/voting_to_annotate.csv"
fn_reference = "data/classification/hand/voting_labels_annotator_c.csv"
fn_synthetic_a = "data/classification/hand/voting_labels_annotator_a.csv"
fn_synthetic_b = "data/classification/hand/voting_labels_annotator_b.csv"

SEED = 303
N_WRONG = 5
fieldnames = ["video_id", "id", "contains_voting_human", "interesting", "reviewer", "note"]

# (video_id, id): why the segment does not mention elections or voting
NOT_VOTING = {
    ("2VLBqkj2nDM", "121"): "congressional votes on ukraine funding, not an election",
    ("VvrDprBY0bE", "345"): "fans vote in a fitness challenge",
    ("dyj7Dvay8mY", "134"): "segment is just 'Yeah.'",
    ("e0F90AY4tmc", "201"): "garbled 'my vote' in a story about jesus",
    ("nUPZBAE5c2k", "257"): "'2024 election' used as an analogy for nfl free agency",
    ("r0ifUDz20tc", "34"): "fans vote in a contest",
    ("r0ifUDz20tc", "43"): "fans vote on a 100k contest",
    ("zFCfU9cBIRA", "266"): "'Vote away.' with no context",
}

# skips, with the note each annotator leaves. one is shared, the rest are ambiguous segments
SKIPS_A = {
    ("zFCfU9cBIRA", "266"): "no context",
    ("nUPZBAE5c2k", "257"): "election as a metaphor?",
    ("2VLBqkj2nDM", "121"): "congress votes count?",
}
SKIPS_B = {
    ("zFCfU9cBIRA", "266"): "can't tell what they're voting on",
    ("e0F90AY4tmc", "201"): "transcription error?",
    ("bJomPd9oj9I", "140"): "garbled, 'shoot an election'?",
}

# segments each annotator marks interesting, with a note
INTERESTING_A = {
    ("S7BTdUaNQM8", "34"): "trump on early voting and paper ballots",
    ("2VLBqkj2nDM", "366"): "sendthevote pitch aimed at 18 to 30",
}
INTERESTING_B = {
    ("S7BTdUaNQM8", "34"): "paper ballots and voter id",
    ("rERky4xzbLM", "279"): "first vote was for a republican",
}


def write_labels(fn, rows):
    with open(fn, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def make_annotator(reviewer, truth, order, skips, wrong, interesting):
    rows = []
    for key in order:
        if key in skips:
            answer, note = "", skips[key]
        else:
            answer = str(truth[key] != (key in wrong))
            note = interesting.get(key, "")
        rows.append({
            "video_id": key[0],
            "id": key[1],
            "contains_voting_human": answer,
            "interesting": "True" if key in interesting else "",
            "reviewer": reviewer,
            "note": note,
        })
    return rows


if os.path.exists(fn_reference):
    print(f"{fn_reference} exists, skipping")
else:
    os.makedirs("data/classification/hand", exist_ok=True)

    with open(fn_segments) as f:
        keys = [(row["video_id"], row["id"]) for row in csv.DictReader(f)]
    assert set(NOT_VOTING) <= set(keys), "a NOT_VOTING segment is missing from fn_segments"
    truth = {key: key not in NOT_VOTING for key in keys}

    # the order the labeling tools show segments in
    order = list(keys)
    random.Random(SEED).shuffle(order)

    write_labels(fn_reference, [
        {"video_id": k[0], "id": k[1], "contains_voting_human": str(truth[k]),
         "interesting": "", "reviewer": "annotator c", "note": NOT_VOTING.get(k, "")}
        for k in order
    ])

    # disjoint errors, drawn from segments neither annotator skipped
    rng = random.Random(SEED)
    answerable = sorted(k for k in keys if k not in SKIPS_A and k not in SKIPS_B)
    wrong = rng.sample(answerable, 2 * N_WRONG)
    wrong_a, wrong_b = set(wrong[:N_WRONG]), set(wrong[N_WRONG:])

    rows_a = make_annotator("annotator a", truth, order, SKIPS_A, wrong_a, INTERESTING_A)
    rows_b = make_annotator("annotator b", truth, order, SKIPS_B, wrong_b, INTERESTING_B)
    write_labels(fn_synthetic_a, rows_a)
    write_labels(fn_synthetic_b, rows_b)

    # report how the synthetic annotators did
    for rows in (rows_a, rows_b):
        answered = [r for r in rows if r["contains_voting_human"]]
        correct = sum(r["contains_voting_human"] == str(truth[(r["video_id"], r["id"])]) for r in answered)
        print(f"{rows[0]['reviewer']}: {correct} of {len(answered)} answered correct ({correct / len(answered):.0%}), {len(rows) - len(answered)} skipped")
    agree = sum(a["contains_voting_human"] == b["contains_voting_human"] for a, b in zip(rows_a, rows_b))
    print(f"a and b agree on {agree} of {len(rows_a)} segments ({agree / len(rows_a):.0%})")
    print(f"annotator c (reference): {sum(truth.values())} True, {len(truth) - sum(truth.values())} False")
