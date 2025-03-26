# Ecosystem Alpha Test — Next.js SPA

This project is a fully client-side rendered **Single Page Application (SPA)** built with [Next.js](https://nextjs.org) and deployed to **GitHub Pages**.

## 🧠 Features

- Full SPA architecture — no SSR or dynamic routing
- Product catalog with:
    - Filtering by category, price, and title
    - Like system
    - Product creation, editing, and deletion
- Global state management with Zustand
- Tailwind CSS styling
- Responsive layout

---

## 🚀 Getting Started (Development)

To start the local dev server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

You can edit src/app/page.tsx to customize the main SPA logic.


🧾 Deployment on GitHub Pages
To deploy the project to GitHub Pages, follow these steps:

1. ✅ Enable static export in next.config.ts
   Before building for production, uncomment the following lines in your next.config.ts:
```bash
basePath: '/ecosystem-alpha-test',
assetPrefix: '/ecosystem-alpha-test/',
```
These lines are required so that all assets load correctly from the GitHub Pages subpath.

Your next.config.ts should look like this before building:
```bash
const nextConfig = {
  output: 'export',
  basePath: '/ecosystem-alpha-test',
  assetPrefix: '/ecosystem-alpha-test/',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '**',
      },
    ],
  },
};
```

2. 🔨 Build & Deploy
   Make sure you have gh-pages installed:
```bash
npm install gh-pages --save-dev
```
Then in your package.json add or update these scripts:
```bash
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out"
}
```
Now you can deploy with:
```bash
npm run deploy
```
✅ Live Demo
Your site will be available at:
```bash
https://<your-github-username>.github.io/<repository-name>/
```
🧠 Notes
GitHub Pages supports static exports only (output: 'export' is required).

If you see ERR_ABORTED 404 errors in the console — you likely forgot to set basePath and assetPrefix before building.

You must re-build (npm run build) every time before deploying.