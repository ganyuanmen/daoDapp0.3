
require("./common/propertis");
require("./locals/daodapp.zh-CN")


import Tips from "./components/tips";
import Header from "./components/header";
import DaoList from "./components/daoList";
import IADDSwap from "./components/IADD_swap";
import CreateDao from "./components/CreateDao";

import DaoConnect from "./components/daoConnect";

const tips=new Tips();
tips.render();

const daoHeader=new Header();
daoHeader.render();

const daolist=new DaoList();
daolist.render(daoHeader.menu[0]);


const iaddSwap=new IADDSwap(tips);
iaddSwap.render(daoHeader.menu[1]);

const daocreate=new CreateDao(tips);
propertis.daoCreate=daocreate;
daocreate.render(daoHeader.menu[2])

const _daoConnect=new DaoConnect(
  function(){
    iaddSwap.mess.html("-");
    iaddSwap.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
    iaddSwap.upJin=propertis.ethBalance;
    iaddSwap.daoInput1.removeAttr('readonly');
    iaddSwap.daoInput1.trigger('input');

    daocreate.address.val(propertis.selectedAccount)
    daocreate.os_address.val(propertis.selectedAccount)
 },
  function(){ 
    iaddSwap.mess.html(daodappData.swap[5]);
    iaddSwap.swapBtn[0].disabled=true;
    iaddSwap.daoInput1.attr('readonly',true);
  
  },
  daoHeader.connectBtn[0],
  daoHeader.disconnectBtn[0],
  daoHeader.connectProve
)


require("./components/footer");