import { Component } from '@angular/core';
import Web3 from 'web3';
import { GethService } from '../service/geth.service';
import { ContractService } from '../service/contract.service';
import { Web3Service } from '../service/web3.service';
import { GethRequest } from '../interface/gethRequest'

@Component({
    selector: 'pm-block',
    templateUrl: './blockchain.component.html'
})
export class BlockchainComponent {
    private web3: any;
    datadir: string;
    account: any;

    constructor(private gethService: GethService,
        private contractService: ContractService,
        private web3Service: Web3Service) { }

    createBlockchain() {
        let path = "/home/david/Documentos/tfg/1testAccount/";

        // la manera de ir cambiando 'port' es provisional!!!
        let gethRequest: GethRequest = {
            request: "create",
            config: {
                networkid: 1114,
                port: 30303 + parseInt(this.datadir),
                // rpc: '',
                // rpcport: 8545,
                // rpccorsdomain: "*",
                // rpcaddr: "0.0.0.0",
                // mine: '',
                // minerthreads: 1,
                datadir: path + this.datadir,
                // rpcapi: "eth,net,web3,personal,miner",
                ipcpath: 'geth-' + this.datadir + '.ipc'
                // etherbase: ''
            }
        }

        this.gethService.createBlockchain(gethRequest)
            .subscribe(res => {
                console.log(res.message);
                // this.web3Service.createWeb3(config.datadir + '/' + config.ipcpath)
                //     .subscribe(console.log)
                // this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                // this.web3.eth.personal.newAccount('11111')
                //     .then(res => {
                //         console.log(res);
                //         this.account = res;
                //     })
                //     .catch(error => console.log)
            });
    }

    connectToBlockchain() {
        let path = "/home/david/Documentos/tfg/1testAccount/";
        let gethRequest: GethRequest = {
            request: "connect",
            config: {
                networkid: 1114,
                port: 30303 + parseInt(this.datadir),
                // rpc: '',
                // rpcport: 8545,
                // rpccorsdomain: "*",
                // rpcaddr: "0.0.0.0",
                // mine: '',
                // minerthreads: 1,
                datadir: path + this.datadir,
                // rpcapi: "eth,net,web3,personal,miner",
                ipcpath: 'geth-' + this.datadir + '.ipc'
                // etherbase: ''
            }
        }
        this.gethService.connectToBlockchain(gethRequest)
            .subscribe(res => {
                console.log(res.message)
            })
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