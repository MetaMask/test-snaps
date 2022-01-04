// eslint-disable-next-line import/unambiguous
wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case 'sign':
      return wallet.request({
        method: 'snap_confirm',
        params: [{ prompt: 'Hello' }],
      });
    default:
      throw new Error('Method not found.');
  }
});
