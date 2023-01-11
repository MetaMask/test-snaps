import path from 'path';
import {
  Dappeteer,
  initSnapEnv,
  DappeteerBrowser,
  DappeteerPage,
} from '@chainsafe/dappeteer';
import openrpc from '../../src/openrpc.json';

describe('confirm snap', function () {
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

  test('snap invoke confirm accept', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'confirm',
      ['Test-prompt', 'Test-description', 'Test-textAreaContent'],
    );

    await metaMask.page.waitForTimeout(1000);
    await metaMask.snaps.acceptDialog();

    expect(await resultPromise).toBe(true);
  });

  test('snap invoke confirm reject', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'confirm',
      ['Test-prompt', 'Test-description', 'Test-textAreaContent'],
    );
    await metaMask.page.waitForTimeout(1000);
    await metaMask.snaps.rejectDialog();
    const result = await resultPromise;

    expect(result).toBe(false);
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

  test('snap invoke rpc.discover', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'rpc.discover',
    );
    const result = await resultPromise;
    expect(result).toStrictEqual(openrpc);
  });
});
