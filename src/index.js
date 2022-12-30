const {Reporter} = require("@parcel/plugin");
const {createLocationTag, createSitemap} = require("./sitemap");
const path = require("path");
const fs = require("fs");

const isIndexable = (bundle) => !bundle.displayName.startsWith('_') && bundle.displayName.endsWith('.html');

const normalizePath = (p) => p.replace(/[\\/]+/g, "/");

const writeSiteMap = ([distDir, {siteURL, bundles, sitemapPath}]) => {
    const bundleToLocation = (bundle) => {
        const location = normalizePath(`${siteURL}/${path.relative(distDir, bundle.filePath)}`);
        return createLocationTag(location);
    };

    const locationTags = bundles
        // keep order stable
        .sort()
        .map(bundleToLocation)
        .join('\n');

    const sitemap = createSitemap(locationTags);

    fs.writeFileSync(sitemapPath, sitemap);

    return sitemapPath;
}



Array.prototype.tapMap = function(f){
  return this.map((...args) => {
      f.apply(this, args);
      return args[0];
  })
};

module.exports = new Reporter({
    async report({event, logger}) {
        if (event.type !== 'buildSuccess') {
            return;
        }

        const printInfo = ([distDir, {sitemapPath}]) => {
            logger.info({
                message: `🎸 Sitemap written to ${sitemapPath}`
            });
        }

        [...event.bundleGraph.getBundles()
            .filter(isIndexable)
            .reduce((m, bundle) => {

                if (!m.has(bundle.target.distDir)) {
                    m.set(bundle.target.distDir, {
                        siteURL: process.env.PARCEL_SITEMAP_SITE_URL || bundle.target.publicUrl,
                        sitemapPath: path.join(bundle.target.distDir, 'sitemap.xml'),
                        bundles: []
                    });
                }

                m.get(bundle.target.distDir).bundles.push(bundle);

                return m;
            }, new Map())
            .entries()]
            .tapMap(writeSiteMap)
            .forEach(printInfo)
    },
})
