export default class Logos
{
    async getLogo(id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.logos(id).call({from: this.selectedAccount});
        return result;
    }
     setLogo(id,logo,callback) {

        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        this.contract.methods.setLogo(id,logo).send({from: this.selectedAccount},function (err,re){callback.call(this,err,re);});

    }
    changeLogo(id,logo,callback) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        this.contract.methods.changeLogo(id,logo).send({from: this.selectedAccount},function (err,re){callback.call(this,err,re);});

    }

    listener_events() {
        const _this = this;

        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.SetLogo({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.setMaxBlock,
        }, function (_error, data) {

            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , daoId: data.returnValues[0]
                , daoTime: data.returnValues[1]
            };
            _this.getLogo(updata.daoId).then((re) => {
                updata.daoLogo = re;
                $.ajax({
                    type: "POST",
                    url: window.propertis.url+"updateSetLogo",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(updata),
                    success: function (e) {
                      //  if(daoTokenWindow) daoTokenWindow.getData();
                      //  if(daoManagerWindow) daoManagerWindow.getData();
                    }
                });
            })
        });
        this.contract.events.ChangeLogo({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.changeMaxBlock,
        }, function (_error, data) {

            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , daoId: data.returnValues[0]
                , daoTime: data.returnValues[1]
            };
            _this.getLogo(updata.daoId).then((re) => {
                updata.daoLogo = re;
                $.ajax({
                    type: "POST",
                    url:  window.propertis.url+"updateChangeLogo",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(updata),
                    success: function (e) {
                      //  if(daoTokenWindow) daoTokenWindow.getData();
                      //  if(daoManagerWindow) daoManagerWindow.getData();
                    }
                });
            })
        });

    }

    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;
        this.address='0x508daC996fAad23Cd7b13D3c4d9D7942c9E9c350';
        this.setMaxBlock=0;
        this.changeMaxBlock=0;
        const _this=this;
        $.get(window.propertis.url+"getMaxBlock/1",function (e){
            _this.setMaxBlock=e+1;
        });
        $.get(window.propertis.url+"getMaxBlock/2",function (e){
            _this.changeMaxBlock=e+1;
        });
        this.abi=
            [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_register",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_global",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "time",
                            "type": "uint256"
                        }
                    ],
                    "name": "ChangeLogo",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "time",
                            "type": "uint256"
                        }
                    ],
                    "name": "SetLogo",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "internalType": "string",
                            "name": "_logo",
                            "type": "string"
                        }
                    ],
                    "name": "changeLogo",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "global",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "",
                            "type": "uint32"
                        }
                    ],
                    "name": "logos",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "register",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "internalType": "string",
                            "name": "_logo",
                            "type": "string"
                        }
                    ],
                    "name": "setLogo",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]

    }
}

