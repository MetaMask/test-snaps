import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { DialogType } from '@metamask/rpc-methods';
import openrpcDocument from './openrpc.json';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const params = request.params as string[];
  switch (request.method) {
    case 'rpc.discover':
      return openrpcDocument;
    case 'dialogAlert':
      return snap.request({
        method: 'snap_dialog',
        params: [
          {
            type: DialogType.Alert,
            title: params[0] || 'Hello',
            description: params[1],
            textAreaContent: params[2],
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
