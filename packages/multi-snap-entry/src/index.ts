import { OnRpcRequestHandler } from '@metamask/snap-types';
import openrpcDocument from './openrpc.json';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const params = request.params as string[];
  switch (request.method) {
    case 'rpc.discover':
      return openrpcDocument;
    case 'confirm':
      return wallet.request({
        method: 'wallet_invokeSnap',
        params: [
          'local:http://localhost:8081',
          {
            method: 'confirm',
            params,
          }
        ]
      });
    default:
      throw new Error('Method not found.');
  }
};
