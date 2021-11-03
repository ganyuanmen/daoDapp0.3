class DaoInfo
{
    async getInfo() {
        if(!this.contract)  this.contract=new web3.eth.Contract(this.abi,this.address , {from: selectedAccount});
        let result= await this.contract.methods.getInfos(selectedAccount).call({from: selectedAccount});
        return result;
    }

    constructor() {
        this.contract=undefined;
        this.address='0xFCeDBa5A999C260d73f1D3F67EE630467C9F6231';
        this.abi=
            [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_registe",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "manager",
                        "type": "address"
                    }
                ],
                "name": "getInfos",
                "outputs": [
                    {
                        "components": [
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
                                "internalType": "struct state",
                                "name": "daoInfo",
                                "type": "tuple"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint32",
                                "name": "id",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCreate",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct getInfo.states[]",
                        "name": "",
                        "type": "tuple[]"
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
                "name": "getInfostest",
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
                        "internalType": "struct state",
                        "name": "",
                        "type": "tuple"
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
                "name": "getOss",
                "outputs": [
                    {
                        "components": [
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
                                "internalType": "struct state",
                                "name": "daoInfo",
                                "type": "tuple"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint32",
                                "name": "id",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCreate",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct getInfo.states[]",
                        "name": "returnData",
                        "type": "tuple[]"
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
                "inputs": [],
                "name": "token",
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
const daoInfo_obj=new DaoInfo();
