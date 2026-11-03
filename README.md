# Rewind

Keep what you learn.

A public library of video notes, transcripts, and courses, with an Astro, Tailwind CSS, and TypeScript reader. The Markdown stays in the repository so you can read it in Obsidian, edit it locally, or ask an AI assistant questions about a transcript.

The configured website address is `https://rewind.cmglezp.dev`. Hosting and DNS are configured separately.

## Run locally

Use Node.js 22.23.4 or newer.

```sh
npm install
npm run dev -- --background
```

Open the local URL printed by Astro. Run `npm run astro -- dev stop` to stop the server.

## Add notes

Create video folders inside `notes/`. Each video keeps its README, topic notes, transcript, and cover together. Video metadata lives in README frontmatter, and the reader uses the existing Markdown heading as its title.

Before generating notes with an AI assistant, follow [the note generation instructions](notes/AGENTS.md). Run `npm run tags` to reuse existing tags and `npm run build` to validate the library and generate the website.

## Edit a published note

Choose **Edit on GitHub** in the reader to open the source Markdown on the `main` branch. GitHub handles editing and proposing a pull request. After merging a change, pull the repository to update your local notes.

See [DEVELOPMENT.md](DEVELOPMENT.md) for validation commands, media generation, metadata, imports, and repository configuration. Website hosting is configured separately.
