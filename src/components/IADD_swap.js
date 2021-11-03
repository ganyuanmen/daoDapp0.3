import DaoSelectWindow from "./daoSelectWindow";
//import Header from "../components/header";

export default class IADDSwap
{
    static $this;
    constructor(_tip){ 
      this.tip=_tip;
     
      this.blanceof1=undefined; //输入
      this.blanceof2=undefined; //输出
      this.daoInput1=undefined;
      this.daoInput2=undefined;
      this.daoButton1=undefined;
      this.daoButton2=undefined;
      this.swapBtn=undefined;
      this.price=undefined;
      this.mess=undefined;

      this.daoModel1=undefined;
      this.daoModel2=undefined;
      this.currentselectDao1={daoId:-1,tokenId:-1,daoSymbol:'eth'};
      this.currentselectDao2={};
      this.upJin=0;
      this.bili=0;

      this.btnImg='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>'
     
      IADDSwap.$this=this;
    
    }

    
 btn2even(dao_id){
  let _this=IADDSwap.$this;
  _this.daoButton2.empty().html('<span style="padding: 1px 4px" >'+ this.daoSymbol+'</span>'+_this.btnImg);
  $('<img/>').height(24).width(24).attr('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(this.daoLogo)))).prependTo(_this.daoButton2);    
 _this.currentselectDao2=_this.daoModel2.getDataFromId(dao_id);
 if(_this.currentselectDao1.tokenId == _this.currentselectDao2.tokenId)
      {
        _this.daoButton1.html(daodappData.swap[2]+_this.btnImg);
        _this.daoInput1.val('');
        _this.blanceof1.html('');   
        _this.currentselectDao1= {};
        _this.swapBtn.attr('disabled',true);
        _this.bili=0;
      }
    
   if(dao_id==-2)
    {
       _this.blanceof2.html(daodappData.swap[6]+"："+  propertis.utokenBalace);
    } else {
    
      
        propertis.token.balanceOf(this.tokenId,propertis.selectedAccount).then(balance=>{
     
          _this.blanceof2.html(daodappData.swap[6]+"：" + propertis.IADD.fromWei(balance));

        });
    }
    _this.gene_bili();
}

    btn1even(dao_id){
 
      let _this=IADDSwap.$this;
      _this.daoButton1.parent().find("._approve").remove();
      _this.daoButton1.empty().html('<span style="padding: 1px 4px" >'+ this.daoSymbol+'</span>'+_this.btnImg);
      $('<img/>').height(24).width(24).attr('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(this.daoLogo)))).prependTo(_this.daoButton1);    
     _this.currentselectDao1=_this.daoModel1.getDataFromId(dao_id);
     _this.daoInput1.removeAttr('readonly');
     if(_this.currentselectDao1.tokenId == _this.currentselectDao2.tokenId)
      {
        _this.daoButton2.html(daodappData.swap[2]+_this.btnImg);
        _this.daoInput2.val('');
        _this.blanceof2.html('');   
        _this.currentselectDao2= {};
        _this.swapBtn.attr('disabled',true);
        _this.bili=0;
      }
    // document.getElementById("dw_inputtext1").disabled = false;
    // document.getElementById("dw_inputtext1").value='';
    // document.getElementById("dw_outputtext1").value='';
    if(dao_id==-1) {
        _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
        _this.upJin=propertis.ethBalance;
    } else if(dao_id==-2)
    {
       _this.blanceof1.html(daodappData.swap[6]+"："+  propertis.utokenBalace);
       _this.upJin= propertis.utokenBalace;
       propertis.utoken.allowance(propertis.selectedAccount,propertis.IADD.address).then(r=>{
          if(r==0){              
             let _prevbtn=_this.swapBtn[0].disabled;
             let _prev=_this.mess.html();
             _this.swapBtn.attr('disabled',true);         
             _this.mess.html(daodappData.swap[7]);
              $('<button class="_approve btn btn-info" style="border-radius: 20px;" >'+daodappData.swap[8]+'</button>').on('click',function (){
                  let __this=this;
                 _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[9]+'</div>',false,false);
                  propertis.utoken.approve(propertis.IADD.address, propertis.web3.utils.toWei("9999999999", 'ether')).then(e=>{
                      _this.tip.toast.hide();
                      _this.swapBtn[0].disabled=_prevbtn;         
                      _this.mess.html(_prev);
                      $(__this).remove();
                  })
              }).prependTo(_this.daoButton1.parent());
          }
        })
    } 
     else {
        propertis.token.balanceOf(this.tokenId,propertis.selectedAccount).then(balance => {
            _this.blanceof1.html(daodappData.swap[6]+"：" + propertis.IADD.fromWei(balance));
            _this.upJin =propertis.IADD.fromWei(balance);

            propertis.token.approveAll(propertis.selectedAccount, propertis.IADD.address).then(r => {
                if (!r) {
                  let _prevbtn=_this.swapBtn[0].disabled;
                  let _prev=_this.mess.html();
                  _this.swapBtn.attr('disabled',true);         
                  _this.mess.html(daodappData.swap[7]);
                 
                  $('<button class="_approve btn btn-info" style="border-radius: 20px;" >'+daodappData.swap[8]+'</button>').on('click',function (){
                    let __this=this;
                    _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[9]+'</div>',false,false);
                    propertis.token.approve2(propertis.IADD.address, true).then(e => {
                      _this.tip.toast.hide();
                      _this.swapBtn[0].disabled=_prevbtn;         
                      _this.mess.html(_prev);
                      $(__this).remove();

                        })
                    }).prependTo(_this.daoButton1.parent());

                }
            })
        });
    }
    _this.gene_bili();
    }

     gene_mess()
      {
          let _b = parseFloat(this.daoInput1.val());
          let _bili=this.bili;
          if(_bili>0 && _b>0) {
              this.mess.html(daodappData.swap[10]  + _b + " " +this.currentselectDao1['daoSymbol']
                  + "<br/> "+daodappData.swap[11] + (_b * _bili).toFixed(4) + ' ' + this.currentselectDao2['daoSymbol'] + daodappData.swap[12]);
              this.daoInput2.val((_b * _bili).toFixed(4));

          } else {
             this.daoInput2.val('');
             this.mess.html('-');
          }
      }
    gene_bili(){
      let _this=this;
      let obj1=_this.currentselectDao1;
      let obj2=_this.currentselectDao2;    
    if(obj1.daoId ==-1) {
        if (obj2.tokenId == -2) { //eth to utoken
            _this.price.html("1 ETH =" + propertis.ethToUtokenBili + "utoken");
            _this.bili= propertis.ethToUtokenBili;
            _this.gene_mess();
        } else {  // eth to token
          if(obj2.tokenId) {
            propertis.commulate.NDAOToToken(propertis.web3.utils.toWei(propertis.ethToUtokenBili.toString(),"ether"),obj2.tokenId).then(e=>{
              let _realv=propertis.IADD.fromWei(e);
                _this.price.html('1 eth ≈ '+_realv+' '+obj2['daoSymbol'])
                _this.bili=_realv;
               _this.gene_mess();
            })
          // let _v=propertis.ethToUtokenBili *(1-5/100000)
            // let _upv=propertis.web3.utils.toWei(_v.toString(),'ether');
            // // console.log("_upv:"+_upv)
            // propertis.IADD.getPowerPoolPriceNDAOToToken(_upv,obj2.tokenId).then(e=>{
            //     let _min=Math.round(e*(1-195/100000));
            //     let _realv=propertis.IADD.fromWei(_min);
            //     //  console.log(_realv);
            //     _this.price.html('1 eth = '+_realv+' '+obj2['daoSymbol']);
            //     _this.bili=_realv;
            //     _this.gene_mess();
            // })
          }
        }
    } else  if( obj1.daoId==-2) { //utoken to token
      if(obj2.tokenId) {
        propertis.commulate.NDAOToToken(propertis.web3.utils.toWei("1","ether"),obj2.tokenId).then(e=>{
          let _realv=propertis.IADD.fromWei(e);
            _this.price.html('1 utoken ≈ '+_realv+' '+obj2['daoSymbol'])
            _this.bili=_realv;
           _this.gene_mess();
        })
        // let _v=1-5/100000;
        // let _upv=propertis.web3.utils.toWei(_v.toString(),'ether');
        // // console.log("_upv:"+_upv)
        // propertis.IADD.getPowerPoolPriceNDAOToToken(_upv,obj2.tokenId).then(e=>{
        //     let _min=Math.round(e*(1-195/100000));
        //     let _realv=propertis.IADD.fromWei(_min);
        //     //console.log(_realv);
        //     _this.price.html('1 utoken = '+_realv+' '+obj2['daoSymbol'])
        //     _this.bili=_realv;
        //    _this.gene_mess();
        // })
      }
    } else if(obj1.daoId) {
        if (obj2.tokenId == -2) {  //token to utoken
          propertis.commulate.TokenToNDAO(propertis.web3.utils.toWei("1","ether"),obj1.tokenId).then(e=>{
            let _realv=propertis.IADD.fromWei(e);
            _this.price.html('1 '+obj1['daoSymbol']+' ≈ '+_realv+' utoken');
              _this.bili=_realv;
             _this.gene_mess();
          })
            // let _v=1-195/100000;
            // let _upv=propertis.web3.utils.toWei(_v.toString(),'ether');
            // console.log("_upv:"+_upv)
            // propertis.IADD.getPowerPoolPriceTokenToNDAO(_upv,obj1.tokenId).then(e=>{
            //     let _min=Math.round(e*(1-5/100000));
            //     let _realv=propertis.IADD.fromWei(_min);
            //     console.log(_realv);
            //     _this.price.html('1 '+obj1['daoSymbol']+' = '+_realv+' utoken');
            //     _this.bili=_realv;
            //    _this.gene_mess();
            // })
        } else {  //token to token
          if(obj2.tokenId && obj1.tokenId) {
            propertis.commulate.TokenToToken(propertis.web3.utils.toWei("1","ether"),obj1.tokenId,obj2.tokenId).then(e=>{
            
              let _realv=propertis.IADD.fromWei(e[1]);
              _this.price.html('1 '+obj1['daoSymbol']+' ≈ '+_realv+' '+obj2['daoSymbol']);
                _this.bili=_realv;
               _this.gene_mess();
            })
            // let _v=1-195/100000;
            // let _upv=propertis.web3.utils.toWei(_v.toString(),'ether');
            // propertis.IADD.getPowerPoolPriceTokenToNDAO(_upv,obj1.tokenId).then(e=>{
            //     let _min=Math.round(e*(1-5/100000));
            //     propertis.IADD.getPowerPoolPriceNDAOToToken(_min.toString(),obj2.tokenId).then(e=>{
            //         let _min1=Math.round(e*(1-195/100000));
            //         let _realv1=propertis.IADD.fromWei(_min1);
            //         _this.price.html('1 '+obj1['daoSymbol']+' = '+_realv1+' '+obj2['daoSymbol']);
            //         _this.bili=_realv1;
            //        _this.gene_mess();
            //     })
            // })
          }

        }
    }
    _this.gene_mess();

    }

    render(paraObj){
        let _this=this;
     //   let _0=$('<div style="padding-top:100px" ></div>');
     let _0=$('<div style="padding-top:10px" ></div>');
        let _1=$('<div class="card"></div>').appendTo(_0);
        let _2=$('<div class="card-body"></div>').appendTo(_1);
        let _3=$('<div class="d-flex justify-content-between align-content-center" style="padding-bottom: 16px"></div>').appendTo(_2);
        $('<div></div>').html(daodappData.swap[0]).appendTo(_3);
        this.blanceof1=$('<div style="color: #984c0c"></div>').appendTo(_3);
        let _4=$('<div class="d-flex justify-content-between align-content-center"></div>').appendTo(_2);
        this.daoInput1=$('<input readonly type="text" autocomplete="off" style="font-size: 26px;border: 0; outline: none; min-width: 10px; flex: 1 " placeholder="0.0" />')
        .on('input',function(event){


// document.getElementById("dw_inputtext1").addEventListener("input",function(event) {
    event.target.value = event.target.value.replace(/[^\d^\.]/, "");
    let _b = parseFloat(event.target.value);

    if(!_b) _b=0;
   // event.target.value=_b;
   // _this.daoInput2.val((propertis.ethToUtokenBili * _b).toFixed(4));

    if (!_b) {
        _this.swapBtn[0].disabled = true;
        this.classList.add('redText');
        _this.mess.html(daodappData.swap[13]);
        _this.daoInput2.val('')
        return;
    }
    else
    if (_b > _this.upJin) {
       _this.swapBtn[0].disabled = true;
       this.classList.add('redText');
       _this.mess.html(daodappData.swap[14]);
    } else {
        _this.swapBtn[0].disabled = false;
        this.classList.remove('redText');
        _this.gene_mess();
    }


// });

        }).appendTo(_4);
        let _5=$('<div style="word-break: keep-all; white-space: nowrap"></div>').appendTo(_4);
        this.daoButton1=$('<button class="btn btn-lg btn-outline-secondary " style="border-radius: 26px;" ></button>')
        .on('click',function(){
          if (propertis.isConnect) {
                  
                    if (_this.daoModel1 === undefined) {
                        _this.daoModel1 = new DaoSelectWindow({tokenId: 1, seacherText: '',isEth:true});
                        _this.daoModel1.setFn(_this.btn1even);
                    } else {
                        _this.daoModel1.model.show();
                    }
            
                }else {
                  _this.tip.makeBack(daodappData.noConnect, true, true);
                }
        })
        .appendTo(_5);
        $('<img/>').height(24).width(24).attr('src', 'data:image/svg+xml;base64,' + window.btoa('<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M19.9 30L7.5 22.7 19.9 40l12.4-17.3zm.2-30L7.7 20.4l12.4 7.3 12.4-7.2z" fill="#38393a"/></svg>')).appendTo(this.daoButton1);
        $('<span>eth</span>').appendTo(this.daoButton1);

       let _6= $('<div style="text-align: center; padding-top:10px;"></div>').appendTo(_0);
       $('<img/>').height(24).width(24).attr('src', 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>')).appendTo(_6);

       let _7=$('<div class="card"></div>').appendTo(_0);
       let _8=$('<div class="card-body"></div>').appendTo(_7);
       let _9=$('<div class="d-flex justify-content-between align-content-center" style="padding-bottom: 16px"></div>').appendTo(_8);
       $('<div></div>').html(daodappData.swap[1]).appendTo(_9);
       this.blanceof2=$('<div style="color: #984c0c"></div>').appendTo(_9);
       let _10=$('<div class="d-flex justify-content-between align-content-center"></div>').appendTo(_8);
       this.daoInput2=$('<input readonly type="text" autocomplete="off" style="font-size: 26px;border: 0; outline: none; min-width: 10px; flex: 1 " placeholder="0.0" />').appendTo(_10);
       let _11=$('<div style="word-break: keep-all; white-space: nowrap"></div>').appendTo(_10);
       this.daoButton2=$('<button class="btn btn-lg btn-outline-secondary " style="border-radius: 26px;" >'+daodappData.swap[2]+'</button>')
       .on('click',function(){
        if (propertis.isConnect) {           
          if (_this.daoModel2 === undefined) {
              _this.daoModel2 = new DaoSelectWindow({tokenId: 1, seacherText: ''});
              _this.daoModel2.setFn(_this.btn2even);
          } else {
              _this.daoModel2.model.show();
          }
  
      }else {
        _this.tip.makeBack(daodappData.noConnect, true, true);
      }
       })
       .appendTo(_11);

       //--------------------------------------
       let _a=$('<div class="d-flex justify-content-between align-content-center text-black-50" style="padding: 6px 10px" ></div>').appendTo(_0);
       $('<div></div>').html(daodappData.swap[3]).appendTo(_a);
       this.price=$('<div></div>').appendTo(_a);

       this.mess =$('<div style="text-align: center;color: red; padding:10px;" >'+daodappData.swap[5]+'</div>').appendTo(_0);

       let _b=$('<div class="d-grid gap-2"></div>').appendTo(_0);

       this.swapBtn=$('<button id="swapbtn1" class="btn btn-primary" >'+daodappData.swap[4]+'</button>').on('click',function(){
        if(_this.currentselectDao1.tokenId==-1 && _this.currentselectDao2.tokenId==-2)
        {
            _this.eth_utoken();
        } else if(_this.currentselectDao1.tokenId==-1 && _this.currentselectDao2.tokenId>0)
        {
          _this.eth_token();
        } else if(_this.currentselectDao1.tokenId==-2 && _this.currentselectDao2.tokenId>0)
        {
          _this.utoken_token();
        }else if(_this.currentselectDao1.tokenId>0 && _this.currentselectDao2.tokenId==-2)
        {
          _this.token_utoken();
        } else if(_this.currentselectDao1.tokenId>0 && _this.currentselectDao2.tokenId>0)
        {
          _this.token_token();
        }
       }).appendTo(_b);

       //propertis.btns.push(this.swapBtn[0])

       paraObj.append(_0);

      

    }

   closeok()
    {
       this.tip.toast.hide();
       this.daoInput1.val('');
       this.daoInput2.val('');
       this.swapBtn[0].disabled=true;
       this.mess.html("-");

    }

  eth_utoken() {
    let _this=this;
   this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);

    propertis.utoken.swap(_this.daoInput1.val()).then(re => {
      _this.closeok();
        propertis.web3.eth.getBalance(propertis.selectedAccount).then(balance => {
            const ethBalance = propertis.web3.utils.fromWei(balance, "ether");
            propertis.ethBalance = parseFloat(ethBalance).toFixed(4);
            _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
            _this.upJin=propertis.ethBalance;
        })
        propertis.utoken.balanceOf(propertis.selectedAccount).then(balance => {
            const ethBalance = propertis.web3.utils.fromWei(balance, "ether");
            propertis.utokenBalace = parseFloat(ethBalance).toFixed(4);
            _this.blanceof2.html(daodappData.swap[6]+ '：'+propertis.utokenBalace);
        });
    });
}


  eth_token() {

    //this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />暂不提供</div>',true,true);

    let _this=this;
    let _upv = propertis.web3.utils.toWei(_this.daoInput1.val(), 'ether');
    this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
   // console.log(" utoken合约地址："+propertis.utoken.address)
    propertis.utoken.getEthToNDAOInputPrice(_upv).then(e=>{
      
     // console.log("commulate合约地址:"+propertis.commulate.address)
      propertis.commulate.NDAOToToken(e,_this.currentselectDao2.tokenId).then(e1=>{
      
      //  console.log("ethToToken合约地址："+propertis.ethToToken.address)
        propertis.ethToToken.ETHToExactToken(e1,e,_this.currentselectDao2.tokenId,_upv).then(e2=>{
          _this.closeok();
          propertis.web3.eth.getBalance(propertis.selectedAccount).then(balance => {
              const ethBalance = propertis.web3.utils.fromWei(balance, "ether");
              propertis.ethBalance = parseFloat(ethBalance).toFixed(4);
              _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
             _this.upJin=propertis.ethBalance;
          })
          propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
            _this.blanceof2.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
          });
        })

      })

    })

    // let _v1 = parseFloat(_this.daoInput1.val())*propertis.ethToUtokenBili;
    // let _v = _v1 * (1 - 5 / 100000);

    // let _upv = propertis.web3.utils.toWei(_v.toString(), 'ether');
    // propertis.IADD.getPowerPoolPriceNDAOToToken(_upv,_this.currentselectDao2.tokenId).then(e => {

    //     let _min =propertis.IADD.fromWei(Math.round(e * (1 - 195 / 100000)))-1;
    //     propertis.IADD.NDAOToToken(propertis.web3.utils.toWei(_min.toString(),'ether'), propertis.web3.utils.toWei(_v1.toString(), 'ether'), _this.currentselectDao2.tokenId)
    //         .then(re => {
    //           _this.closeok();
    //             propertis.web3.eth.getBalance(propertis.selectedAccount).then(balance => {
    //                 const ethBalance = propertis.web3.utils.fromWei(balance, "ether");
    //                 propertis.ethBalance = parseFloat(ethBalance).toFixed(4);
    //                 _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.ethBalance);
    //                _this.upJin=propertis.ethBalance;
    //             })
    //             propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
    //               _this.blanceof2.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
    //             });
    //         })
    // });
}

 utoken_token() {
  let _this=this;
  let _upv = propertis.web3.utils.toWei(_this.daoInput1.val(), 'ether');
  propertis.commulate.NDAOToToken(_upv, _this.currentselectDao2.tokenId).then(e => {
    this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
    propertis.IADD.NDAOToToken(e,_upv, _this.currentselectDao2.tokenId,propertis.selectedAccount)
    .then(re => {
      _this.closeok();
        propertis.utoken.balanceOf(propertis.selectedAccount).then(balance => {
            const ethBalance =propertis.web3.utils.fromWei(balance, "ether");
            propertis.utokenBalace = parseFloat(ethBalance).toFixed(4);
            _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.utokenBalace);
            _this.upJin=propertis.utokenBalace;
        })
        propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
          _this.blanceof2.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
        });
    })
       
  });

}


// utoken_token() {
//   let _this=this;
//   this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
//     let _v1 = parseFloat(_this.daoInput1.val());
//     let _v = _v1 * (1 - 5 / 100000);
//     let _upv =propertis.web3.utils.toWei(_v.toString(), 'ether');
//     propertis.IADD.getPowerPoolPriceNDAOToToken(_upv, _this.currentselectDao2.tokenId).then(e => {
//         let _min =propertis.IADD.fromWei(e) * (1 - 195 / 100000);
//         _min=_min-1;
//         let _minup=propertis.web3.utils.toWei(_min.toString(),'ether');

//         propertis.IADD.NDAOToToken(_minup,propertis.web3.utils.toWei(_v1.toString(), 'ether'), _this.currentselectDao2.tokenId)
//             .then(re => {
//               _this.closeok();
//                 propertis.utoken.balanceOf(propertis.selectedAccount).then(balance => {
//                     const ethBalance =propertis.web3.utils.fromWei(balance, "ether");
//                     propertis.utokenBalace = parseFloat(ethBalance).toFixed(4);
//                     _this.blanceof1.html(daodappData.swap[6]+ '：'+propertis.utokenBalace);
//                     _this.upJin=propertis.utokenBalace;
//                 })
//                 propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
//                   _this.blanceof2.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
//                 });
//             })
//     });
// }


  token_utoken() {
    let _this=this;
    let _upv = propertis.web3.utils.toWei(_this.daoInput1.val(), 'ether');
    propertis.commulate.TokenToNDAO(_upv, _this.currentselectDao1.tokenId).then(e => {

      this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
      propertis.IADD.TokenToNDAO(e,_upv, _this.currentselectDao1.tokenId, propertis.selectedAccount)
      .then(re => {
          _this.closeok();
          propertis.utoken.balanceOf(propertis.selectedAccount).then(balance => {
              const ethBalance =propertis.web3.utils.fromWei(balance, "ether");
              propertis.utokenBalace = parseFloat(ethBalance).toFixed(4);
              _this.blanceof2.html(daodappData.swap[6]+ '：'+propertis.utokenBalace);

          })
          propertis.token.balanceOf(_this.currentselectDao1.tokenId, propertis.selectedAccount).then(balance => {
            _this.blanceof1.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
            _this.upJin=propertis.IADD.fromWei(balance);
           
          });
      })
    });
}

// token_utoken() {
//   let _this=this;
//   this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
//   let _v1 = parseFloat(_this.daoInput1.val());
//   let _v = _v1 * (1 - 195/100000);
//   let _upv = propertis.web3.utils.toWei(_v.toString(), 'ether');
//   propertis.IADD.getPowerPoolPriceTokenToNDAO(_upv, _this.currentselectDao1.tokenId).then(e => {
//       let _min = Math.round(e * (1 - 5/100000))-1;
//       propertis.IADD.TokenToNDAO(_min.toString(),propertis.web3.utils.toWei(_v1.toString(), 'ether'), _this.currentselectDao1.tokenId)
//           .then(re => {
//               _this.closeok();
//               propertis.utoken.balanceOf(propertis.selectedAccount).then(balance => {
//                   const ethBalance =propertis.web3.utils.fromWei(balance, "ether");
//                   propertis.utokenBalace = parseFloat(ethBalance).toFixed(4);
//                   _this.blanceof2.html(daodappData.swap[6]+ '：'+propertis.utokenBalace);

//               })
//               propertis.token.balanceOf(_this.currentselectDao1.tokenId, propertis.selectedAccount).then(balance => {
//                 _this.blanceof1.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
//                 _this.upJin=propertis.IADD.fromWei(balance);
               
//               });
//           })
//   });
// }

token_token() {
  let _this = this;
  let _upv = propertis.web3.utils.toWei(_this.daoInput1.val(), 'ether');

  propertis.commulate.TokenToToken(_upv, _this.currentselectDao1.tokenId, _this.currentselectDao2.tokenId).then(e => {
      this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />' + daodappData.swap[15] + '</div>', false, false);
      propertis.IADD.TokenToToken(e[0], e[1], _upv, _this.currentselectDao1.tokenId, _this.currentselectDao2.tokenId, propertis.selectedAccount)
          .then(re => {
              _this.closeok();

              propertis.token.balanceOf(_this.currentselectDao1.tokenId, propertis.selectedAccount).then(balance => {
                  _this.blanceof1.html(daodappData.swap[6] + '：' + propertis.IADD.fromWei(balance));
                  _this.upJin = propertis.IADD.fromWei(balance);
              });
              propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
                  _this.blanceof2.html(daodappData.swap[6] + '：' + propertis.IADD.fromWei(balance));
              });
          })
  })

}

  //   let _this=this;
  //   this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.swap[15]+'</div>',false,false);
  //   let _v1 = parseFloat(_this.daoInput1.val());
  //   console.log("12 aaa((tokenId->1) 兑换成 bbb(tokenId->2)");
  //   let _v = _v1 * (1 - 195/100000);
  //   console.log("扣手续费195/100000 后："+_v);
  //   let _upv=propertis.web3.utils.toWei(_v.toString(),'ether');
  //   console.log("请求：getPowerPoolPriceTokenToNDAO("+_upv+","+_this.currentselectDao1.tokenId+")");
  //   propertis.IADD.getPowerPoolPriceTokenToNDAO(_upv,_this.currentselectDao1.tokenId).then(e=>{
     
  // console.log("返回："+e);
  
  // let _min = propertis.IADD.fromWei(e)-0.0001;
  // _min=_min*(1 - 5/100000);


  //    // let _min =Math.round(e * (1 - 5/100000));
  //       console.log("去掉 5/100000 手续费："+_min);
  //       let _u1=propertis.web3.utils.toWei(_min.toString(), 'ether')
  //       console.log("请求： getPowerPoolPriceNDAOToToken("+_u1+","+_this.currentselectDao2.tokenId+")");
  //       propertis.IADD.getPowerPoolPriceNDAOToToken(_u1+'',_this.currentselectDao2.tokenId).then(e=>{
  //         console.log("返回："+e);

  //         let _min1=propertis.IADD.fromWei(e)-0.0001;
  //         _min1=_min1*(1-195/100000);
          
          
  //           console.log("扣手续费195/100000 并减1后："+_min1);
           
  //         let _w1=propertis.web3.utils.toWei(_min.toString(),'ether')
  //         let _w2=propertis.web3.utils.toWei(_min1.toString(),'ether')

  //           console.log("请求：TokenToToken("+_w1+","+_w2+","+propertis.web3.utils.toWei(_v1.toString(),'ether')+','+_this.currentselectDao1.tokenId+","+_this.currentselectDao2.tokenId)
  //           propertis.IADD.TokenToToken(_w1+'',_w2+'',propertis.web3.utils.toWei(_v1.toString(),'ether')
  //               ,_this.currentselectDao1.tokenId,_this.currentselectDao2.tokenId)
  //               .then(re => {
  //                 _this.closeok();

  //                   propertis.token.balanceOf(_this.currentselectDao1.tokenId,propertis.selectedAccount).then(balance => {
  //                     _this.blanceof1.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
  //                     _this.upJin=propertis.IADD.fromWei(balance);
  //                   });
  //                   propertis.token.balanceOf(_this.currentselectDao2.tokenId, propertis.selectedAccount).then(balance => {
  //                     _this.blanceof2.html(daodappData.swap[6]+ '：' + propertis.IADD.fromWei(balance));
  //                   });
  //               })
  //       })


  //   })

//}

}