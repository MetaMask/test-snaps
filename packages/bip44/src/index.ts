import { ethErrors } from 'eth-rpc-errors';
import { getPublicKey, sign } from '@noble/bls12-381';
import {
  deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { bytesToHex, remove0x } from '@metamask/utils';

interface GetAccountParams {
  coinType: number;
  [key: string]: unknown;
}

/**
 * Get a private key for the specified coin type.
 *
 * @param coinType - The coin type to get the private key for.
 * @returns The private key as Uint8Array.
 */
const getPrivateKey = async (coinType = 1) => {
  const coinTypeNode = (await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType,
    },
  })) as JsonBIP44CoinTypeNode;

  return remove0x(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (
      await deriveBIP44AddressKey(coinTypeNode, {
        account: 0,
        change: 0,
        address_index: 0,
      })
    ).privateKey!,
  );
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'getAccount': {
      const params = request.params as GetAccountParams;
      return bytesToHex(getPublicKey(await getPrivateKey(params?.coinType)));
    }

    case 'signMessage': {
      const privateKey = await getPrivateKey();
      const pubKey = getPublicKey(privateKey);
      const data = (request.params as string[])[0];

      if (!data || typeof data !== 'string') {
        throw ethErrors.rpc.invalidParams({
          message: `Invalid signature data: "${data}".`,
        });
      }

      const approved = await snap.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'BLS signature request',
            textAreaContent: `Do you want to BLS sign ${data} with ${bytesToHex(
              pubKey,
            )}?`,
          },
        ],
      });
      if (!approved) {
        throw ethErrors.provider.userRejectedRequest();
      }
      const newLocal = await sign(new TextEncoder().encode(data), privateKey);
      return bytesToHex(newLocal);
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: request.method },
      });
  }
};
