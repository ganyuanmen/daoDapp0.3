export default  class ERC20s
{
    async getIsIssue(idar) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getIsIssue(idar).call({from: this.selectedAccount});
        return result;
    }

    async totalSupply(_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.totalSupply(_id).call({from: this.selectedAccount});
        return result;
    }

    async allowance(_id,_owneraddress,_spenneraddress) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.allowance(_id,_owneraddress,_spenneraddress).call({from: this.selectedAccount});
        return result;
    }


    async approveAll(_owneraddress,_spenneraddress) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.approveAll(_owneraddress,_spenneraddress).call({from: this.selectedAccount});
        return result;
    }

    async  approve1(_id, _spaneraddress,_amount) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let re=  await  this.contract.methods.approve(_id,_spaneraddress,_amount).send({from: this.selectedAccount});
        return re;

    }

    async approve2(_spaneraddress,_status) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let re=  await  this.contract.methods.approve(_spaneraddress,_status).send({from: this.selectedAccount});
        return re;

    }


    async getInfo(idar) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getInfo(idar).call({from: this.selectedAccount});
        return result;
    }
    async balanceOf(_id,_address) {
       
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.balanceOf(_id,_address).call({from: this.selectedAccount});
     
        return result;
    }

    async issue(id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.issue(id).send({from: this.selectedAccount});
        return result;

    }

    listener_events() {
        const _this = this;

        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.Issue({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.maxBlock,
        }, function (_error, data) {

            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , daoId: data.returnValues[0]
                ,tokenId:data.returnValues[1]
                , daoTime: data.returnValues[2]
            };

                $.ajax({
                    type: "POST",
                    url: window.propertis.url+ "updateToken",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(updata),
                    success: function (e) {
                     //   if(daoTokenWindow) daoTokenWindow.getData();
                      //  if(daoManagerWindow) daoManagerWindow.getData();
                    }
                });

        });

    }


    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;

        this.contract=undefined;
        const _this=this;
        this.maxBlock=0;
        $.get( window.propertis.url+"getMaxBlock/4",function (e){
            _this.maxBlock=e+1;
        });
        this.address='0x68C3D1cBb255eeA04B9246b624D0D631060D45BE';
        this.abi=
            [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_registe",
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
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "value",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "ApproveBatch",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "address[]",
                            "name": "from",
                            "type": "address[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "value",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "ApproveBatchNoIndexed",
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
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "time",
                            "type": "uint256"
                        }
                    ],
                    "name": "Issue",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "value",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "TransferBatch",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "address[]",
                            "name": "from",
                            "type": "address[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "address[]",
                            "name": "to",
                            "type": "address[]"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256[]",
                            "name": "value",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "TransferBatchNoIndexed",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "_status",
                            "type": "bool"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
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
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "approveAll",
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
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "daoTo",
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
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseAllowance",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "_ids",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "getInfo",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint32",
                                    "name": "id",
                                    "type": "uint32"
                                },
                                {
                                    "internalType": "address",
                                    "name": "manager",
                                    "type": "address"
                                },
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
                                    "internalType": "uint256",
                                    "name": "totalSupply",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "decimals",
                                    "type": "uint8"
                                }
                            ],
                            "internalType": "struct ERC20Info[]",
                            "name": "returnData",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint32[]",
                            "name": "_ids",
                            "type": "uint32[]"
                        }
                    ],
                    "name": "getIsIssue",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "iadd",
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
                    "name": "idTo",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseAllowance",
                    "outputs": [],
                    "stateMutability": "nonpayable",
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
                    "name": "issue",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "nextId",
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
                    "name": "registe",
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
                            "name": "_iadd",
                            "type": "address"
                        }
                    ],
                    "name": "setIADD",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "setStatus",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "status",
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
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        }
                    ],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupplyConstant",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "transferBatch",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "recipient",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "transferBatchMul",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "recipient",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "transferFromBatch",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "ids",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "sender",
                            "type": "address[]"
                        },
                        {
                            "internalType": "address[]",
                            "name": "recipient",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "transferFromBatchMul",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
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
                    "name": "trnasferToIADD",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "zeroAddress",
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

