import { OnCronjobHandler, OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text, heading } from '@metamask/snaps-ui';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'fireDialog':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Alert',
          content: panel([heading('Alert Dialog'), text('Text here')]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'fireCronjob':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Alert',
          content: panel([heading('Cronjob'), text('fired')]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
