const {spawnSync} = require('child_process');
const test = require('ava');
const pack = require('../package.json');
const {readFileSync} = require("fs");
const {resolve} = require("path");

function runTest(testName, folderName) {
    test(testName, t => {
        const res = spawnSync('bash', ['-c', `npm link && cd ${resolve(__dirname, '../examples/' + folderName)} && npm i && npm link ${pack.name} && npm run build`], {
            encoding: 'utf-8'
        });
        t.true(!(res instanceof Error));

        t.snapshot(readFileSync(resolve(__dirname, `../examples/${folderName}/dist/sitemap.xml`), {encoding: 'utf-8'}));
    });
}

runTest('option: default', 'default');
runTest('option: uses specified public-url', 'public-url');
runTest('option: uses specified PARCEL_SITEMAP_SITE_URL', 'environment-variable');
