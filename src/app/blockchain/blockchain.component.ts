import { Component } from '@angular/core';
import Web3 from 'web3';
import { GethService } from '../service/geth.service';

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

    constructor(private gethService: GethService) { }

    createBlockchain() {
        let config = {
            networkid: "1114",
            port: 30303,
            rpcport: 8545,
            mine: null,
            minerthreads: 1,
            datadir: "/home/david/Documentos/tfg/testAccount/" + this.datadir,
            rpcapi: "eth,net,web3,personal"
        }
        this.gethService.addBlockchain(config)
            .subscribe(res => console.log(res.message));
        // this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        // console.log('Blockchain created');
        // this.blockchains.push(this.web3);
        // console.log(this.blockchains.length);
    }
}