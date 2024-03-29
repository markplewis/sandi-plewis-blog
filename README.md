# Sandi Plewis' blog

This repository contains a [Next.js](https://nextjs.org) application that serves as the front-end for [www.sandiplewis.com](https://www.sandiplewis.com).

A separate [Sanity](https://www.sanity.io)-powered CMS provides content for this application to consume, via the Sanity API.

This project uses:

- [Vercel](https://vercel.com) for continuous integration and delivery (CI/CD)
- [Mailgun](https://www.mailgun.com/) for email delivery
- [MongoDB](https://www.mongodb.com/atlas/database) for user authentication

At the time of this writing, this project was using:

- [Node](https://nodejs.org/) 18
- [NPM](https://www.npmjs.com/) 8

## VSCode plugins

You'll want to install the following VSCode plugins:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [ES6 String HTML](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) (for syntax highlighting within template literal strings)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Sanity.io](https://marketplace.visualstudio.com/items?itemName=sanity-io.vscode-sanity) (for GROQ syntax highlighting)

## Installation

Duplicate the `.env.local.example` file and rename it to `.env.local`. Then, copy and paste the listed environment variables, tokens, IDs and secrets from your [Vercel project dashboard](https://vercel.com). See `.env.local.example` for more information.

Once the environment variables are ready, run the following command to install the project dependencies:

```bash
# Install project dependencies
npm install

# Install Husky pre-push Git hook (see `.husky/pre-push`)
npm run prepare
```

## MongoDB Compass

Optionally install the [MongoDB Compass](https://www.mongodb.com/products/compass) desktop application.

## Startup

You can fire up the development server via:

```bash
npm run dev
```

The application will run at `http://localhost:3000`.

## Production builds

Whenever a Vercel build is initiated, Vercel runs `npm run build`, which creates an optimized production build of the application (see the script comments in `package.json` for more information). This generates a `.next` directory, which Vercel then deploys to the production server.

If you run `npm run build` locally, you'll see the statically-built HTML files, etc. in the `.next/server/pages/` directory.

See the [Next.js CLI documentation](https://nextjs.org/docs/api-reference/cli).

## Application details

### Preview mode

This app uses [next-sanity](https://github.com/sanity-io/next-sanity) to provide a [live, real-time preview experience](https://github.com/sanity-io/next-sanity#custom-token-auth) for authenticatd users. Here's how it works:

1. Navigating to `/login` will redirect you to the Sanity Studio login page where you can manage all of the documents that the Next.js application consumes.
2. Navigating to `/admin` (in a sepatate browser tab) will bring you to an [Auth.js](https://authjs.dev/)-powered login form (a.k.a. [next-auth](https://github.com/nextauthjs/next-auth)).
3. Upon form submission, the application will check whether the submitted email address belongs to an existing user in the [MongoDB](https://www.mongodb.com/atlas/database) database (see `pages/api/auth/[...nextauth].js`). If so, then an email containing a "magic link" will be sent to that address.
4. Clicking the "magic link" will redirect you back to the website, where you'll be logged in (your session will be stored in the [MongoDB](https://www.mongodb.com/atlas/database) database).
5. You'll then be immediately redirected to `/api/preview` where, via an [authentication token](https://github.com/sanity-io/next-sanity#custom-token-auth), [next-sanity](https://github.com/sanity-io/next-sanity) will setup the listeners, etc. that are required in order to start streaming the Sanity dataset to the browser.
6. You'll then be redirected back to the home page and a "preview mode" banner will appear at the top of the page until you log out by pressing the "Sign out" button (which logs you out of your Auth.js session then makes a request to `/api/exit-preview` to terminate preview mode).

### Variables in CSS media queries

Unfortunately, it [isn't possible to use CSS custom properties in media queries](https://bholmes.dev/blog/alternative-to-css-variable-media-queries/), like this:

```css
@media (min-width: var(--bp-768)) {
  /* styles */
}
```

However, it may [eventually be possible to use CSS environment variables in media queries](https://drafts.csswg.org/css-env-1/), like this:

```css
@media (min-width: env(--bp-768)) {
  /* styles */
}
```

> Because environment variables don’t depend on the value of anything drawn from a particular
> element, they can be used in places where there is no obvious element to draw from, such as
> in @media rules, where the var() function would not be valid.

For a while, it was possible to polyfill this functionality via PostCSS, using [postcss-env-function](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-env-function),
however, it was [removed from `postcss-preset-env` in version 8](https://github.com/csstools/postcss-plugins/wiki/PostCSS-Preset-Env-8). See:

- https://blog.logrocket.com/why-you-should-use-css-env-9ee719ce0f24/
- https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-env-function

So, this project now uses [postcss-design-tokens](https://github.com/csstools/postcss-plugins/tree/postcss-preset-env--v8/plugins/postcss-design-tokens) to achieve the same thing. It isn't quite as nice
but it works (see: `styles/design-tokens.json` and `styles/design-tokens.js`). Here's an example:

```css
@design-tokens url("../design-tokens.json") format("style-dictionary3");

@media (min-width: token("breakpoints.w768" to rem)) {
  /* styles */
}
```

## Image aspect ratios

- Novel and short story covers: 9:14 (portrait)
- Author headshots: 1:1 (square)
- Blog post hero images: 5:2 or 3:2 (depending on the breakpoint)
- Blog post body photos: 3:2 (landscape) or 3:4 (portrait)

## TODO

- Reeplace all GROQ queries with [GROQD](https://formidable.com/open-source/groqd/), then eventually replace GROQD with whatever "typed GROQ" solution that Sanity comes up with: https://github.com/sanity-io/client/issues/89#issuecomment-1497614581
- Document how to seed the MongoDB datbase and/or create new users
- Document our CSS methodologies and process, as per: https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/

- Text size: rem
- Borders: px
- Horizontal margin and padding: px
- Vertical margin on text: em
- Media queries: rem
