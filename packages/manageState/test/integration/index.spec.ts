import path from 'path';
import {
  Dappeteer,
  DappeteerBrowser,
  DappeteerPage,
  initSnapEnv,
} from '@chainsafe/dappeteer';

describe('manage state snap', function () {
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

  test('retrieve test data if it was not updated before', async function () {
    const getResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'retrieveTestData',
      ['get'],
    );
    expect(getResult).toStrictEqual({ testState: [] });
  });

  test('store data and retrieve it', async function () {
    const updateDataResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'storeTestData',
      [{ newState: 'hello' }],
    );
    expect(updateDataResult).toBe(true);
    await metaMask.snaps.invokeSnap(connectedPage, snapId, 'storeTestData', [
      { moreState: 'hello' },
    ]);
    const getDataResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'retrieveTestData',
      ['get'],
    );
    expect(getDataResult).toStrictEqual({
      testState: [{ newState: 'hello' }, { moreState: 'hello' }],
    });
  });

  test('clear stored data', async function () {
    const getDataResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'retrieveTestData',
      ['get'],
    );
    expect(getDataResult).toStrictEqual({
      testState: [{ newState: 'hello' }, { moreState: 'hello' }],
    });

    const clearDataResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'clearTestData',
      ['clear'],
    );

    expect(clearDataResult).toBe(true);

    const getAfterClearStateResult = await metaMask.snaps.invokeSnap(
      connectedPage,
      snapId,
      'retrieveTestData',
      ['get'],
    );
    expect(getAfterClearStateResult).toStrictEqual({ testState: [] });
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
        'giveMeData',
        ['get'],
      );
    } catch (e) {
      expect((e as resultType).message).toBe('Method not found.');
    }
  });
});
