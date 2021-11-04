

# daoDapp0.3
DAO的管理及币值兑换的应用程序 。本程序需要 数据库和 java 后台服务支持。  data.sql mysql 数据库脚本, java_server.rar java后台服务。
- [demo](http://124.71.78.126:8082/)

# 版本升级日记
- IADD 兑换接口增加 接收地址参数;
- 增加IADD兑换事件;
- 增加 eth 直接 兑换 token 接口;
- 对svg图片进行压缩处理后;
- 纠正 “授权”重复显示 及兑换比率计算误差的bug
- 
## src/components 组件
- CreateDao.js : Dao 的管理，包括注册、创建OS、发行token 及logo的更改。
- daoConnect.js : 连接钱包及接口的初始化
- daoList.js : Dao 列表
- daoSelect.js : DAO下拉选择组件 
- daoSelectWindow.js : 币值兑换 dao 选择窗口组件 
- header.js : 菜单
- IADD_swap.js : 币值兑换
- tips.js : 提示窗口
- footer.js : 网页脚注

## src/interface 接口
- commulate.js : 获取最小兑换量接口
- ERC20s.js ： 发行token 接口
- IADD.js ： utoken 和 token, token 和 token 间的相互兑换
- BytesLogos.js ： logo 上传接口
- register.js ：dao注册、创建os 接口
- utoken.js ：eth 兑换 utoken 接口
- 
接口的初始化：
```
new 接口名称(_web3,_selectAccount);
_web3： 连接以太坊的中间件， 如web3 或ethers, 
_selectAccount: 钱包的用户ID

```

## src/locals 语言 
- daodapp.zh-CN.js ： 中文

## 网站的启动
```

import Tips from "./components/tips";
import Header from "./components/header";
import DaoList from "./components/daoList";
import IADDSwap from "./components/IADD_swap";
import CreateDao from "./components/CreateDao";
import DaoConnect from "./components/daoConnect";

 //初始化提示窗口
const tips=new Tips();
tips.render();

//生成菜单
const daoHeader=new Header();
daoHeader.render(); 

 //生成dao 列表模块
const daolist=new DaoList();
daolist.render(daoHeader.menu[0]);

//生成兑换模块
const iaddSwap=new IADDSwap(tips);
iaddSwap.render(daoHeader.menu[1]); 

//生成dao 创建模块
const daocreate=new CreateDao(tips);
propertis.daoCreate=daocreate;
daocreate.render(daoHeader.menu[2]) 

//生成连接钱包组件 
const _daoConnect=new DaoConnect(
  function(){ //连接后 回调
    iaddSwap.mess.html("-");
    iaddSwap.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
    iaddSwap.upJin=propertis.ethBalance;
    iaddSwap.daoInput1.removeAttr('readonly');
    iaddSwap.daoInput1.trigger('input');

    daocreate.address.val(propertis.selectedAccount)
    daocreate.os_address.val(propertis.selectedAccount)
 },
  function(){  //退出后 回调
    iaddSwap.mess.html(daodappData.swap[5]);
    iaddSwap.swapBtn[0].disabled=true;
    iaddSwap.daoInput1.attr('readonly',true);
  
  },
  daoHeader.connectBtn[0],
  daoHeader.disconnectBtn[0],
  daoHeader.connectProve
)
```

## IADD 主要兑换函数
```
{
// utoken 兑换成 token
/* 
 * @param {*} _mintoken :  最小兑换量 通过commulate 接口获取
 * @param {*} _token :  兑换量 (单位：wei)
 * @param {*} _id : token ID
 * @param {*} _address : 接收地址
 * @returns 
 */
 async NDAOToToken(_mintoken,_token,_id,_address) 

//token 兑换成 utoken
/*
 * @param {*} _mintoken :  最小兑换量 通过commulate 接口获取
 * @param {*} _token :  兑换量 (单位：wei)
 * @param {*} _id : token ID
 * @param {*} _address : 接收地址
 * @returns 
 */
async TokenToNDAO(_mintoken,_token,_id,_address) 

//token 兑换 token 
/*
 * @param {*} _mintoken1 : token1 最小兑换量 通过commulate 接口获取
 * @param {*} _mintoken2 : token2 最小兑换量 通过commulate 接口获取
 * @param {*} _token1 : 兑换量 (单位：wei)
 * @param {*} _id1 : token1 ID
 * @param {*} _id2 : token1 ID
 * @param {*} _address : 接收地址
 * @returns 
 */
async TokenToToken(_mintoken1,_mintoken2,_token,_id1,_id2,_address) {
}

```




