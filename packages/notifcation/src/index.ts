/// <reference path="../../../types/wallet.d.ts" />

// eslint-disable-next-line import/unambiguous
wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'inApp':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: `TEST INAPP NOTIFICATION`,
          },
        ],
      });
    case 'native':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'native',
            message: `TEST NATIVE NOTIFICATION`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
});
