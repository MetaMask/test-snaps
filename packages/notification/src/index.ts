/// <reference path="../../../types/wallet.d.ts" />
import { OnRpcRequestHandler } from '@metamask/snap-types';

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
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
            message: `Hello, ${origin}!`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
