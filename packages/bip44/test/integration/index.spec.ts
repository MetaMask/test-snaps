import path from 'path';
import {
  Dappeteer,
  initSnapEnv,
  DappeteerPage,
  DappeteerBrowser,
} from '@chainsafe/dappeteer';
import { ethErrors } from 'eth-rpc-errors';

describe('bip44 snap', function () {
  let metaMask: Dappeteer;
  let browser: DappeteerBrowser;
  let connectedPage: DappeteerPage;
  let snapId: string;

  beforeAll(async function () {
    ({ metaMask, snapId, browser } = await initSnapEnv({
      automation: 'playwright',
      browser: 'chrome',
      snapIdOrLocation: path.resolve(__dirname, '../..'),
      installationSnapUrl: 'https://google.com',
    }));
    connectedPage = await metaMask.page.browser().newPage();
    await connectedPage.goto('https://google.com');
  });

  afterAll(async function () {
    await browser.close();
  });

  test('get account', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'getAccount',
      {
        coinType: 1,
      },
    );
    const result = await resultPromise;
    expect(result).toBe(
      '0x84f5e5b327bbac7694f1385826267ca6dc18fd7b32eccdc7a25506d438d6d5f1e1f33b7ca83a15b42b4b462cfcaca169',
    );
  });

  test('sign message', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'signMessage',
      ['Sign this message'],
    );
    await metaMask.page.waitForTimeout(1000);
    await metaMask.snaps.acceptDialog();
    const result = await resultPromise;
    expect(result).toBe(
      '0xb95a3d5977531a500076b4a878d2f5bf330342312f65fdbb1652aff008e977727749f9aa69e3cee70f89043c2c0739e701c852c3e711c98d96f4493cd5602dd91daec30be9bddc4f18eddbc76909cfa761caefffa30bc536ac4c004526b53748',
    );
  });

  test('sign message reject', async function () {
    try {
      metaMask.snaps.invokeSnap(connectedPage, snapId, 'signMessage', [
        'Do not sign this message',
      ]);
      await metaMask.page.waitForTimeout(1000);
      await metaMask.snaps.rejectDialog();
    } catch (e) {
      const error = ethErrors.provider.userRejectedRequest();
      expect(e).toStrictEqual(error);
    }
  });

  test('snap invoke wrong method', async function () {
    try {
      metaMask.snaps.invokeSnap(connectedPage, snapId, 'test-fail', [
        'Do not sign this message',
      ]);
    } catch (e) {
      const error = ethErrors.provider.userRejectedRequest();
      expect(e).toStrictEqual(error);
    }
  });
});
