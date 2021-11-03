export default class EthToToken
{
    async ETHToExactToken(_ethmin,_utokenmin,_id,_eth) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
       // console.log("ETHToExactToken('"+_ethmin+"','"+_utokenmin+"','"+_id+"')");
        let result= await this.contract.methods.ETHToExactToken(_ethmin,_utokenmin,_id).send({from: this.selectedAccount, value: this.web3.utils.toHex(_eth)});
      //  console.log(result+"-------------------->");
        return result;
    }
    
  

   
    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;
        this.address='0x71EC469Cc6C2dc4013331Ae31074BBDCb1238D09';      
        this.abi=
        [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_IADD",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_uToken",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
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
                        "name": "minNdaoAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "ETHToExactToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            }
        ]
     

    }
}

