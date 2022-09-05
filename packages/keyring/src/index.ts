/* eslint-disable jsdoc/require-jsdoc */
import { Wallet } from '@ethersproject/wallet';
import { Json } from '@metamask/utils';
import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';
import { ethErrors } from 'eth-rpc-errors';

// TODO: Expose in snap-types
interface SnapKeyring {
  getAccounts(): Promise<string[]>;
  handleRequest(data: {
    chainId: string;
    origin: string;
    request: unknown;
  }): Promise<Json>;
  on(
    data: {
      chainId: string;
      origin: string;
      eventName: string;
    },
    listener: (...args: unknown[]) => void,
  ): void;
  off(data: { chainId: string; origin: string; eventName: string }): void;

  addAccount?(chainId: string): Promise<string>;
  removeAccount?(accountId: string): Promise<void>;

  importAccount?(chainId: string, data: Json): Promise<string>;
  exportAccount?(accountId: string): Promise<Json>;
}

const POLYGON_CHAIN_ID = 966;
const POLYGON_CHAIN_ID_CAIP10 = `eip155:${POLYGON_CHAIN_ID}`;

async function assertPromptUser(prompt: string, textAreaContent?: string) {
  const approved = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt,
        textAreaContent,
      },
    ],
  });
  if (!approved) {
    throw ethErrors.provider.userRejectedRequest();
  }
  return approved;
}

async function getWallet() {
  const coinTypeNode = (await wallet.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: POLYGON_CHAIN_ID,
    },
  })) as JsonBIP44CoinTypeNode;
  const deriver = await getBIP44AddressKeyDeriver(coinTypeNode);
  const childNode = await deriver(0);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Wallet(childNode.privateKey!);
}

class Keyring implements SnapKeyring {
  async getAccounts(): Promise<string[]> {
    const wallet = await getWallet();
    return [wallet.address].map(
      (address) => `${POLYGON_CHAIN_ID_CAIP10}:${address}`,
    );
  }

  on(
    _data: { chainId: string; origin: string; eventName: string },
    _listener: (...args: unknown[]) => void,
  ): void {
    throw new Error('Method not implemented.');
  }

  off(_data: { chainId: string; origin: string; eventName: string }): void {
    throw new Error('Method not implemented.');
  }

  async handleRequest({
    chainId,
    request,
  }: {
    chainId: string;
    origin: string;
    request: any;
  }) {
    if (chainId !== POLYGON_CHAIN_ID_CAIP10) {
      throw ethErrors.rpc.methodNotFound();
    }
    const wallet = await getWallet();
    switch (request.method) {
      case 'eth_signTransaction': {
        await assertPromptUser(
          'Do you want to sign this transaction?',
          JSON.stringify(request.params),
        );
        return wallet.signTransaction({
          ...request.params,
          chainId: POLYGON_CHAIN_ID,
        });
      }

      case 'eth_accounts': {
        // TODO: Decide whether to prompt for this
        // TODO: Decide whether this should return CAIP10 addresses
        return this.getAccounts();
      }
      default:
        throw ethErrors.rpc.methodNotFound();
    }
  }
}

export const keyring = new Keyring();
