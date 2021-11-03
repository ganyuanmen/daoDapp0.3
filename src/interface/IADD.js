export default  class IADD
{
     toWei(num)
     {
         return num*Math.pow(10,18);
     }

      fromWei(num)
     {
         return  (num/Math.pow(10,18)).toFixed(4);
     }
    async getPowerPoolPriceNDAOToToken(_utoken,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPowerPoolPriceNDAOToToken(_utoken,_id).call({from: this.selectedAccount});
        return result;
    }
    async getPowerPoolPriceTokenToNDAO(_token,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPowerPoolPriceTokenToNDAO(_token,_id).call({from: this.selectedAccount});
        return result;
    }


    async TokenToNDAOOutputPrice(_token,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAOOutputPrice(_token,_id).call({from: this.selectedAccount});
        return result;
    }

    async NDAOToTokenOutputPrice(_token,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToTokenOutputPrice(_token,_id).call({from: this.selectedAccount});
        return result;
    }

    async NDAOToToken(_mintoken,_token,_id,_address) {
      
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToToken(_mintoken,_token,_id,_address).send({from: this.selectedAccount});
        return result;
    }

    async TokenToNDAO(_mintoken,_token,_id,_address) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAO(_mintoken,_token,_id,_address).send({from: this.selectedAccount});
        return result;
    }
    async TokenToToken(_mintoken1,_mintoken2,_token,_id1,_id2,_address) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken(_mintoken1,_mintoken2,_token,_id1,_id2,_address).send({from: this.selectedAccount});
        return result;
    }
    async getPool(_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPool(_id).call({from: this.selectedAccount});
        return result;
    }


    getReal(v){
        var b=v.split('');
        for(var i=1;i<b.length;i++)
             {
                 if(b[i]!='0')
                 break               
             }
        return v.substr(i);

    }

    // private  long blockNum;
    // private BigDecimal fromCost;
    // private  BigDecimal toCost;
    // private int fromTokenId;
    // private int toTokenId;


    listener_events() {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.UToToken({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.maxu2t,
        }, function (_error, data) {
            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , fromCost: 0
                ,fromTokenId:0 
                ,toTokenId:data.returnValues.id
            };
            _this.getPool(updata.toTokenId).then(e=>{
              
                updata.toCost=propertis.web3.utils.fromWei(_this.getReal(e[1]),'ether');
            
                $.ajax({
                    type: "POST",
                    url:  window.propertis.url+"updateIADD",
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

        this.contract.events.TokenToU({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.maxt2u,
        }, function (_error, data) {
            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                , toCost: 0
                ,toTokenId:0 
                ,fromTokenId:data.returnValues.id
            };
            _this.getPool(updata.fromTokenId).then(e=>{
 
               
                updata.fromCost=propertis.web3.utils.fromWei(_this.getReal(e[1]),'ether');
              
          
                $.ajax({
                    type: "POST",
                    url:  window.propertis.url+"updateIADD",
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

        this.contract.events.ETokenToToken({
            filter: {}, // Using an array means OR: e.g. 20 or 23
            fromBlock: _this.maxt2t,
        }, function (_error, data) {
            console.log(data);
            let updata = {
                blockNum: data.blockNumber
                ,fromTokenId:data.returnValues.id
                ,toTokenId:data.returnValues.swapid
            };
            console.log(updata);
            _this.getPool(updata.fromTokenId).then(e=>{
              
                updata.fromCost=propertis.web3.utils.fromWei(_this.getReal(e[1]),'ether');
                _this.getPool(updata.toTokenId).then(e=>{
                   
                    updata.toCost=propertis.web3.utils.fromWei(_this.getReal(e[1]),'ether');
                   
                $.ajax({
                    type: "POST",
                    url:  window.propertis.url+"updateIADD",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(updata),
                    success: function (e) {
                      //  if(daoTokenWindow) daoTokenWindow.getData();
                      //  if(daoManagerWindow) daoManagerWindow.getData();
                    }
                });
                })
            })
        });

    }


    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.maxu2t=0;
        this.maxt2u=0;
        this.maxt2t=0;
        const _this=this;
        $.get(window.propertis.url+"getMaxBlock/5",function (e){
            _this.maxu2t=e+1;
        });
        $.get(window.propertis.url+"getMaxBlock/6",function (e){
            _this.maxt2u=e+1;
        });
        $.get(window.propertis.url+"getMaxBlock/7",function (e){
            _this.maxt2t=e+1;
        });
        this.contract=undefined;
        this.address='0x9752AE638E7f62dcB802cC0755570B1af528b6E8';
     this.abi=[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_total_supply",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_initUToken",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_uTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_register",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_feeTaker",
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
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "ethAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "swapTokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "EETHToToken",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "swapTokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "swapid",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "ETokenToToken",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "uAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "TokenToU",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "uAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "UToToken",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "maxAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "NDAOToExactToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "minamount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ndaoAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "NDAOToToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "token_out_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "NDAOToTokenOutputPrice",
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
                    "name": "maxAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ndaoAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "TokenToExactNDAO",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "maxAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id1",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id2",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "TokenToExactToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "minamount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "TokenToNDAO",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "ndao_out_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "TokenToNDAOOutputPrice",
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
                    "name": "minamount1",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minamount2",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "TokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id1",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id2",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_msg",
                    "type": "address"
                }
            ],
            "name": "TokenToToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getFee",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "getPool",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "supply",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "uToken",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IADD.Pool",
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
                    "internalType": "uint256",
                    "name": "ndaoAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getPowerPoolPriceNDAOToToken",
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
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getPowerPoolPriceTokenToNDAO",
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
                }
            ],
            "name": "getTokenFee",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "registerPool",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "tokenFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    
    }
}

