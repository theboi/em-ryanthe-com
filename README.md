# em-ryanthe-com

Utility embeds for Notion 🔥.

## Motivation

[Notion](http://notion.com) is a useful tool and works wonders for most use-cases. However, `em-ryanthe-com` was created to further extend the potential usage of Notion through Notion embeds. Note: Notion embeds come with some drawbacks described below.

## Features

|||
|-|-|
|cd|Countdown Timer|
|sb|SST Student Blog Proxy|
|bv|Bible Verses|

## Usage

Before usage, a small side note is that Notion embeds do come at a cost—should the server be down, the embeds would fail to show and data would be hard to be viewed.

### cd: Countdown

- Navigate to `em.ryanthe.com/cd`.
- Click `Add` to create a new countdown timer.
- Fill in the appropriate details.
- Click the alert on top to copy the new URL.
- Replace the URL in the Notion embed with it.

### sb: Student Blog

- Navigate to `em.ryanthe.com/sb`.
- To open a link in Notion embeds, right-click and click `Open Link`.
- The page will open in a new window.

### bv: Bible Verses

- Navigate to [em.ryanthe.com/bv/`ref`](em.ryanthe.com/bv).
- `ref` refers to the Bible verse as per stated on http://bible-api.com. E.g. [em.ryanthe.com/bv/psalms 23](em.ryanthe.com/bv/psalms%2023) or [em.ryanthe.com/bv/jonah 1:3](em.ryanthe.com/bv/jonah%201:3)
- Varying translations can be specified with the `t` query. E.g. [em.ryanthe.com/bv/jonah 1:3?t=web](em.ryanthe.com/bv/psalms%2023?t=web). Default: `kjv`
- Currently, the site uses the aforementioned API service which supports a very small subset of translations.

## Contribution

Contributions for new embeds (that are useful for most people) are welcome via pull requests.

## License

Licensed under the [MIT](LICENSE.txt) license.