import { ethErrors } from 'eth-rpc-errors';
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { remove0x } from '@metamask/utils';

const getEntropy = async () => {
  const entropy = await snap.request({
    method: 'snap_getEntropy',
    params: {
      version: 1,
    },
  });
  return remove0x(entropy);
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getEntropyOutput': {
      return getEntropy();
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
