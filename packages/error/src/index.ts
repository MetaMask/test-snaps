/// <reference path="../../../types/wallet.d.ts" />

/* eslint-disable import/unambiguous */
module.exports.onMessage = async () => {
  // eslint-disable-next-line no-new
  new Promise((resolve, _reject) => {
    let num = 0;
    while (num < 100) {
      // eslint-disable-next-line no-plusplus
      num++;
    }
    throw new Error('random error inside');
    resolve(undefined);
  });
  return 'foo';
};
