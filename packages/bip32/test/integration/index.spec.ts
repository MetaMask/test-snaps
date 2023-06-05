import path from 'path';
import {
  Dappeteer,
  initSnapEnv,
  DappeteerPage,
  DappeteerBrowser,
} from '@chainsafe/dappeteer';
import { ethErrors } from 'eth-rpc-errors';

describe('bip32 snap', function () {
  let metaMask: Dappeteer;
  let browser: DappeteerBrowser;
  let connectedPage: DappeteerPage;
  let snapId: string;

  beforeAll(async function () {
    ({ metaMask, snapId, browser } = await initSnapEnv({
      automation: 'playwright',
      snapIdOrLocation: path.resolve(__dirname, '../..'),
      installationSnapUrl: 'https://google.com',
      metaMaskLocation: path.resolve('../../node_modules/.cache/.metamask'),
    }));
    connectedPage = await metaMask.page.browser().newPage();
    await connectedPage.goto('https://google.com');
  });

  afterAll(async function () {
    await browser.close();
  });

  test('get public key secp256k1', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'getPublicKey',
      {
        path: ['m', "44'", "0'"],
        curve: 'secp256k1',
        compressed: false,
      },
    );
    const result = await resultPromise;
    expect(result).toBe(
      '0x043500b21362f816e6eef231b165fdb64c7d5733a390360e85bdbfb407a83894d0682f7c749e55d84005cce8c4f4000f8a591081e9c1a3fc46830fdacd0d921a5f',
    );
  });

  test('sign message secp256k1 accept', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'signMessage',
      {
        path: ['m', "44'", "0'"],
        curve: 'secp256k1',
        compressed: false,
        message: 'Sign message test secp256k1',
      },
    );
    await metaMask.page.waitForTimeout(1000);
    await metaMask.snaps.dialog.accept();
    const result = await resultPromise;
    expect(result).toBe(
      '0x304402200c13a1d4611bcdfa7b83e574f2d10da6ab54b39e66385c34c6eb1d355e720c9b02206096ef06b9d7a73b4d19f1d848ad03e7f8410853a3453f0b89a2e4212eee8aa8',
    );
  });

  test('sign message ed25519 accept', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'signMessage',
      {
        path: ['m', "44'", "0'"],
        curve: 'ed25519',
        compressed: false,
        message: 'Sign message test ed25519',
      },
    );
    await metaMask.page.waitForTimeout(1000);
    await metaMask.snaps.dialog.accept();
    const result = await resultPromise;
    expect(result).toBe(
      '0xa35273737d6b7b481babdafe98d31aa0428030967a07850656488783bfcf46ca318bc413f117f06d0633bb64e53cf973eb1c91d0dc2a9f03cc731e80b2959700',
    );
  });

  test('sign message reject', async function () {
    try {
      metaMask.snaps.invokeSnap(connectedPage, snapId, 'signMessage', {
        path: ['m', "44'", "0'"],
        curve: 'ed25519',
        compressed: false,
        message: 'Message that test will not accept',
      });
      await metaMask.page.waitForTimeout(1000);
      await metaMask.snaps.dialog.reject();
    } catch (e) {
      const error = ethErrors.provider.userRejectedRequest();
      expect(e).toStrictEqual(error);
    }
  });

  test('snap invoke wrong method', async function () {
    interface resultType {
      code: number;
      data: { originalError: unknown };
      message: string;
    }
    try {
      metaMask.snaps.invokeSnap<resultType>(
        connectedPage,
        snapId,
        'test-faliure',
      );
    } catch (e) {
      expect(e).toBe('Method not found.');
    }
  });
});
