# Parcel (v2) Sitemap Plugin

A [parcel](https://github.com/parcel-bundler/parcel) plugin for creating (very) basic sitemaps.

### Disclaimer:

This plugin will not create a fully featured [sitemap](https://www.sitemaps.org/protocol.html), but the most basic one, that is still valid. Parcel makes it generally very easy for you to create a sitemap manually, as html files keep their names while beeing processed. So **if you want to achieve perfect SEO optimization you should not use this plugin** but create a sitemap manually.

*However*, if you just want to make sure all pages are listed so that search engines can crawl them, this plugin has you covered.

## Installation

```bash
npm install -D parcel-reporter-sitemap

# or with yarn

yarn add -D parcel-reporter-sitemap
```

## Configuration

Once the packager is installed, create or update `.parcelrc` accordingly:


```json
{
  "extends": ["@parcel/config-default"],
  "reporters":  ["parcel-reporter-sitemap"]
}
```

Sitemap reporter configuration is done through environment variables.

- `PARCEL_SITEMAP_SITE_URL`: location where your site will be hosted

If not specified `parcel-reporter-sitemap` will fallback to Parcel "public-url".

```
PARCEL_SITEMAP_SITE_URL="https://my.website.tld/"
```

## More info

- https://github.com/parcel-bundler/parcel#parcelrcreporters
- https://github.com/parcel-bundler/parcel#reporters

## Contribute

You're interested in contributing? Awesome! Fork, make change, commit and create pull request. I'll do my best to merge changes!


## License

MIT License
