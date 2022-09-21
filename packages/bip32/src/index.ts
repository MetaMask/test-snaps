import { ethErrors } from 'eth-rpc-errors';
import { JsonSLIP10Node, SLIP10Node } from '@metamask/key-tree';
import { OnRpcRequestHandler } from '@metamask/snap-types';

interface GetAccountParams {
  path: string;
  curve?: 'secp256k1' | 'ed25519';

  [key: string]: unknown;
}

const getPrivateKey = async (params: GetAccountParams): Promise<string> => {
  const json = (await wallet.request({
    method: 'snap_getBip32Entropy',
    params,
  })) as JsonSLIP10Node;

  const node = await SLIP10Node.fromJSON(json);
  return node.privateKey as string;
};

const getPublicKey = async (params: GetAccountParams): Promise<string> => {
  return (await wallet.request({
    method: 'snap_getBip32PublicKey',
    params,
  })) as string;
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getAccount':
      return await getPrivateKey(request.params as GetAccountParams);

    case 'getPublicKey':
      return await getPublicKey(request.params as GetAccountParams);

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
