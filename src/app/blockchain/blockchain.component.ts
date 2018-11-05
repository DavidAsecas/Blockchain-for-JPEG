import { Component } from '@angular/core';
import Web3 from 'web3';
import { GethService } from '../service/geth.service';
import { ContractService } from '../service/contract.service';

@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    private web3: any;
    datadir: string;
    account: any;

    constructor(private gethService: GethService, private contractService: ContractService) { }

    createBlockchain() {

        let path = "/home/david/Documentos/tfg/testAccount/";

        // la manera de ir cambiando 'port' es provisional!!!
        let config = {
            networkid: 1114,
            port: 30303 + parseInt(this.datadir),
            rpc: '',
            rpcport: 8545,
            // mine: '',
            // minerthreads: 1,
            datadir: path + this.datadir,
            rpcapi: "eth,net,web3,personal,miner",
            ipcpath: 'geth-' + this.datadir + '.ipc',
            etherbase: ''
        }
        this.gethService.addBlockchain(config)
            .subscribe(res => {
                console.log(res.message);
                this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                this.web3.eth.personal.newAccount('11111')
                    .then((res, error) => {
                        console.log(res);
                        this.account = res;
                        this.extendWeb3();
                        // this.web3.miner.start(1);
                    })
                console.log('Blockchain created');
            });

    }

    extendWeb3() {
        this.web3.extend({
            property: 'miner',
            methods: [{
                name: 'start',
                call: 'miner_start',
                params: 1
            },
            {
                name: 'stop',
                call: 'miner_stop'
            }]
        })
    }

    uploadImage(id) {
        this.contractService.getContractData()
            .subscribe(res => {
                let abi = res.abi;
                let bin = res.bin;
                const contract = new this.web3.eth.Contract(JSON.parse(abi));
                contract.deploy({
                    data: '0x' + bin,
                    arguments: [id.value]
                })
                    .send({
                        from: this.account
                    })
            });
    }
}