module.exports = {
    createLocationTag: (location) => `<url><loc>${location}</loc></url>`,
    createSitemap: (locations) => `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`
};
