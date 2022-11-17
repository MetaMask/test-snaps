import { ethErrors } from 'eth-rpc-errors';
import { JsonSLIP10Node, SLIP10Node } from '@metamask/key-tree';
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { sign as signEd25519 } from '@noble/ed25519';
import {
  add0x,
  assert,
  bytesToHex,
  stringToBytes,
  remove0x,
} from '@metamask/utils';
import { sign as signSecp256k1 } from '@noble/secp256k1';

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
  const json = (await snap.request({
    method: 'snap_getBip32Entropy',
    params,
  })) as JsonSLIP10Node;

  return SLIP10Node.fromJSON(json);
};

const getPublicKey = async (params: GetAccountParams): Promise<string> => {
  return (await snap.request({
    method: 'snap_getBip32PublicKey',
    params,
  })) as string;
};

// eslint-disable-next-line consistent-return
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getPublicKey':
      return await getPublicKey(request.params as GetAccountParams);

    case 'signMessage': {
      const { message, curve, ...params } = request.params as SignMessageParams;

      if (!message || typeof message !== 'string') {
        throw ethErrors.rpc.invalidParams({
          message: `Invalid signature data: "${message}".`,
        });
      }

      const node = await getSLIP10Node({ ...params, curve });

      assert(node.privateKey);
      assert(curve === 'ed25519' || curve === 'secp256k1');

      const approved = await snap.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Signature request',
            textAreaContent: `Do you want to ${curve} sign ${message} with ${add0x(
              node.publicKey,
            )}?`,
          },
        ],
      });

      if (!approved) {
        throw ethErrors.provider.userRejectedRequest();
      }

      if (curve === 'ed25519') {
        const signed = await signEd25519(
          stringToBytes(message),
          remove0x(node.privateKey),
        );
        return bytesToHex(signed);
      }

      if (curve === 'secp256k1') {
        const signed = await signSecp256k1(
          stringToBytes(message),
          remove0x(node.privateKey),
        );
        return bytesToHex(signed);
      }

      break;
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
