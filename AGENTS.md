## Required destination for generated notes

Before writing files for any new video or playlist, read [notes/AGENTS.md](notes/AGENTS.md) and resolve the destination from the repository root:

- Standalone video: `<repo>/notes/<video-slug>/`.
- Playlist: `<repo>/notes/<course-slug>/`, with lessons beneath it.
- Keep each video's README, chapters, transcript, and cover together inside that destination.

These paths apply regardless of the terminal's current directory or a pasted prompt's relative output path. A prompt saying `./<video-slug>/` means `<repo>/notes/<video-slug>/` here. Never create a video or course folder directly under the repository root, and never create `notes/notes/` when starting inside `notes/`.

For example, `anthropic-can-t-stop-winning` belongs at `<repo>/notes/anthropic-can-t-stop-winning/`. Run `npm run validate:library` from the repository root before declaring generation complete; misplaced content must be moved into `notes/` first.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Editing existing notes

Before adding frontmatter or editing a video or course, read [notes/AGENTS.md](notes/AGENTS.md). Preserve the existing folder and file names inside `notes/` so published links remain valid.

