export {};

interface JSONRPCRequest {
  method: string;
  params: any[];
}

type FMethodCallback = (
  originString: string,
  requestObject: { method: string; params: any },
) => Promise<any>;

interface Wallet {
  request: (request: JSONRPCRequest) => Promise<unknown>;
  registerRpcMessageHandler: (fn: FMethodCallback) => void;
}

declare global {
  const wallet: Wallet;
}
