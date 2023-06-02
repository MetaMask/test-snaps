import { OnRpcRequestHandler } from '@metamask/snaps-types';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'send': {
      return snap.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:@metamask/test-snap-bip32',
          request: {
            method: 'getPublicKey',
            params: {
              path: ['m', "44'", "0'"],
              curve: 'secp256k1',
              compressed: true,
            },
          },
        },
      });
    }

    default:
      throw new Error('Method not found.');
  }
};
