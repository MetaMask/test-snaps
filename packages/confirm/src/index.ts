// eslint-disable-next-line import/unambiguous
wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  switch (requestObject.method) {
    case 'confirm':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: requestObject.params[0] || 'Hello',
            description: requestObject.params[1],
            textAreaContent: requestObject.params[2],
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
});
