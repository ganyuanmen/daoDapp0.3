
import Utoken from "../interface/Utoken";
import Register from "../interface/register";
import ERC20s from "../interface/ERC20s";
//import Logos from "../interface/logos";
import IADD from "../interface/IADD";
import Commulate from "../interface/commulate"; 
import EthToToken from "../interface/EthToToken";
import BytesLogos from "../interface/BytesLogo";
//import Web3 from "web3";
//import Web3Modal from "web3modal";


 export default  class DaoConnect {
    constructor(_onConnectCallBack,_onDisconnectCallBack,_conectBtn,_disconnectBtn,_prove) {
        this.onConnectCallBack=_onConnectCallBack;
        this.onDisconnectCallBack = _onDisconnectCallBack;
        this.Web3Modal=window.Web3Modal.default;
        this.WalletConnectProvider = window.WalletConnectProvider.default;
        this.Fortmatic = window.Fortmatic;
        this.evmChains = window.evmChains;
        this.web3Modal=undefined;
        this.provider=undefined;
        this.conectBtn=_conectBtn;
        console.log(_conectBtn)
        this.disconnectBtn=_disconnectBtn;
        this.connectProve=_prove;
        this.isListener=false;
        
        const _this=this;
        window.addEventListener('load', async () => {
           _this.init();   
           _this.conectBtn.addEventListener("click", function(){
             setTimeout(function(){
                $('#bdNavbar').removeClass('show');
             },3000)
           
               _this.onConnect();
           });
           _this.disconnectBtn.addEventListener("click",function(){
            setTimeout(function(){
                $('#bdNavbar').removeClass('show');
             },3000)
               _this.onDisconnect();
           });
        });
    }

    init() {
         this.setDisable(true);
          const providerOptions = {
              walletconnect: {
                  package: this.WalletConnectProvider,
                  options: {
                      infuraId: "9676a35d629d488fb90d7eac1348c838",
                  }
              },
              fortmatic: {
                  package: this.Fortmatic,
                  options: {
                      key: "pk_test_391E26A3B43A3350"
                  }
              }
          };
        
         this.web3Modal = new this.Web3Modal({
              cacheProvider: false,
              providerOptions,
              disableInjectedProvider: false
          });

    }

    
async  onConnect() {
 
    const _this=this;
    try {
        this.provider = await this.web3Modal.connect();
    } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    this.provider.on("accountsChanged", (accounts) => {
        _this.fetchAccountData();
    });
    this.provider.on("chainChanged", (chainId) => {
       _this.fetchAccountData();
    });
    this.provider.on("networkChanged", (networkId) => {
       _this.fetchAccountData();
    });
   await this.fetchAccountData();
}

async  onDisconnect() {
    if(this.provider.close) {
        await this.provider.close();
        await this.web3Modal.clearCachedProvider();
        this.provider = null;
    }
    window.propertis.selectedAccount = null;
    this.setDisable(true);
   
}


 setDisable(lok) {
    window.propertis.isConnect=!lok;
    window.propertis.btns.forEach(function (v){
         v.disabled=lok;
     })

     if(!lok) {
        this.onConnectCallBack.call(null);
        $(this.conectBtn).parent().hide();
        $(this.disconnectBtn).parent().show();
     }
     else 
     {
        this.onDisconnectCallBack.call(null);
        $(this.conectBtn).parent().show();
        $(this.disconnectBtn).parent().hide();
     }
    
 }



async  fetchAccountData() {
    const _this=this;

    window.propertis.web3 = new Web3(this.provider);
  
    const chainId = await window.propertis.web3.eth.getChainId();
    const accounts = await window.propertis.web3.eth.getAccounts();
    window.propertis.selectedAccount = accounts[0];
    const balance = await window.propertis.web3.eth.getBalance(window.propertis.selectedAccount);
    const ethBalance = window.propertis.web3.utils.fromWei(balance, "ether");
    window.propertis.ethBalance= parseFloat(ethBalance).toFixed(4);
    this.setDisable(false);
    new bootstrap.Popover(_this.connectProve[0],{content:
    '<div><strong>Connected blockchain:</strong> <span>'+chainId+'</span></div>' +
    '<div><strong>Selected account:</strong> <span>'+accounts[0]+'</span></div>' +
    '<div><strong>ETH balance:</strong> <span>'+balance+'</span></div>',html:true});

    if(! window.propertis.utoken)
    window.propertis.utoken=new Utoken( window.propertis.web3,window.propertis.selectedAccount);
    if(! window.propertis.register)
    window.propertis.register=new Register( window.propertis.web3,window.propertis.selectedAccount);
    if(!window.propertis.IADD)
    window.propertis.IADD=new IADD( window.propertis.web3,window.propertis.selectedAccount);
    if(!window.propertis.token)
    window.propertis.token=new ERC20s( window.propertis.web3,window.propertis.selectedAccount);
   // if(!window.propertis.logo)
   // window.propertis.logo=new Logos( window.propertis.web3,window.propertis.selectedAccount);
    if(!window.propertis.commulate)
    window.propertis.commulate=new Commulate( window.propertis.web3,window.propertis.selectedAccount);
    if(!window.propertis.ethToToken)
    window.propertis.ethToToken=new EthToToken( window.propertis.web3,window.propertis.selectedAccount);
    if(!window.propertis.bytesLogos)
    window.propertis.bytesLogos=new BytesLogos( window.propertis.web3,window.propertis.selectedAccount);


    window.propertis.utoken.balanceOf(window.propertis.selectedAccount).then(balance=>{
        const ethBalance = window.propertis.web3.utils.fromWei(balance, "ether");
        window.propertis.utokenBalace  = parseFloat(ethBalance).toFixed(4);
      
    });


    window.propertis.utoken.getPrice().then(balance=>{
        const r1 = parseFloat(balance) /  Math.pow(10,8); //(100000000);
        window.propertis.ethToUtokenBili = parseFloat(r1).toFixed(0);
 
    });

    setTimeout(() => {
        _this.listeners();
    }, 15000);
   

    }

    listeners()
    {

        if(!this.isListener) {

            window.propertis.register.listener_events();
            window.propertis.bytesLogos.listener_events();
            window.propertis.token.listener_events();
            window.propertis.IADD.listener_events();
            this.isListener=true;
        }
    }
}
