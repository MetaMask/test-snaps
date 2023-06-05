import path from 'path';
import {
  Dappeteer,
  DappeteerBrowser,
  DappeteerPage,
  initSnapEnv,
} from '@chainsafe/dappeteer';

describe('error snap', function () {
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

  test('snap error on invoke snap', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'rpc',
    );
    const result = await resultPromise;
    expect(result).toStrictEqual('foo');
    try {
      await metaMask.snaps.invokeSnap(connectedPage, snapId, 'rpc');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('random error inside');
      }
    }
  });
});
