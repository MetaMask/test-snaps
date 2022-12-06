import { OnTransactionHandler } from '@metamask/snaps-types';
import { hasProperty, isObject, Json } from '@metamask/utils';
// import { getInsights } from './insights';

/**
 * Handle an incoming transaction, and return any insights.
 *
 * @param args - The request handler args as object.
 * @param args.transaction - The transaction object.
 * @returns The transaction insights.
 */
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const insights: { type: string; params?: Json } = {
    type: 'Unknown Transaction',
  };

  if (
    !isObject(transaction) ||
    !hasProperty(transaction, 'data') ||
    typeof transaction.data !== 'string'
  ) {
    console.warn('Unknown transaction type.');
    return { insights };
  }

  return { insights: { Test: 'Successful' } };
};
