# Snapbooth

Static website for Snapbooth photo booth rentals in New York and New Jersey.

## Website files

`dist/` contains the complete website: HTML, CSS, JavaScript, photos, animated GIFs, and favicon. No build step or package installation is required.

Open `dist/index.html` to preview locally, or serve `dist/` using a static web server.

## Deploy

For a static host such as Cloudflare Pages, select `main` as the production branch, leave the build command empty, and set the output directory to `dist`.

Configure the custom domain in the hosting dashboard before changing Squarespace DNS. Keep domain registration and renewal with Squarespace. Use the DNS records supplied by the selected host; records for ChatGPT Sites will not connect to another host.

## Integrations

- Inquiry form: Formspree endpoint configured in `dist/index.html`; submission handling in `dist/inquiry.js`.
- Live chat: Tawk.to embed configured in `dist/index.html`.
- Form and chat accounts remain managed separately by the owner.

## Editing

Update `dist/index.html` for content, `dist/style.css` for layout, and `dist/app.js` for interactions. Media files are in `dist/assets/`.

Photos and review content belong to their respective owners. This repository does not grant permission to reuse them.
