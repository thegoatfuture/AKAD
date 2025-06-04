# Public Directory

This directory contains static files that are served directly at the root of the website.
Nuxt does not process the files placed here. Use it for assets like the site favicon,
robots.txt and other images that must be accessible via an absolute URL.

Example structure:

```
public/
  favicon.ico        -> https://your-domain.com/favicon.ico
  images/logo.png    -> https://your-domain.com/images/logo.png
  robots.txt         -> https://your-domain.com/robots.txt
```

Keep in mind that large files placed here will be downloaded by visitors without
any optimization, so only store assets that need to be publicly available as-is.
