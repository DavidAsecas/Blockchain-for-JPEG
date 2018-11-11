import { Component } from '@angular/core';
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
    account: string;
    path = "/home/david/Documentos/tfg/1testAccount/";


    constructor(private gethService: GethService,
        private contractService: ContractService,
        private web3Service: Web3Service) { }

    createBlockchain() {
        // la manera de ir cambiando 'port' es provisional!!!
        let gethRequest: GethRequest = {
            request: "create",
            config: {
                networkid: 1114,
                port: 30303 + parseInt(this.datadir),
                // mine: '',
                // minerthreads: 1,
                datadir: this.path + this.datadir,
                ipcpath: 'geth-' + this.datadir + '.ipc'
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
        let gethRequest: GethRequest = {
            request: "connect",
            config: {
                networkid: 1114,
                port: 30303 + parseInt(this.datadir),
                // mine: '',
                // minerthreads: 1,
                datadir: this.path + this.datadir,
                ipcpath: 'geth-' + this.datadir + '.ipc'
            }
        }
        this.gethService.connectToBlockchain(gethRequest)
            .subscribe(res => {
                console.log(res.message)
                this.web3Service.setWeb3({
                    request: "setWeb3",
                    data: this.path + this.datadir + '/geth-' + this.datadir + '.ipc'
                }).subscribe(res => {
                    console.log(res.address)
                    this.account = res.address
                })
            })
    }

    uploadImage(id) {
        this.web3Service.uploadImage({
            request: "upload",
            data: {
                id: id,
                account: this.account
            }
        }).subscribe(res => {
            console.log(res.id)
        });
    }
}