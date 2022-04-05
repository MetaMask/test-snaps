/// <reference path="../../../types/wallet.d.ts" />

import { ethErrors } from 'eth-rpc-errors';
import { getPublicKey, sign } from '@noble/bls12-381';
import {
  deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';

let PRIVATE_KEY: Uint8Array;

wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  if (!PRIVATE_KEY) {
    await initialize();
  }

  switch (requestObject.method) {
    case 'getAccount':
      return getPublicKey(PRIVATE_KEY);

    case 'signMessage': {
      const pubKey = getPublicKey(PRIVATE_KEY);
      const data = requestObject.params[0];

      const approved = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'BLS signature request',
            textAreaContent: `Do you want to BLS sign ${data} with ${pubKey}?`,
          },
        ],
      });
      if (!approved) {
        throw ethErrors.provider.userRejectedRequest();
      }

      return await sign(requestObject.params[0], PRIVATE_KEY);
    }

    default:
      throw ethErrors.rpc.methodNotFound({
        data: { method: requestObject.method },
      });
  }
});

/**
 * Calls `snap_getBip44Entropy_1` and sets {@link PRIVATE_KEY} to an address key
 * derived from the received `coin_type` entropy.
 */
async function initialize() {
  const coinTypeNode = (await wallet.request({
    method: 'snap_getBip44Entropy_1',
  })) as JsonBIP44CoinTypeNode;

  PRIVATE_KEY = deriveBIP44AddressKey(coinTypeNode, {
    account: 0,
    change: 0,
    address_index: 0,
  }).slice(0, 32);
}
