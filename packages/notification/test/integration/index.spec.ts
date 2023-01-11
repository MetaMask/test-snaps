import path from 'path';
import {
  Dappeteer,
  DappeteerBrowser,
  DappeteerPage,
  initSnapEnv,
} from '@chainsafe/dappeteer';

describe('notification snap', function () {
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

  test('inApp notification', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'inApp',
    );

    const result = await resultPromise;

    expect(result).toBe(null);
  });

  test('native notification', async function () {
    const resultPromise = metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'native',
    );
    const result = await resultPromise;

    expect(result).toBe(null);
  });

  test('throw error for wrong method', async function () {
    interface resultType {
      code: number;
      data: { originalError: unknown };
      message: string;
    }

    try {
      await metaMask.snaps.invokeSnap<resultType>(
        connectedPage,
        snapId,
        'notAMethod',
      );
    } catch (e) {
      expect((e as resultType).message).toBe('Method not found.');
    }
  });
});
