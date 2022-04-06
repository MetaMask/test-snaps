# Test Snap Repo

This is a repo for snaps for testing.

## Usage

1. Run `yarn build` to build all snaps and the website
2. Run `yarn serve` to serve the snaps and the index page

Go to http://localhost:8080 and see the test app.

## Contributing

The website build script makes certain assumptions about the monorepo, its snaps, and the contents of the website. Specifically, it assumes that every other package in the `packages/` directory is a valid snap, and that each snap has a `snap.config.js` with `cliOptions.port` set to a valid port number.

Finally, the website's `index.html` must have each snap's `local:` ID hardcoded of the form `local:http://localhost:PORT` where `PORT` is the port number from its `snap.config.js` file. This allows the website build script to replace these values with the corresponding `npm:` IDs for GitHub pages deployments.
