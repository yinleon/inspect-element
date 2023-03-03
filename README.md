# Inspect Element

This repository is used to render a [Quarto](https://quarto.org/) website.

For tutorials refer to the Jupyter Notebooks (ending with `.ipynb`).

Apologies for having everything unorganized in the top-level directory, once I figure out Quanto a bit more, I'll reorganize

## For contributors

This site used Github pages and actions to publish the site.
Do not push any changes or work on the `gh-pages` branch, as that is auto-populated using the `quarto publish gh-pages` command.

Read about how this works [here](https://quarto.org/docs/publishing/github-pages.html).

To preview the website locally, run:
```
quarto preview
```

Test the speed of the page here:
https://pagespeed.web.dev/report?url=https%3A%2F%2Finspectelement.org%2F&form_factor=desktop

Make images small using tools such as https://tinypng.com/