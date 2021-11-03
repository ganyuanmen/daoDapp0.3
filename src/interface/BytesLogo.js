import JSZip from 'jszip'
export default class BytesLogos
{
    async getLogo(id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getFile(id).call({from: this.selectedAccount});
        return result;
    }
     setLogo(id,logo,callback) {
      

        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        this.contract.methods.setLogo(id,logo,'zip').send({from: this.selectedAccount},function (err,re){callback.call(this,err,re);});

    }
    changeLogo(id,logo,callback) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        this.contract.methods.changeLogo(id,logo,'zip').send({from: this.selectedAccount},function (err,re){callback.call(this,err,re);});

    }
    async get_svgimg(bytesStr,file_name)
    {
        let result= await this.get_real_file(bytesStr,file_name);
        return result;
    }

     get_real_file(bytesStr,file_name)
    {
        
        let p = new Promise(function(resolve, reject){
		
            let len=bytesStr.length/2-1;
            let array = new Uint8Array(len);
             for(let k=0;k<len;k++)
             {
                array[k] =parseInt(bytesStr.substr(2+k*2,2),16);   
             }
            let b = new Blob([array]);  
            let new_zip = new JSZip();
            new_zip.loadAsync(b)
            .then(function(mzip) {
                mzip.file(file_name).async("blob").then(blob=>{
                   var reader = new FileReader()
                   reader.addEventListener('loadend', function (e) {
                       resolve(e.target.result)
                   })
                   reader.readAsText(blob)
    
                }); 
            });
        });

		   return p
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
               
                _this.get_svgimg(re.fileContent,re.fileType).then(e=>{
                    updata.daoLogo =e;
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
                _this.get_svgimg(re.fileContent,re.fileType).then(e=>{
                    updata.daoLogo =e;
                 
                    $.ajax({
                        type: "POST",
                        url: window.propertis.url+"updateChangeLogo",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(updata),
                        success: function (e) {
                        //  if(daoTokenWindow) daoTokenWindow.getData();
                        //  if(daoManagerWindow) daoManagerWindow.getData();
                        }
                    });
                })
                // $.ajax({
                //     type: "POST",
                //     url:  window.propertis.url+"updateChangeLogo",
                //     contentType: "application/json",
                //     dataType: "json",
                //     data: JSON.stringify(updata),
                //     success: function (e) {
                //       //  if(daoTokenWindow) daoTokenWindow.getData();
                //       //  if(daoManagerWindow) daoManagerWindow.getData();
                //     }
                // });
            })
        });

    }

    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;
        this.address='0x973369d6E1c51d04eB21455E2de5B1435df34510';
        this.setMaxBlock=0;
        this.changeMaxBlock=0;
        const _this=this;
        $.get(window.propertis.url+"getMaxBlock/1",function (e){
            _this.setMaxBlock=e+1;
        });
        $.get(window.propertis.url+"getMaxBlock/2",function (e){
            _this.changeMaxBlock=e+1;
        });
      
       this.abi=[
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
                    "internalType": "bytes",
                    "name": "_logo",
                    "type": "bytes"
                },
                {
                    "internalType": "string",
                    "name": "_fileType",
                    "type": "string"
                }
            ],
            "name": "changeLogo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_index",
                    "type": "uint32"
                }
            ],
            "name": "getFile",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "fileType",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "fileContent",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct Logo.file",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
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
                    "internalType": "bytes",
                    "name": "_logo",
                    "type": "bytes"
                },
                {
                    "internalType": "string",
                    "name": "_fileType",
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

