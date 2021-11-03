import DaoSelect from "./daoSelect";
import JSZip from 'jszip'
//import FileSaver from 'file-saver'


export default class CreateDao {
    static $this;
    constructor(_tip) {

        CreateDao.$this=this;

        this.tip=_tip;
        this.div=[undefined,undefined,undefined,undefined];
        this.menu=[undefined,undefined,undefined,undefined];
        this.currentDiv = undefined;
        this.currentMenu=undefined;
        this.imgs=[
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16"><path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/><path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/></svg>'
            ,'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/></svg>'
            ,'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16"><path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>'
            ,'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16"><path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/></svg>'
        ];

        //----------------------registr-----------------------
        this.address=undefined;
        this.daoName=undefined;
        this.Symbol=undefined;
        this.describe=undefined;
        this.daoLogo=undefined;
        this.daoLogoInput=undefined;

        //---------------
        this.logo_daoselect=undefined;
        this.logo_daologo=undefined;
        //---------------
        this.os_daoselect=undefined;
        this.os_m1=undefined;
        this.os_m2=undefined;
        this.os_m3=undefined;
        this.os_m4=undefined;
        this.os_p=undefined;
        this.os_address=undefined;
        //---------------
        this.token_daoselect=undefined;



    }
    

    
    gene_logoSelect(parentDiv,viewDiv) {
        let _this=this;
        $('<input class="form-control" required type="file" accept="image/*"/>').on('change', function () {
            let file = this.files[0];
            let type = this.value.toLowerCase().split('.').splice(-1); //获取上传的文件的后缀名
    
            if (type[0] != 'svg') {
                this.value = '';
              _this.tip.makeBack(daodappData.register[5], true, true)
                return;
            }
            if(file.size>20480)
            {
                this.value = '';
             _this.tip.makeBack(daodappData.register[6], true, true)
                return;
            }
            let reader = new FileReader();
            reader.onload = function () {
                if (reader.result) {
                    let mbytes='0x';
                    //显示文件内容
                    // viewDiv.html(reader.result);
                    viewDiv.empty();                
                    let zip = new JSZip();
                    zip.file("zip",reader.result);
                    console.log("begin:"+reader.result.length);
                    zip.generateAsync({  type: "blob",
                    compression: "DEFLATE",
                    compressionOptions: {
                        level: 9
                    }})
                    .then(function(content) {
                         let reader11 = new FileReader()
                         reader11.addEventListener('loadend', function (e) {
                         console.log("end:"+e.target.result.length)
                         for(let j=0;j<e.target.result.length;j++)
                         {
                           let _a=e.target.result[j].valueOf().charCodeAt(0).toString(16);                       
                           mbytes=mbytes+(_a.length==1?('0'+_a):_a);
                         }

                         viewDiv.data('real_src',mbytes);
                        //  let len=mbytes.length/2-1;
                        //  let array = new Uint8Array(len);
                        //  for(let k=0;k<len;k++)
                        //  {
                        //     array[k] =parseInt(mbytes.substr(2+k*2,2),16);   

                        //  }

                        // for (let i = 0; i < e.target.result.length; i++){
                        //     array[i] = e.target.result.charCodeAt(i);
                        // }
                       // let b = new Blob([array]);
                      
                      //  get_zipstr(b,file.name)


                         })
                         reader11.readAsBinaryString(content)
                    //     FileSaver.saveAs(content, "example.zip");
 
                  

                     

                    });
                  
                    $('<img>').height(32).width(32).attr('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(reader.result)))).appendTo(viewDiv);
                   // viewDiv.data('real_src',reader.result)
                }
            };
            reader.readAsText(file);
        })
            .appendTo(parentDiv);
    }

    clickMenu(menuItem,divIndex){
        if(this.currentMenu) this.currentMenu.removeClass('bg-info');
        $(menuItem).addClass('bg-info');
        this.currentMenu=$(menuItem);
        if(this.currentDiv) this.currentDiv.hide();
        this.div[divIndex].show();
        this.currentDiv=this.div[divIndex];
    }

    up(){
      let _this=this;

      $.ajax({
        type: 'POST',
        url: window.propertis.url + 'getDao?_t='+(new Date()).getTime(),
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({daoName: _this.daoName.val(),daoSymbol:_this.Symbol.val()}),
        success(obj) {

            _this.div[0].removeClass('was-validated');
           if(obj && obj.blockNum)
           {
            _this.tip.makeBack(daodappData.register[8], true, true);
          
           }
           else 
           {
            _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.register[7]+'</div>',false,false);

          
                  _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.register[7]+'</div>',false,false);
                 // propertis.register.create(_this.address.val(), _this.daoName.val(), _this.Symbol.val(), _this.describe.val(), true,_this.daoLogo.data('real_src'))
                 propertis.register.create(_this.address.val(), _this.daoName.val(), _this.Symbol.val(), _this.describe.val(), true,'')
                  .then(re => {
                    _this.tip.toast.hide();
                    _this.address.val('');
                    _this.daoName.val('');
                    _this.Symbol.val('');
                    _this.describe.val('');
                  //  _this.daoLogo.data('real_src','').empty();
                  //  _this.daoLogoInput.find('input').val('');
                   
                
                 })  


           }
            
           
        }
    });

 
      
}

    gene_register(pid)
    {
        let _this=this;
        this.div[0]=$('<form class="row g-2 needs-validation" novalidate ></form>').on('submit',function (e){
            
            if ($(this)[0].checkValidity()) {
               setTimeout(() => {
                   _this.up();
               }, 1);
        }
            $(this).addClass('was-validated')
            e.preventDefault()
            e.stopPropagation()
        });
    
        let _0= $('<div class="form-floating"></div>').appendTo(this.div[0]);
       this.address= $('<input type="text" class="form-control" id="maddress" required  placeholder="'+daodappData.register[0]+'"/>').appendTo(_0);
        $(' <label for="maddress">'+daodappData.register[0]+'</label>').appendTo(_0);

        let _1= $('<div class="form-floating"></div>').appendTo(this.div[0]);
        this.daoName=$('<input type="text" class="form-control" id="mname" required  placeholder="'+daodappData.register[1]+'" />').appendTo(_1);
        $('<label for="mname">'+daodappData.register[1]+'</label>').appendTo(_1);
        let _2= $('<div class="form-floating"></div>').appendTo(this.div[0]);
        this.Symbol= $('<input type="text" class="form-control" id="msname" required placeholder="'+daodappData.register[2]+'" />').appendTo(_2);
        $('<label for="msname">'+daodappData.register[2]+'</label>').appendTo(_2);

        // this.daoLogoInput =$('<div  class="input-group"></div>').appendTo(this.div[0]);
        // let _4=$('<div class="input-group"></div>').appendTo(this.div[0]);
        // $('<span class="input-group-text ga" >logo</span>').appendTo(_4);
        // this.daoLogo= $('<div class="form-control" ></div>').appendTo(_4);

        // this.gene_logoSelect(this.daoLogoInput ,this.daoLogo)

        let _6= $('<div class="form-floating"></div>').appendTo(this.div[0]);
        this.describe=  $('<textarea class="form-control" placeholder="'+daodappData.register[3]+'" required id="mremark" style="height: 220px"></textarea>').appendTo(_6);
        $('<label for="mremark">'+daodappData.register[3]+'</label>').appendTo(_6);
        this.div[0].append('<br/>');
        let _7= $('<div class="d-grid gap-2"></div>').appendTo(this.div[0]);
        _7.append('<br/>');

        let _8= $('<button  class="btn btn-primary" type="submit"> '+daodappData.register[4]+' </button>').appendTo(_7);
        propertis.btns.push(_8[0]);   
        pid.append(this.div[0]);
  
    }

    
 callbackFn(err,re){
    if(err)  CreateDao.$this.tip.toast.hide();
    else  CreateDao.$this.tip.makeBack(daodappData.logo[4]+ ' Hash:'+re,true,true);
}


    gene_logo(pid)
    {
        let _this=this;

        this.div[1]=$('<form class="row g-2 needs-validation" novalidate  style="display: none;" ></form>').on('submit',function (e){
            if ($(this)[0].checkValidity()) {
               _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.register[7]+'</div>',false,false);
                let _id=_this.logo_daoselect.selectobj.val();
                let _a= _this.logo_daoselect.daoManagerWindow.getDataFromId(_id);     
                if(!_a['logodaoId'])
                {
                    console.log('setLogo');
                propertis.bytesLogos.setLogo(_id, _this.logo_daologo.data('real_src'),_this.callbackFn);
                

                }
                else {
                    console.log('changeLogo');
                    propertis.bytesLogos.changeLogo(_id, _this.logo_daologo.data('real_src'), _this.callbackFn);
                }
            }
            $(this).addClass('was-validated');
            e.preventDefault()
            e.stopPropagation()
        });

        this.logo_daoselect=new DaoSelect(this.tip);

       let _0= $('<div class="card" ></div>').appendTo(this.div[1]);
       let _1=$('<div class="card-body"></div>').appendTo(_0);
       $('<div class="card-title">'+daodappData.logo[0]+'</div>').appendTo(_1);
       let _2=$('<div class="input-group mb-2"></div>').appendTo(_1);
       $('<span class="input-group-text ga" >DAO</span>').appendTo(_2);
       let _3=$('<div class="input-group mb-2"></div>').appendTo(_1);
       $('<span class="input-group-text ga" >'+daodappData.logo[1]+'</span>').appendTo(_3);
       let _4=$('<div  class="form-control" ></div>').appendTo(_3);

       this.logo_daoselect.init(_2,_4);

       let _5=$('<div  class="input-grou mb-2"></div>').appendTo(_1);
       let _6=$('<div class="input-group mb-2"></div>').appendTo(_1);
       $('<span class="input-group-text ga" >'+daodappData.logo[2]+'</span>').appendTo(_6);
       this.logo_daologo=$('<div  class="form-control" ></div>').appendTo(_6);

       this.gene_logoSelect(_5 , this.logo_daologo);

       $('<div class="alert alert-warning" role="alert">'+daodappData.logo[3]+'</div>').appendTo(_1);
       _1.append('<br/>');

       let _8= $('<div class="d-grid gap-2"></div>').appendTo(_1);
       
        let _9= $('<button  class="btn btn-primary" type="submit"> '+daodappData.logo[2]+' </button>').appendTo(_8);
        propertis.btns.push(_9[0]);   
        pid.append(this.div[1]);

    }
    
    
    gene_os(pid)
    {
        let _this=this;
        this.div[2]=$('<form class="row g-2 needs-validation" novalidate  style="display: none;" ></form>').on('submit',function (e){
            if ($(this)[0].checkValidity()) {
            
                let _id=_this.os_daoselect.selectobj.val();
                let _a= _this.os_daoselect.daoManagerWindow.getDataFromId(_id);     
            if(_a['osAddress']) {
                     _this.tip.makeBack(daodappData.os[9], true, true)
                     e.preventDefault()
                    e.stopPropagation()
                    return;
                }
            _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.os[10]+'</div>',false,false);
           
            let _daoName =_a['daoName'];
            let _ren1 = [];
            let _ren2 = [];
            _this.os_p.find('input[type="text"]').each(function (i, v) {
                _ren1.push($(v).val())
            })
            _this.os_p.find('input[type="number"]').each(function (i, v) {
                _ren2.push($(v).val())
            })
            let _ar1 = [_this.os_m1.val(), _this.os_m2.val(), _this.os_m3.val(), _this.os_m4.val()];
            //参数编码
            let _voteData =propertis.web3.eth.abi.encodeParameters(['uint32', 'uint32', 'uint32', 'uint32'], _ar1);
            //函数编码
            let _functionCode = propertis.web3.eth.abi.encodeFunctionCall({
                name: 'init',
                type: 'function',
                inputs: [{
                    type: 'bytes',
                    name: 'voteData'
                }, {
                    type: 'uint32',
                    name: '_daoNumber'
                }, {
                    type: 'string',
                    name: '_to'
                }]
            }, [_voteData, _id, '0xE05e6f08eb48830c245313e8bD6Cca22Bf14803C']);
    
            propertis.register.createOs(_daoName, _ren1, _ren2, [_functionCode], [_voteData]).then(re => {     
                _this.div[2].removeClass('was-validated');
                _this.tip.toast.hide();
            });

        }
            
            $(this).addClass('was-validated')
            e.preventDefault()
            e.stopPropagation()
        });

        this.os_daoselect=new DaoSelect(this.tip);

        let _0= $('<div class="card" ></div>').appendTo(this.div[2]);
        let _1=$('<div class="card-body"></div>').appendTo(_0);
        $('<h5 class="card-title">'+daodappData.os[0]+'</h5>').appendTo(_1);
        let _2=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa" >DAO</span>').appendTo(_2);
        let _3=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa" >'+daodappData.logo[1]+'</span>').appendTo(_3);
        let _4=$('<div  class="form-control" ></div>').appendTo(_3);
 
        this.os_daoselect.init(_2,_4);

        let _5=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa"  >'+daodappData.os[1]+'</span>').appendTo(_5);
        this.os_m1=$('<input type="number" required class="form-control" value="1">').appendTo(_5);
        $('<span class="input-group-text ">'+daodappData.os[2]+'</span>').appendTo(_5);
        this.os_m2=$('<input type="number" required class="form-control" value="1">').appendTo(_5);

        let _6=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa"  >'+daodappData.os[2]+'</span>').appendTo(_6);
        this.os_m3=$('<input type="number" required class="form-control" value="1">').appendTo(_6);
        $('<span class="input-group-text ">'+daodappData.os[3]+'</span>').appendTo(_6);
        this.os_m4=$('<input type="number" required class="form-control" value="1">').appendTo(_6);

        this.os_p=$('<div></div>').appendTo(_1);
        let _7=$('<div class="input-group mb-2"></div>').appendTo(this.os_p);
        $('<span class="input-group-text gaa" >'+daodappData.os[5]+'</span>').appendTo(_7);
        this.os_address= $('<input  type="text" required class="form-control" placeholder="0x">').appendTo(_7);
        $('<span class="input-group-text">'+daodappData.os[6]+'</span>').appendTo(_7)
       $('<input type="number" required class="form-control" style="width:80px; max-width: 80px;" value="1">').appendTo(_7);
        this.os_newbutton=$('<button class="input-group-text btn btn-primary ">'+daodappData.os[7]+'</button>').on('click',function(e){
            let _a=$('<div></div>').addClass('input-group mb-2').appendTo(_this.os_p);
            _a.append(
                '<span class="input-group-text gaa" >'+daodappData.os[5]+'</span>' +
                '<input  type="text" required class="form-control" placeholder="0x">' +
                '<span class="input-group-text">'+daodappData.os[6]+'</span>' +
                '<input type="number" required class="form-control" style="width:80px; max-width: 80px;" value="1">');
            $('<button class="btn btn-warning" >'+daodappData.os[8]+'</button>').on('click',function (e1){
                $(this).parent().remove();
                e1.preventDefault()
                e1.stopPropagation()
            }).appendTo(_a);
            e.preventDefault()
            e.stopPropagation()

        }).appendTo(_7);

        _1.append('<br/>');

        let _8= $('<div class="d-grid gap-2"></div>').appendTo(_1);
       
        let _9= $('<button  class="btn btn-primary" type="submit"> '+daodappData.os[0]+' </button>').appendTo(_8);
        propertis.btns.push(_9[0]);   
        pid.append(this.div[2]);

    }

    gene_token(pid)
    {
        let _this=this;
        this.div[3]=$('<form class="row g-2 needs-validation" novalidate  style="display: none;" ></form>').on('submit',function (e){
            if ($(this)[0].checkValidity()) {
            
                let _id=_this.token_daoselect.selectobj.val();
                let _a= _this.token_daoselect.daoManagerWindow.getDataFromId(_id);     
            if(!_a['osAddress']) {
                     _this.tip.makeBack(daodappData.token[3], true, true)
                     e.preventDefault()
                    e.stopPropagation()
                    return;
                }
                if(_a['tokenId']) {
                    _this.tip.makeBack(daodappData.token[0], true, true)
                    e.preventDefault()
                   e.stopPropagation()
                   return;
               }
            _this.tip.makeBack('<div style="text-align: center" ><img src="./lodding.gif" />'+daodappData.token[1]+'</div>',false,false);
           
            propertis.token.issue(_id).then(re => {                   
                _this.div[3].removeClass('was-validated');
                _this.tip.toast.hide();
            });
;

        }
            
            $(this).addClass('was-validated')
            e.preventDefault()
            e.stopPropagation()
        });

        this.token_daoselect=new DaoSelect(this.tip);

        let _0= $('<div class="card" ></div>').appendTo(this.div[3]);
        let _1=$('<div class="card-body"></div>').appendTo(_0);
        $('<h5 class="card-title">'+daodappData.token[2]+'</h5>').appendTo(_1);
        let _2=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa" >DAO</span>').appendTo(_2);
        let _3=$('<div class="input-group mb-2"></div>').appendTo(_1);
        $('<span class="input-group-text gaa" >'+daodappData.logo[1]+'</span>').appendTo(_3);
        let _4=$('<div  class="form-control" ></div>').appendTo(_3);
        this.token_daoselect.init(_2,_4);
        _1.append('<br/>');

        let _8= $('<div class="d-grid gap-2"></div>').appendTo(_1);
       
        let _9= $('<button  class="btn btn-primary" type="submit"> '+daodappData.token[2]+' </button>').appendTo(_8);
        propertis.btns.push(_9[0]);   
        pid.append(this.div[3]);



    }
   render(pid) {
       let _this=this;
       let _menu = $('<div class="shadow-sm p-3 mb-5 bg-body rounded hmenu noselect" ></div>');
       for(let i=0;i<4;i++)
       {
       this.menu[i]=$('<div>'+this.imgs[i]+'<br/>'+daodappData.createDao[i]+'</div>').addClass('hitem').on('click',function (){
           _this.clickMenu(this,i+'')
        }).appendTo(_menu);
       }
      
       this.menu[0].addClass('bg-info');
       this.currentMenu=this.menu[0];
       pid.append(_menu);

//----------------------------------------------------------------------

     this.gene_register(pid);
     this.gene_logo(pid);
     this.gene_os(pid);
     this.gene_token(pid);



     

     
   

        this.currentDiv=this.div[0];
        
//---------------------------------------------------------------------------------------



   }

}
