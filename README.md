<p align="center">
    <img style="width:10%;" src="./public/logo.png" />
</p>

<h2 align="center">Ranobe Blog</h2>

<h4 align="center">Quiet corner of the internet for light novel thoughts, discussions, and observations.</h4>

<p align="center">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg"/>
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"/>
</p>

## Introduction

**Ranobe Blog** is a personal Vietnamese light-novel blog: a quiet corner for long-form reviews, essays, and interviews, wrapped in a clean, reading-first design.

Under the hood it's a **statically generated** Next.js app. Pages are pre-rendered at build time for fast, cheap hosting, while a built-in CMS keeps writing as simple as typing: save a post and a single Git push takes it live.

## Features

- **Themed columns & author profiles**: every post belongs to a category (series/column) and carries an author byline with its own profile page. Categories and authors are declared in `constants.tsx`.
- **Rich article rendering**: posts are MDX, so prose mixes freely with interactive components such as a `SeriesDetail` info panel for light-novel metadata, embedded YouTube, syntax-highlighted code, and optimized images.
- **In-browser CMS**: a Keystatic admin panel at `/keystatic` for creating and editing posts with a WYSIWYG editor, no hand-editing of files required.
- **Instant fuzzy search**: a command-palette-style search that matches titles, descriptions, light-novel details, and body text, and is forgiving of Vietnamese diacritics.
- **Dark mode** and **smooth page/scroll animations**.
- **Animated splash / welcome screen** shown once per session.
- A work-in-progress **giveaway page** (`/ga`).

## Key Techniques

### Static MDX articles

Each article is a single `.mdx` file in `posts/`, with **YAML frontmatter** for its metadata (title, author, thumbnail, publish date, description, category). Next.js compiles MDX at build time via `@next/mdx`, and the App Router statically generates one page per post under `app/blog/[slug]/`.

Frontmatter is turned into a JS `metadata` export by the `remark-frontmatter` + `remark-mdx-frontmatter` plugin pair (configured in `next.config.mjs`). This lets both the page renderer and the listing pages read a post's metadata by simply importing the file. (Note: under Turbopack these remark plugins must be referenced by **string name**, not by import.)

### Custom MDX component mapping

`mdx-components.tsx` remaps standard Markdown elements to Tailwind-styled React components, so every heading, paragraph, list, blockquote, and link renders in the blog's house style. Notably:

- `img` is rendered through **`next/image`** for automatic optimization and lazy-loading.
- Inline vs. fenced code is split into separate components.
- Custom blocks such as **`SeriesDetail`** (the light-novel info panel) and **`YouTube`** are exposed as MDX components so they can be used directly in article bodies.

### Keystatic CMS (local storage)

The site uses [Keystatic](https://keystatic.com/) as its authoring layer, configured in `keystatic.config.ts` with `storage: { kind: "local" }`. Editing happens on the author's machine and is committed via Git; there is no online/GitHub editing mode. The `posts` collection defines the frontmatter fields as typed inputs (selects for author/category, an image field for the thumbnail, an MDX editor for the body), and registers `SeriesDetail` as an insertable block.

### Build-time search index + accent-insensitive fuzzy search

Search runs entirely client-side, but the data it searches is prepared at build time:

- `scripts/export-posts.mjs` reads every post, strips MDX/Markdown scaffolding down to plain prose, extracts the `<SeriesDetail>` attributes, and **normalizes Vietnamese accents** (e.g. `á → a`, `đ → d`). It writes the result to `public/posts.json`. This script runs automatically before `dev` and `build` (`predev` / `prebuild`), and the output is gitignored.
- On the client, `components/common/search-function.tsx` lazily fetches `posts.json`, builds a **[Fuse.js](https://www.fusejs.io/)** index with weighted fields (title highest, body text lowest), and searches the accent-normalized query with debounced input. The result is typo- and diacritic-tolerant matching without any backend.

### Per-post thumbnail convention

Keystatic namespaces a collection's uploaded assets under the entry's slug. A post's thumbnail is therefore stored at `public/posts/<slug>/thumbnail.<ext>` and referenced in frontmatter as an absolute path `/posts/<slug>/thumbnail.<ext>`, which is used directly as the image `src` (see [Images](#images)).

## Authoring Content

Posts live in `posts/*.mdx`. The easiest way to write them is through the Keystatic UI:

1. Run `yarn dev` and open [`http://localhost:3000/keystatic`](http://localhost:3000/keystatic).
2. Create or edit a post. Fill in the title, author, thumbnail, publish date, description, and category, then write the body in the MDX editor.
3. Insert the **light-novel info panel** with the `SeriesDetail` block from the editor's insert menu, and fill in its fields (JP/VN titles, publisher, illustrator, volumes, translation links, etc.).
4. Save, and Keystatic writes the `.mdx` file directly into `posts/`.
5. Run `git commit && git push`, and the deploy platform rebuilds the static site.

### Images

There are two kinds of images, handled differently:

- **Thumbnail**: uploaded through Keystatic's image field. Keystatic stores it under the post's slug folder at `public/posts/<slug>/thumbnail.<ext>`, and records it in frontmatter as `/posts/<slug>/thumbnail.<ext>`. That value is an absolute web path used directly as the image `src`, so it just works both in the site and in the Keystatic editor preview.
- **In-body images**: hosted externally on **Cloudinary** and pasted into the body as standard Markdown image syntax: `![alt](https://res.cloudinary.com/...)`. Cloudinary is the only remote image host allowed in `next.config.mjs`. This keeps large illustration files out of the repository.

## Deployment

The app is a standard static Next.js build; any host that runs `yarn build` works (e.g. Vercel). The search index is regenerated as part of `prebuild`, so no manual step is needed. The typical flow is: edit posts locally in Keystatic, commit, push, and the host rebuilds and redeploys.
