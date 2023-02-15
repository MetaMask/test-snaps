import { OnRpcRequestHandler } from '@metamask/snaps-types';

const OTHER_SNAP_ID = 'npm:@metamask/test-snap-bip32';

/**
 * Request access to {@link OTHER_SNAP_ID} if it is not already connected.
 */
const requestSnap = async () => {
  const snaps = (await snap.request({ method: 'wallet_getSnaps' })) as Record<
    string,
    unknown
  >;

  if (!snaps[OTHER_SNAP_ID]) {
    await snap.request({
      method: 'wallet_requestSnaps',
      params: {
        [OTHER_SNAP_ID]: {},
      },
    });
  }
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'send': {
      await requestSnap();

      return snap.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: OTHER_SNAP_ID,
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
