export interface GethRequest {
    request: string;
    config: Config;
}
export interface Config {
    networkid: number;
    port: number;
    // rpc: string;
    // rpcport: number;
    // rpccorsdomain: string;
    // rpcaddr: string;
    // mine: string;
    // minerthreads: number;
    datadir: string;
    // rpcapi: string;
    ipcpath: string;
    // etherbase: string;
}


