// eslint-disable-next-line node/global-require
const through = require('through2');

module.exports = {
  cliOptions: {
    port: 8009,
    src: './src/index.ts',
    transpilationMode: 'localOnly',
  },
  bundlerCustomizer: (bundler) => {
    bundler.transform('brfs');
    bundler.transform(function () {
      let data = '';
      return through(
        function (buf, _enc, cb) {
          data += buf;
          cb();
        },
        function (cb) {
          this.push("globalThis.Buffer = require('buffer/').Buffer;");
          this.push(data);
          cb();
        },
      );
    });
  },
};
