import { Component } from '@angular/core';
// import * as Blockchain from '../../../blockchain.js';
import Web3 from 'web3';
import * as geth from '../../../shell.js';

declare var blockchain: any;
@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    private web3: any;
    count: number = 0; 
    blockchains: Array<Web3> = [];
    datadir: String;

    createBlockchain() {
        let conf = {
            networkid: "1114",
            port: 30303,
            rpcport: 8545,
            mine: null,
            datadir: "/home/david/Documentos/tfg/"+this.datadir,
            rpcapi: "eth,net,web3,personal"
        }
        geth.createGenesisBlock('1114', 400, 9999999).then(() => geth.gethInit(conf));
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        console.log('Blockchain created');
        this.blockchains.push(this.web3);
        console.log(this.blockchains.length);
    }
}