# CartonIQ Website

A responsive, static company website for CartonIQ. Built with plain HTML, CSS, and JavaScript so it can be hosted on Cloudflare Pages without a build step.

## Included
- Hybrid dark hero + light product/service sections
- Responsive mobile navigation
- Product search and category filters
- Product detail modals
- Inquiry form that prepares an email to `cartoniq.business@gmail.com`
- Privacy note and terms modal
- Roadmap for future customer accounts and admin tools
- Basic SEO metadata and reduced-motion support

## Deploy to Cloudflare Pages (Git integration)
1. Upload `index.html` and this `README.md` to the root of the `cartoniq-website` GitHub repository.
2. In Cloudflare Dashboard, open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select `cartoniq-website`.
4. For a plain static site, leave the build command blank and set the build output directory to `/` if Cloudflare requires an output directory. If the interface rejects `/`, use the direct-upload workflow or a supported output directory; do not add a framework preset.
5. Deploy. Cloudflare will provide a `*.pages.dev` URL.

## Important scope note
This first release is a static front end. The inquiry form opens the visitor's email app; it does not send or store form data by itself. Customer accounts, database, payments, and an admin dashboard are not enabled. Add those later with a secure backend/auth provider, server-side authorization, and an updated privacy policy. Never put private API keys in browser JavaScript.

## Editing products
In `index.html`, edit the product cards inside `#appGrid` and the `products` object in the JavaScript section together. Update availability labels to reflect the real status of each product.
