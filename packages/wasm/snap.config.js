module.exports = {
  cliOptions: {
    port: 8087,
    src: './src/index.ts',
  },
  bundlerCustomizer: (bundler) => {
    bundler.transform('brfs');
  },
};
