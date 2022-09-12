import Connector from "@vite/connector";

export const BRIDGE = "wss://biforst.vite.net";

export class ViteConnect {
  vbInstance: null;
  providerWsURLs: {
    localnet: string;
    testnet: string;
    mainnet: string;
  };
  providerOptions: {
    timeout: number;
    retryTimes: number;
    retryInterval: number;
  };

  constructor() {
    this.vbInstance = null;
    this.providerWsURLs = {
      localnet: "ws://localhost:23457",
      testnet: "wss://buidl.vite.net/gvite/ws",
      mainnet: "wss://node.vite.net/gvite/ws", // or 'wss://node-tokyo.vite.net/ws'
    };

    this.providerOptions = {
      timeout: 60000,
      retryTimes: 10,
      retryInterval: 5000,
    };
  }

  async createSession() {
    const vbInstance = new Connector({ bridge: BRIDGE });
    await vbInstance.createSession();
    this.vbInstance = vbInstance;
  }
}
