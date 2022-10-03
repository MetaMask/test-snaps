import { ethErrors } from 'eth-rpc-errors';
import { JsonSLIP10Node, SLIP10Node } from '@metamask/key-tree';
import { OnRpcRequestHandler } from '@metamask/snap-types';
import { sign } from '@noble/ed25519';

interface GetAccountParams {
  path: string;
  curve?: 'secp256k1' | 'ed25519';

  [key: string]: unknown;
}

interface SignMessageParams extends GetAccountParams {
  message: string;

  [key: string]: unknown;
}

const getSLIP10Node = async (params: GetAccountParams): Promise<SLIP10Node> => {
  const json = (await wallet.request({
    method: 'snap_getBip32Entropy',
    params,
  })) as JsonSLIP10Node;

  return SLIP10Node.fromJSON(json);
};

const getPublicKey = async (params: GetAccountParams): Promise<string> => {
  return (await wallet.request({
    method: 'snap_getBip32PublicKey',
    params,
  })) as string;
};

const toHex = (array: Uint8Array) =>
  `0x${Object.values(array)
    .map((num) => num.toString(16))
    .join('')}`;

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getPublicKey':
      return await getPublicKey(request.params as GetAccountParams);

    case 'signMessage': {
      const { message, ...params } = request.params as SignMessageParams;

      if (!message || typeof message !== 'string') {
        throw ethErrors.rpc.invalidParams({
          message: `Invalid signature data: "${message}".`,
        });
      }

      const node = await getSLIP10Node(params);

      const approved = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Signature request',
            textAreaContent: `Do you want to ed25519 sign ${message} with 0x${node.publicKey}?`,
          },
        ],
      });

      if (!approved) {
        throw ethErrors.provider.userRejectedRequest();
      }

      const signed = await sign(
        new TextEncoder().encode(message),
        node.privateKey as string,
      );
      return toHex(signed);
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
