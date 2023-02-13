from IPython.display import display, Markdown


def build_buttons(link, github):
    """
    Used to generate github, collab, and website-linked buttons
    """
    display(Markdown(f"""
<a type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="https://inspectelement.org/{link}">📖 Read online</a>
<a type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="https://colab.research.google.com/github/{github.split(".com/")[-1]}">🖥️ Interactive version</a>
<a type="button" class="btn btn-outline-primary btn-sm" target="_blank" href="{github}">⚙️ GitHub</a>
<br>
"""))