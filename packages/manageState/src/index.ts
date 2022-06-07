/// <reference path="../../../types/wallet.d.ts" />

// eslint-disable-next-line import/unambiguous
module.exports.onMessage = async (_originString, requestObject) => {
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
    case 'storeTestData':
      state.testState.push(requestObject.params[0]);
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state],
      });
      return true;
    case 'retrieveTestData':
      return await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });
    case 'clearTestData':
      await wallet.request({
        method: 'snap_manageState',
        params: ['clear'],
      });
      return true;

    default:
      throw new Error('Method not found.');
  }
};
