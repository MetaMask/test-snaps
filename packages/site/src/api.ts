import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { RequestArguments } from '@metamask/providers/dist/BaseProvider';
import { JsonRpcError, JsonRpcParams } from '@metamask/utils';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export enum Tag {
  InstalledSnaps = 'Installed Snaps',
  TestState = 'Test State',
}

/**
 * Base request function for all API calls.
 *
 * @param args - The request arguments.
 * @param args.method - The RPC method to call.
 * @param args.params - The parameters to pass to the RPC method.
 * @returns The response from the RPC method.
 */
export const request: BaseQueryFn<RequestArguments> = async ({
  method,
  params,
}) => {
  try {
    const data = await window.ethereum.request({ method, params });

    return { data };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export type GetSnapsResult = Record<
  string,
  { error?: string; version: string }
>;

export interface InvokeSnapArgs {
  snapId: string;
  method: string;
  params?: JsonRpcParams;
  tags?: Tag[];
}

export type InvokeSnapResult = unknown;

export interface InstallSnapArgs {
  snapId: string;
  version: string;
}

export type InstallSnapResult = Record<string, { error: JsonRpcError }>;

export const baseApi = createApi({
  reducerPath: 'base',
  baseQuery: request,
  tagTypes: [Tag.InstalledSnaps, Tag.TestState],
  endpoints(build) {
    return {
      getSnaps: build.query<GetSnapsResult, void>({
        query: () => ({
          method: 'wallet_getSnaps',
        }),
        providesTags: [Tag.InstalledSnaps],
      }),

      invokeQuery: build.query<InvokeSnapResult, InvokeSnapArgs>({
        query: ({ snapId, method, params }) => ({
          method: 'wallet_invokeSnap',
          params: { snapId, request: params ? { method, params } : { method }  },
        }),
        providesTags: (_, __, { tags = [] }) => tags,
      }),

      invokeMutation: build.mutation<InvokeSnapResult, InvokeSnapArgs>({
        query: ({ snapId, method, params }) => ({
          method: 'wallet_invokeSnap',
          params: { snapId, request: params ? { method, params } : { method } },
        }),
        invalidatesTags: (_, __, { tags = [] }) => tags,
      }),

      installSnap: build.mutation<InstallSnapResult, InstallSnapArgs>({
        query: ({ snapId, version }) => ({
          method: 'wallet_requestSnaps',
          params: {
            [snapId]: {
              version,
            },
          },
        }),
        transformResponse: (snaps: InstallSnapResult, _, { snapId }) => {
          if (snaps[snapId].error) {
            console.error(snaps[snapId].error);
            throw new Error(snaps[snapId].error.message);
          }

          return snaps;
        },
        invalidatesTags: [Tag.InstalledSnaps],
      }),
    };
  },
});

export const {
  useGetSnapsQuery,
  useInvokeQueryQuery: useInvokeQuery,
  useInvokeMutationMutation: useInvokeMutation,
  useInstallSnapMutation,
} = baseApi;
