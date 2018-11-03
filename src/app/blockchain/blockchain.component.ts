import { Component } from '@angular/core';
import Web3 from 'web3';
import { GethService } from '../service/geth.service';
const compiledContract = require('./contractABI');

declare var blockchain: any;
@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    private web3: any;
    datadir: string;

    constructor(private gethService: GethService) { }

    createBlockchain() {
        let path = "/home/david/Documentos/tfg/testAccount/";

        // la manera de ir cambiando 'port' es provisional!!!
        let config = {
            networkid: "1114",
            port: 30303 + parseInt(this.datadir),
            rpc: '',
            rpcport: 8545,
            mine: '',
            minerthreads: 1,
            datadir: path + this.datadir,
            rpcapi: "eth,net,web3,personal",
            ipcpath: 'geth-' + this.datadir + '.ipc',
            etherbase: ''
        }
        this.gethService.addBlockchain(config)
            .subscribe(res => console.log(res.message));
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        console.log('Blockchain created');
    }

    uploadImage(id: string) {
        const contract = new this.web3.eth.Contract(compiledContract.abi);
        contract.deploy({
            data: '0x' + compiledContract.bin,
            arguments: [id]
        })
        
    }
}