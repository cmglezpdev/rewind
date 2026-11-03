# Generate and maintain video notes

Use this workflow when a beta prompt asks you to generate video or playlist notes. Run commands from the repository root even when the session starts inside a video folder.

1. Run `npm run tags` to see the tags already used in the library. Reuse tags with the same meaning. Add a new tag only for a distinct topic; use lowercase hyphenated words, such as `llm-evaluation`. Keep broad and specific topics distinct when both are useful.
2. Create standalone videos under `notes/<video-slug>/`. Create playlist lessons under `notes/<course-slug>/<lesson-slug>/`. Keep README files, numbered topic files, `transcript.md`, and `cover.webp` together. When updating an existing video, preserve its folder and file names so published links continue to work.
3. Add YAML frontmatter to the video README using the example below. If beta already supplied frontmatter, validate and complete it. Use the provided source data for the URL, channel, duration, and language; use the notes or transcript for a concise description and relevant tags. Preserve existing human edits and unrelated Obsidian properties. Ask for missing source facts rather than inventing them.
4. Keep the original `# Title` and Markdown body. The first top-level `#` heading is the displayed title; `title` in frontmatter is the fallback when that heading is absent. Put shared video metadata in its README. Chapters and the transcript inherit it in the website and may remain plain Markdown.
5. For a course README, add `title`, `description`, and the playlist or course `url`. Optional `tags` describe the course. Each lesson keeps its own video metadata.
6. Run `npm run validate:library` and resolve reported metadata or link errors before handing back the notes. Review the Markdown and transcript for accuracy. Commit or publish only when the user requests it.

## Video README frontmatter

```yaml
---
title: The video title
description: A short description of the video's main ideas.
url: https://www.youtube.com/watch?v=VIDEO_ID
image: ./cover.webp
tags:
  - ai-coding
  - agent-workflows
language: en
channel: The source channel
duration: "12:34"
---
# The video title
```

Use `url` for the source video. Quote duration strings. `image` is optional when `cover.webp` exists; use a relative path for local images. Keep relative Markdown links between notes. Generate covers beside the source notes; the build copies assets into `public/media/` automatically.

`description`, `url`, at least one tag, and `language` are required for publishing a video. Include channel and duration when source data provides them. `title` is optional when the body has a `#` heading. Frontmatter uses the schema in `src/lib/frontmatter.ts`; extra Obsidian properties are allowed.

`npm run tags -- --json` produces tag names and usage counts for scripts. Instructions files are excluded from the article catalog.
