const { promises: fs } = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const FileNames = {
  icon: 'icon.svg',
  style: 'style.css',
  index: 'index.html',
  script: 'test-snaps.js',
  image: 'snaps-ascii-to-logo.gif',
  font1: 'EuclidCircularB-Bold.woff',
  font2: 'EuclidCircularB-Regular.woff',
};

const rootPath = path.resolve(__dirname, '../');

const packagesPath = path.resolve(rootPath, '../');
const srcPath = path.join(rootPath, 'src/');
const distPath = path.join(rootPath, 'dist/');

main(process.argv[2]).catch((error) => {
  throw error;
});

/**
 * Builds the test snaps website. Assumes that every other package in the
 * monorepo is a valid snap, and that `local:` snap IDs are consistent and
 * computable only knowing the `cliOptions.port` value of their `snap.config.js`
 * files.
 *
 * See {@link getSnapIdMap} for additional details.
 *
 * @param {string} mode - The build mode. Either `dev` or `prod`.
 */
async function main(mode) {
  const snapIdMap = await getSnapIdMap();

  await mkdirp(distPath);
  await copyToDist(FileNames.icon);
  await copyToDist(FileNames.style);
  await copyToDist(FileNames.script);
  await copyToDist(FileNames.image);
  await copyToDist(FileNames.font1);
  await copyToDist(FileNames.font2);

  if (mode === 'dev') {
    await copyToDist(FileNames.index);
  } else if (mode === 'prod') {
    let htmlContents = await fs.readFile(
      path.join(srcPath, FileNames.index),
      'utf8',
    );

    // Replace all instances of all local IDs with their corresponding npm IDs.
    for (const [localId, npmId] of snapIdMap) {
      // Node.js 14.x doesn't have `String.prototype.replaceAll`
      while (htmlContents.indexOf(localId) !== -1) {
        htmlContents = htmlContents.replace(localId, npmId);
      }
    }

    await fs.writeFile(path.join(distPath, FileNames.index), htmlContents);
  } else {
    throw new Error(`Unknown build mode: "${mode}"`);
  }
}

/**
 * Copies the specified file from `./src` to `./dist`.
 *
 * @param {string} fileName - The name of the file to copy.
 */
async function copyToDist(fileName) {
  await fs.copyFile(
    path.join(srcPath, fileName),
    path.join(distPath, fileName),
  );
}

/**
 * Gets the local and npm ID of each snap in this monorepo and returns a mapping
 * between them. Assumes that each monorepo package other than this one (i.e.
 * the website) is a snap with the following files in their root directories:
 * - `snap.config.js`, with `cliOptions: { port }` set.
 * - `package.json`, with `name` set.
 *
 * @returns {Promise<Map<string, string>>} A map of `local:` snap IDs to `npm:` snap IDs.
 */
async function getSnapIdMap() {
  const splitRootPath = rootPath.split(path.sep);
  const rootDirName = splitRootPath[splitRootPath.length - 1];

  return (await fs.readdir(packagesPath, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory() && dirent.name !== rootDirName)
    .reduce((idMap, dirent) => {
      const packagePath = path.join(packagesPath, dirent.name);

      try {
        const {
          cliOptions: { port },
        } = require(path.join(packagePath, 'snap.config.js'));

        const { name: packageName } = require(path.join(
          packagePath,
          'package.json',
        ));

        idMap.set(`local:http://localhost:${port}`, `npm:${packageName}`);
      } catch (error) {
        console.error(`Failed to read package at "${packagePath}".\n`);
        throw error;
      }
      return idMap;
    }, new Map());
}
