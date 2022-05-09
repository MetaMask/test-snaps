/// <reference path="../../../types/wallet.d.ts" />

// bs comment out 050622
// import openrpcDocument from './openrpc.json';

// eslint-disable-next-line import/unambiguous
wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  let state = (await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  })) as { testState: string[] } | null;

  if (!state) {
    state = { testState: [] };
    // initialize state if empty and set default data
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', state],
    });
  }

  switch (requestObject.method) {
    //  bs comment out 050622
    //  case 'rpc.discover':
    //    return openrpcDocument;
    case 'storeTestData':
      state.testState.push(requestObject.params[0]);
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state],
      });
      return true;
    case 'retrieveTestData':
      return state;
    case 'clearTestData':
      await wallet.request({
        method: 'snap_manageState',
        params: ['clear'],
      });

    default:
      throw new Error('Method not found.');
  }
});
