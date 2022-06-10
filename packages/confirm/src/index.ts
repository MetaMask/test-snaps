/// <reference path="../../../types/wallet.d.ts" />

import openrpcDocument from './openrpc.json';

// eslint-disable-next-line import/unambiguous
export const onRpcMessage = async ({ request }) => {
  switch (request.method) {
    case 'rpc.discover':
      return openrpcDocument;
    case 'confirm':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: request.params[0] || 'Hello',
            description: request.params[1],
            textAreaContent: request.params[2],
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
