from IPython.display import display, Markdown


def build_buttons(link, github):
    """
    Used to generate github, collab, and website-linked buttons
    """
    display(Markdown(f"""
<button type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="{link}">📖 Read online</button>
<button type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="https://colab.research.google.com/github/{github.split(".com/")[-1]}">🖥️ Interactive version</button>
<button type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="{github}">⚙️ GitHub</button>
<br>
"""))