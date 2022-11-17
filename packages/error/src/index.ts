import { OnRpcRequestHandler } from '@metamask/snaps-types';

export const onRpcRequest: OnRpcRequestHandler = async () => {
  // eslint-disable-next-line no-new
  new Promise((resolve) => {
    let num = 0;
    while (num < 100) {
      // eslint-disable-next-line no-plusplus
      num++;
    }
    throw new Error('random error inside');
    resolve(undefined);
  });
  return 'foo';
};
