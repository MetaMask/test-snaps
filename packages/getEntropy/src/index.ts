// import { DialogType } from '@metamask/rpc-methods';
import { ethErrors } from 'eth-rpc-errors';
import { OnRpcRequestHandler } from '@metamask/snaps-types';
// import { panel, text, heading, copyable } from '@metamask/snaps-ui';
// import { getPublicKey, sign } from '@noble/bls12-381';
import { remove0x } from '@metamask/utils';
// import { deriveBIP44AddressKey } from '@metamask/key-tree';

const getPrivateKey = async () => {
  const coinTypeNode = await snap.request({
    method: 'snap_getEntropy',
    params: {
      version: 1,
    },
  });
  return remove0x(coinTypeNode);
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getEntropyOutput': {
      return getPrivateKey();
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
