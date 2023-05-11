import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

// eslint-disable-next-line jsdoc/require-jsdoc
async function getPage() {
  const response = await fetch(
    'https://acl.execution.metamask.io/latest/registry.json',
  );
  return response.text();
}

export const onRpcRequest: OnRpcRequestHandler = ({ request }) => {
  switch (request.method) {
    case 'networkAccessTest':
      return getPage().then((page) => {
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'alert',
            content: panel([text(`${page}`)]),
          },
        });
      });
    default:
      throw new Error('Method not found.');
  }
};
