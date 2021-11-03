export default class Register
{
    async  create(_address,_daoName,_daoShortName,_remark,_isCreate,_logo) {
       
         if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
         let result= await  this.contract.methods.create(_address,_daoName,_daoShortName,_logo,_remark,_isCreate).send({from: this.selectedAccount});
         return result;
    }
    async getDaos(_address) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getDaos(_address).call({from: this.selectedAccount});
        return result;
    }
    async  createOs(_daoName,_addressAr,_biliAr,_init,_biaoAr) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.createOs(_daoName,_addressAr,_biliAr,_init,_biaoAr).send({from: this.selectedAccount});
        return result;

    }
    async getOs(_daoId) {

        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getOss(_daoId).call({from: this.selectedAccount});
        return result;
    }

    listener_events() {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.Create({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.maxBlock,
        }, function (_error, data) {

            console.log(data);

            let updata = {
                blockNum: data.blockNumber
                , daoName: data.returnValues[0]
                , daoSymbol: data.returnValues[1]
                , daoDsc: data.returnValues[2]
                , daoManager: data.returnValues[3]
                , daoId: data.returnValues[4]
                , daoTime: data.returnValues[5]
            };
            if(updata.blockNum>_this.maxBlock) {
                _this.getOs(updata.daoId).then((ar) => {
                    updata.daoLogo = ar[2];
                    $.ajax({
                        type: "POST",
                        url: window.propertis.url + "updateDao",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(updata),
                        success: function (e) {
                           // if (daoTokenWindow) daoTokenWindow.getData();
                          // if (daoManagerWindow) daoManagerWindow.getData();
                        }
                    });
                })
                _this.maxBlock=updata.blockNum;
            }


        });
     
        this.contract.events.CreateOs({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.osMaxBlock,
        }, function (_error, data) {
            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , daoId: data.returnValues[0]
                , osAddress: data.returnValues[1]
            };

            $.ajax({
                type: "POST",
                url: window.propertis.url+ "updateOs",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(updata),
                success: function (e) {
                  //  if(daoTokenWindow) daoTokenWindow.getData();
                  //  if(daoManagerWindow) daoManagerWindow.getData();
                }
            })
        })
    }

    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;
        this.isListener=true;
        this.maxBlock=0;
        this.osMaxBlock=0;
        const _this=this;
        $.get(window.propertis.url+"getMaxBlock/0",function (e){
            _this.maxBlock=e+1;
        
        });
        $.get(window.propertis.url+"getMaxBlock/3",function (e){
            _this.osMaxBlock=e+1;
                  
        });
        this.address='0x14052eB4d8A1B77D8aaCFda576f6B398358E4BD8';
        this.abi=
            [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_manager",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_global",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_iOsA",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_iVoteA",
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
                            "indexed": false,
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "_dsc",
                            "type": "string"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "manager",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "Create",
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
                            "indexed": true,
                            "internalType": "address",
                            "name": "os",
                            "type": "address"
                        }
                    ],
                    "name": "CreateOs",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "changePay",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_msg",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_logo",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_dsc",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "_issue",
                            "type": "bool"
                        }
                    ],
                    "name": "create",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "address[]",
                            "name": "adds",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "_bili",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bytes[]",
                            "name": "_initData",
                            "type": "bytes[]"
                        },
                        {
                            "internalType": "bytes[]",
                            "name": "_message",
                            "type": "bytes[]"
                        }
                    ],
                    "name": "createOs",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "daosOf",
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_manager",
                            "type": "address"
                        }
                    ],
                    "name": "getDaos",
                    "outputs": [
                        {
                            "internalType": "string[]",
                            "name": "_names",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint32[]",
                            "name": "_ids",
                            "type": "uint32[]"
                        },
                        {
                            "internalType": "bool[]",
                            "name": "isCreate",
                            "type": "bool[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "_id",
                            "type": "uint32"
                        }
                    ],
                    "name": "getName",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32",
                            "name": "_id",
                            "type": "uint32"
                        }
                    ],
                    "name": "getOss",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "symbol",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "logo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dsc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "os",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "databaseChart",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "voteChart",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "appInfo",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct Register.state",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "iOsA",
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
                    "inputs": [],
                    "name": "iVoteA",
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
                    "inputs": [],
                    "name": "init",
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
                            "internalType": "address",
                            "name": "_token",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_init",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_install",
                            "type": "address"
                        }
                    ],
                    "name": "initOneTime",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "install",
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
                    "name": "isIssue",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "isPay",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
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
                    "name": "manager",
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
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "name": "nameToId",
                    "outputs": [
                        {
                            "internalType": "uint32",
                            "name": "",
                            "type": "uint32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "nextOs",
                    "outputs": [
                        {
                            "internalType": "uint32",
                            "name": "",
                            "type": "uint32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
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
                    "inputs": [],
                    "name": "payModule",
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
                            "internalType": "address",
                            "name": "_paymodule",
                            "type": "address"
                        }
                    ],
                    "name": "setPaymodule",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "times",
                    "outputs": [
                        {
                            "internalType": "uint32",
                            "name": "",
                            "type": "uint32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "tokenA",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]


    }
}

