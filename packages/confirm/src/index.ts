import { OnRpcRequestHandler } from '@metamask/snaps-types';
import openrpcDocument from './openrpc.json';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const params = request.params as string[];
  switch (request.method) {
    case 'rpc.discover':
      return openrpcDocument;
    case 'confirm':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: params[0] || 'Hello',
            description: params[1],
            textAreaContent: params[2],
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
