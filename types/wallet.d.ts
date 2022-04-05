export {};

interface JsonRpcRequest {
  method: string;
  params?: unknown[];
}

type FMethodCallback = (
  originString: string,
  requestObject: { method: string; params: any },
) => Promise<any>;

interface Wallet {
  request: (request: JsonRpcRequest) => Promise<unknown>;
  registerRpcMessageHandler: (fn: FMethodCallback) => void;
}

declare global {
  const wallet: Wallet;
}
