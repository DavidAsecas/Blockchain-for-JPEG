import { Component } from '@angular/core';
// import * as Blockchain from '../../../blockchain.js';
import Web3 from 'web3';

declare var blockchain: any;
@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    private web3: any;
    count: number = 0; 
    blockchains: Array<Web3> = []

    createBlockchain() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        console.log('Blockchain created');
        this.blockchains.push(this.web3);
        console.log(this.blockchains.length);
    }
}