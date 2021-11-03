
export default class DaoList
{
    constructor(){ 
      this.mainDiv=undefined;
      this.daoInput=undefined;
      this.order1=undefined; //按时间
      this.order2=undefined; //按字母
      this.requestObj={};
      this.total=undefined;
      this.currentPage=undefined;
      this.currentIndex=undefined;

    
    }

    
 showData (paras) {
   let _this=this;
   this.requestObj = paras
    $.ajax({
        type: 'POST',
        url: window.propertis.url+ 'getData',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(paras),
        success (obj) {
          //  console.log(obj)
           _this.total.html(obj.total)
            _this.currentPage.html(obj.pages)
           _this.currentIndex.html(obj.current)
           _this.mainDiv.empty()
            $.each(obj.records, function (_i, v) {
                const _div = $('<div></div>').addClass('card').appendTo(_this.mainDiv)
                const _div1 = $('<div></div>').addClass('card-body').appendTo(_div)
                $('<div class="nowrap" style="padding-bottom: 10px; font-size: 11px"></div>')
                    .html(window.daodappData.daoList[3]+": "+ v.osAddress).appendTo(_div1)
                $('<h4 class="nowrap" ></h4>').html(v.daoName).appendTo(_div1)
                const _div2 = $(' <div style="display: flex;"></div>').appendTo(_div1)

                if(!v.daoLogo || v.daoLogo.length<12 ) {
                    v.daoLogo = '<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="83.9390387%" y1="42.6668547%" x2="16.4712778%" y2="98.0841187%" id="linearGradient-1"><stop stop-color="#FFFFFF" offset="5%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#736264" offset="62%"></stop><stop stop-color="#413A4C" offset="82%"></stop><stop stop-color="#2D2A42" offset="93%"></stop></linearGradient><linearGradient x1="88.5697538%" y1="37.4905169%" x2="21.0433763%" y2="99.9110614%" id="linearGradient-2"><stop stop-color="#F7F7F7" offset="15%"></stop><stop stop-color="#9B8278" offset="49%"></stop><stop stop-color="#8A7470" offset="56%"></stop><stop stop-color="#584C57" offset="75%"></stop><stop stop-color="#393348" offset="90%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="95.1348183%" y1="54.2882407%" x2="1.93434936%" y2="34.4456123%" id="linearGradient-3"><stop stop-color="#F7F7F7" offset="17%"></stop><stop stop-color="#9B8278" offset="55%"></stop><stop stop-color="#554A56" offset="81%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="85.8147714%" y1="52.0313108%" x2="-5.04103165%" y2="34.8667347%" id="linearGradient-4"><stop stop-color="#F7F7F7" offset="9%"></stop><stop stop-color="#9B8278" offset="42%"></stop><stop stop-color="#736264" offset="56%"></stop><stop stop-color="#413A4C" offset="76%"></stop><stop stop-color="#2D2A42" offset="86%"></stop></linearGradient><linearGradient x1="11.6647128%" y1="46.9804696%" x2="105.568581%" y2="67.939563%" id="linearGradient-5"><stop stop-color="#F7F7F7" offset="16%"></stop><stop stop-color="#F3F2F2" offset="17%"></stop><stop stop-color="#C4B6B0" offset="31%"></stop><stop stop-color="#A69088" offset="42%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#63555C" offset="68%"></stop><stop stop-color="#2D2A42" offset="87%"></stop></linearGradient><linearGradient x1="57.8546307%" y1="107.980059%" x2="26.4361079%" y2="25.8183825%" id="linearGradient-6"><stop stop-color="#F7F7F7" offset="12%"></stop><stop stop-color="#9B8278" offset="51%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="54.982415%" y1="103.717192%" x2="30.0117233%" y2="22.5704843%" id="linearGradient-7"><stop stop-color="#F7F7F7" offset="16%"></stop><stop stop-color="#9B8278" offset="51%"></stop><stop stop-color="#736264" offset="65%"></stop><stop stop-color="#413A4C" offset="86%"></stop><stop stop-color="#2D2A42" offset="96%"></stop></linearGradient><linearGradient x1="12.8370457%" y1="61.1900244%" x2="75.6154748%" y2="3.59057887%" id="linearGradient-8"><stop stop-color="#F7F7F7" offset="12%"></stop><stop stop-color="#9B8278" offset="54%"></stop><stop stop-color="#2D2A42" offset="93%"></stop></linearGradient><linearGradient x1="14.1852286%" y1="59.5153269%" x2="82.7667057%" y2="-0.773784409%" id="linearGradient-9"><stop stop-color="#F7F7F7" offset="8%"></stop><stop stop-color="#9B8278" offset="45%"></stop><stop stop-color="#61545C" offset="66%"></stop><stop stop-color="#3B3649" offset="81%"></stop><stop stop-color="#2D2A42" offset="90%"></stop></linearGradient><linearGradient x1="45.8382181%" y1="0.545674256%" x2="72.6846424%" y2="77.6832578%" id="linearGradient-10"><stop stop-color="#F7F7F7" offset="11%"></stop><stop stop-color="#9B8278" offset="43%"></stop><stop stop-color="#736264" offset="61%"></stop><stop stop-color="#413A4C" offset="85%"></stop><stop stop-color="#2D2A42" offset="97%"></stop></linearGradient><linearGradient x1="45.8382181%" y1="-5.64563179%" x2="66.2368113%" y2="83.9760606%" id="linearGradient-11"><stop stop-color="#F7F7F7" offset="21%"></stop><stop stop-color="#9B8278" offset="50%"></stop><stop stop-color="#61535B" offset="71%"></stop><stop stop-color="#3B3549" offset="87%"></stop><stop stop-color="#2D2A42" offset="95%"></stop></linearGradient><linearGradient x1="7.97186401%" y1="46.8789728%" x2="101.23095%" y2="63.981187%" id="linearGradient-12"><stop stop-color="#F7F7F7" offset="13%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#836F6C" offset="56%"></stop><stop stop-color="#554A55" offset="76%"></stop><stop stop-color="#383347" offset="91%"></stop><stop stop-color="#2D2A42" offset="100%"></stop></linearGradient>    </defs>    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="资源-2" fill-rule="nonzero"><circle id="椭圆形" fill="#141E3D" cx="30" cy="30" r="30"></circle><polygon id="路径" fill="url(#linearGradient-1)" points="30 30 21.47 15.23 12.94 30"></polygon><polygon id="路径" fill="url(#linearGradient-2)" points="55.59 44.77 47.06 30 38.53 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-3)" points="30 30 38.53 15.23 21.47 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-4)" points="30 59.55 38.53 44.77 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-5)" points="30 0.46 21.47 15.23 38.53 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-6)" points="38.53 15.23 30 30 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-7)" points="12.94 30 4.41 44.77 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-8)" points="30 30 38.53 44.77 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-9)" points="4.41 15.23 12.94 30 21.47 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-10)" points="30 30 12.94 30 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-11)" points="55.59 15.23 38.53 15.23 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-12)" points="30 30 21.47 44.77 38.53 44.77"></polygon></g>    </g></svg>';
                }
                $('<img/>').width(64).height(64).attr('src',"data:image/svg+xml;base64,"+window.btoa(unescape(encodeURIComponent(v.daoLogo)))).appendTo(_div2);

               // $('<img/>').width(64).height(64).attr('src',"data:image/svg+xml;base64,"+window.btoa(v.daoLogo)).appendTo(_div2);
             //   $('<div></div>').html(v.daoLogo).appendTo(_div2)
                $('<p class="card-text carde" style="padding-left: 16px;text-indent:2em;" ></p>').html(v.daoDsc).appendTo(_div2)
                const _div3 = $('<div style="display: flex; align-items: center;justify-content: space-between; font-size: 10px; padding-top: 12px;"></div>').appendTo(_div1)
                $('<div></div>').html(window.daodappData.daoList[4]+'：' +v.daoTime).appendTo(_div3)
                $('<div></div>').html(window.daodappData.daoList[5]+'：'+v.utokenCost+' UTOKEN').appendTo(_div3)
                $('<div></div>').html(window.daodappData.daoList[6]+'：'+v.daoIndex).appendTo(_div3)
            })
        },
    })
}

    render(paraObj){
       
        let _this=this;
        let _0=$('<div style="display: flex; padding-right: 10px; padding-left: 10px; padding-top: 10px;  align-items: center;justify-content: space-between; font-size: 12px;"></div>');
        let _1=$('<div style="display: flex; justify-content: center; align-items: center;flex:1; padding-left: 10px; padding-right:30px; " ></div>').appendTo(_0);
        $('<img style="margin-right: -24px; z-index: 999"></img>').attr('src','data:image/svg+xml;base64,'+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>')).appendTo(_1);
        this.daoInput=$('<input class="form-control form-control-sm" placeholder="'+window.daodappData.daoList[0]+'" style="border-radius: 20px;flex:1;padding-left: 30px; "></input>')
        .on('keydown',function(e){
                if(e.keyCode === 13)
                {
                  
                        const obj = { title: $(this).val().trim() }
                         if (_this.order2.hasClass('ac')) {
                             obj.order = 'dao_name'
                         } else if (_this.order1.hasClass('ac')) {
                             obj.order = 'dao_time'
                         }
                        _this.showData($.extend(_this.requestObj,obj))
                  
                }
        })
        .appendTo(_1);

        let _2=$('<div></div>').appendTo(_0);
        this.order1=$('<span></span>').addClass('t').html(window.daodappData.daoList[1])
        .on('click',function(){
            const obj = { order: 'dao_time', title: _this.daoInput.val().trim() }
                _this.showData($.extend(_this.requestObj,obj))
            _this.order2.removeClass('ac')
            $(this).addClass('ac')
        })
        .appendTo(_2);
        this.order2=$('<span></span>').addClass('t').html(window.daodappData.daoList[2])
        .on('click',function(){
            const obj = { order: 'dao_name', title: _this.daoInput.val().trim() }
            _this.showData($.extend(_this.requestObj,obj))
        _this.order1.removeClass('ac')
        $(this).addClass('ac')
        })
        .appendTo(_2);

        this.mainDiv=$('<div></div>');
        //------------------------------------------------------------

        let _a=$('<div style="padding: 6px 10px;  display:  flex; justify-content: space-between;" ></div>');
        let _b=$('<div>'+window.daodappData.daoList[7]+'： &nbsp;</div>').appendTo(_a);
        this.total=$('<span style="color: blueviolet;font-weight: bold;"></span>').appendTo(_b);
        $('<span>&nbsp; DAO</span>').appendTo(_b);

        let _c=$('<div>'+window.daodappData.daoList[8]+'： &nbsp;</div>').appendTo(_a);
        this.currentIndex=$('<span style="color: blueviolet;font-weight: bold;"></span>').appendTo(_c);

        let _d=$('<div>'+window.daodappData.daoList[9]+'： &nbsp;</div>').appendTo(_a);
        this.currentPage=$('<span style="color: blueviolet;font-weight: bold;"></span>').appendTo(_d);

        let _z= $('<div style="display: flex; justify-content: center;  align-items: center;" ></div>');

        let _z99=$('<div class="btn-group" role="group" style="padding-top:12px;" ></div>').appendTo(_z);

        $('<button class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/></svg></button>').on('click',function(){
            if (_this.currentIndex.html() !== '1') {
                      _this.requestObj.pageNum = 1
                       _this.showData(_this.requestObj)
                    }
        }).appendTo(_z99);

        $('<button class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></button>').on('click',function(){
            const curn = parseInt(_this.currentIndex.html())
                if (curn < parseInt(_this.currentPage.html())) {
                   _this.requestObj.pageNum = curn + 1
                   _this.showData(_this.requestObj)
                }
        }).appendTo(_z99);

        $('<button class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg></button>').on('click',function(){
            const curn = parseInt(_this.currentIndex.html())
                if (curn > 1) {
                   _this.requestObj.pageNum = curn - 1
                   _this.showData(_this.requestObj)
                }
        }).appendTo(_z99);

        $('<button class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/></svg></button>').on('click',function(){
            if (_this.currentIndex.html() !== _this.currentPage.html()) {
                        _this.requestObj.pageNum = _this.currentPage.html()
                        _this.showData(_this.requestObj)
                     }
        }).appendTo(_z99);
      
        paraObj.append(_0);
        paraObj.append(this.mainDiv);
        paraObj.append(_a); //脚注
        paraObj.append(_z);  //页码

       this.showData({pageSize:4})

    }

        
  

}
