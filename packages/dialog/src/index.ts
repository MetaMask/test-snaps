import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text, heading } from '@metamask/snaps-ui';
import openrpcDocument from './openrpc.json';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  // const params = request.params as object;
  switch (request.method) {
    case 'rpc.discover':
      return openrpcDocument;
    case 'dialogAlert':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Alert',
          content: panel([heading('Alert Dialog'), text('Text here')]),
        },
      });
    case 'dialogConf':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([heading('Confirmation Dialog'), text('Text here')]),
        },
      });
    case 'dialogPrompt':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Prompt',
          content: panel([heading('Prompt Dialog'), text('Text here')]),
          placeholder: 'placeholder',
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
