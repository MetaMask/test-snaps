import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Retrieves test web page content.
 *
 * @returns Response data of a fetched web page in text format.
 */
async function getPage() {
  const response = await fetch(
    'https://metamask.github.io/test-snaps/5.4.0/test-data.json',
  );
  return response.text();
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'networkAccessTest': {
      const page = await getPage();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([text(`${page}`)]),
        },
      });
    }
    default:
      throw new Error('Method not found.');
  }
};
