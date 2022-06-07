import { ethErrors } from 'eth-rpc-errors';
import { getPublicKey, sign } from '@noble/bls12-381';
import {
  deriveBIP44AddressKey,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';

let PRIVATE_KEY: Uint8Array;
let encoder: TextEncoder;

wallet.registerRpcMessageHandler(async (_originString, requestObject) => {
  if (!PRIVATE_KEY) {
    await initialize();
  }

  /**
   * Converts ugly output from @noble/bls12-381 to readable hex.
   *
   * @param nobleOutput - An array from sign().
   * @returns Hex string.
   */
  function nobleOutputToHexString(nobleOutput: Uint8Array): string {
    return `0x${Object.values(nobleOutput)
      .map((num) => {
        return num.toString(16);
      })
      .join('')}`;
  }

  switch (requestObject.method) {
    case 'getAccount':
      return nobleOutputToHexString(getPublicKey(PRIVATE_KEY));

    case 'signMessage': {
      const pubKey = getPublicKey(PRIVATE_KEY);
      const data = requestObject.params[0];

      if (!data || typeof data !== 'string') {
        throw ethErrors.rpc.invalidParams({
          message: `Invalid signature data: "${data}".`,
        });
      }

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
      const newLocal = await sign(encoder.encode(data), PRIVATE_KEY);
      return nobleOutputToHexString(newLocal);
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
  encoder = new TextEncoder();

  const coinTypeNode = (await wallet.request({
    method: 'snap_getBip44Entropy_1',
  })) as JsonBIP44CoinTypeNode;

  PRIVATE_KEY =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (
      await deriveBIP44AddressKey(coinTypeNode, {
        account: 0,
        change: 0,
        address_index: 0,
      })
    ).privateKeyBuffer!;
}
