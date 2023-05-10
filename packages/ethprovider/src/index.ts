import { OnRpcRequestHandler } from '@metamask/snaps-types';

// eslint-disable-next-line jsdoc/require-jsdoc
async function getGas() {
  const gasPriceHex = await ethereum.request({ method: 'eth_gasPrice' });
  const gasPrice = parseInt(gasPriceHex, 16);
  return gasPrice > 0;
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'ethproviderTest':
      return getGas();
    default:
      throw new Error('Method not found.');
  }
};
