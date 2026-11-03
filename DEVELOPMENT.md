# Maintain the video notes reader

Use Node.js 22.23.4 or newer. Run `npm install`, then `npm run dev -- --background`. Manage the server with `npm run astro -- dev status`, `npm run astro -- dev logs`, and `npm run astro -- dev stop`.

## Add or edit notes

Use `notes/` as the working library for beta prompts, Claude Code, Obsidian, and local edits. Read [notes/AGENTS.md](notes/AGENTS.md) for the generation workflow and frontmatter example. The root `CLAUDE.md` imports the repository instructions for Claude Code.

Video and course metadata lives in each folder's README frontmatter. The first Markdown `#` heading supplies the displayed title; frontmatter `title` is the fallback. Chapter titles come from their own headings. The reader displays the title once and leaves source Markdown intact. Chapters inherit the video's source information in the reader.

Run `npm run tags` before adding tags. Use existing lowercase hyphenated values when they describe the same topic. For machine-readable counts, run `npm run tags -- --json`.

New notes appear on the next build without editing a central catalog. Restart the development server after changing the note catalog. Before pushing, run:

```sh
npm test
npm run check
npm run build
```

The build runs `validate:library`, checks publishing metadata and internal Markdown links, copies assets, and generates the static site in `dist/`. Deployment from a GitHub branch must be configured separately with a static hosting provider.

## Enable GitHub editing

Edit links use `https://github.com/cmglezpdev/video-notes` and the `main` branch by default. These settings are committed in `src/lib/repository.ts` and work without environment variables.

To use another repository or branch, copy `.env.example` to `.env` and set `GITHUB_REPOSITORY_URL` and `GITHUB_EDIT_BRANCH`. Configure those overrides in the deployment environment too, then rebuild.

Each article's **Edit on GitHub** link opens that exact Markdown file, preserving filename case. GitHub handles sign-in, editing, branches, forks, and proposing a pull request. The reader has no account system. The link stays hidden while the repository URL is unset.

After merging a web edit, pull the repository before editing locally. Local edits and AI-assisted changes follow the same Git workflow.

## Understand generated media

Keep covers beside their Markdown in `notes/`. `scripts/sync-media.mjs` copies non-Markdown assets to `public/media/` before development and builds. That directory is generated and excluded from Git. Maintain the originals, then rebuild to refresh the website. Relative note links become website routes during rendering. YouTube timestamps stay external, and Mermaid blocks render in the reader.

## Import from another folder

```sh
npm run import:notes -- "/path/to/original/video-notes"
```

The importer copies Markdown and images, skips identical files, and stops before writing if an existing file differs. It preserves imported bytes and records hashes in `.local/import-manifest.json`. It does not synchronize two working libraries. Existing iCloud notes without frontmatter differ from migrated local READMEs; reconcile those deliberately instead of reimporting over local edits.

## Repeat the legacy metadata migration

`npm run migrate:frontmatter -- /path/to/legacy-metadata.json` accepts a JSON object with `videos` and `courses` dictionaries keyed by folder path. Each entry uses the old `name`, `description`, `url`, `image`, `tags`, `language`, `channel`, and `duration` fields.

The migration adds YAML to README files, converts local cover paths and tag spelling, preserves every body byte, and skips files that already have frontmatter. A local snapshot of the previous catalog is in `.local/legacy-metadata.json`; it is excluded from Git and is not needed for normal operation.
