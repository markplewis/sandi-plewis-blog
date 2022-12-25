# Sandi Plewis' blog

This repository contains a [Next.js](https://nextjs.org) application that serves as the front-end for [www.sandiplewis.com](https://www.sandiplewis.com).

A separate [Sanity](https://www.sanity.io)-powered CMS provides content for this application to consume, via the Sanity API.

This project uses [Vercel](https://vercel.com) for continuous integration and delivery (CI/CD), [Mailgun](https://www.mailgun.com/) for email delivery, and [MongoDB](https://www.mongodb.com/atlas/database) for user authentication.

### VSCode plugins

You'll want to install the following VSCode plugins:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Sanity.io](https://marketplace.visualstudio.com/items?itemName=sanity-io.vscode-sanity)

### Installation

Duplicate the `.env.local.example` file and rename it to `.env.local`. Then, copy and paste the listed environment variables, tokens, IDs and secrets from your [Vercel project dashboard](https://vercel.com). See `.env.local.example` for more information.

Once the environment variables are ready, run the following command to install the project dependencies:

```bash
npm install
```

### MongoDB Compass

Optionally install [MongoDB Compass](https://www.mongodb.com/products/compass)

### Startup

You can fire up the development server via:

```bash
npm dev
```

The application will run at `http://localhost:3000`.

### Production builds

Whenever a Vercel build is initiated, Vercel runs `npm run build`, which creates an optimized production build of the application (see the script comments in `package.json` for more information). This generates a `.next` directory, which Vercel then deploys to the production server.

If you run `npm run build` locally, you'll see the statically-built HTML files, etc. in the `.next/server/pages/` directory.

### CLI documentation

- Next.js: https://nextjs.org/docs/api-reference/cli
