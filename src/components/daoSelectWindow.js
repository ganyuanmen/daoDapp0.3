export default class DaoSelectWindow {
    setFn(_fn) {
        this.fn = _fn;
    }

  

    getDataFromId(id)
    {
        let re={};
        for(let i=0;i<this.dataAll.length;i++)
        {
            if(this.dataAll[i]["daoId"]==id)
            {
                re=this.dataAll[i];
                break;
            }
        }
        return re;
    }
    gene_item(key) {
        let _this = this;
        this.listBody.empty();
        let obj = this.dataAll;
        if (key) {
            obj = [];
            if (this.dataSearch[key] !== undefined && this.dataSearch[key].length) {
                obj = this.dataSearch[key];
            }
        }
        obj.forEach(function (v) {
            let _item = $('<div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"></div>').data('dao_id', v["daoId"])
            .on('click', function () {
                _this.fn.call(_this.getDataFromId($(this).data('dao_id')), $(this).data('dao_id'));
                _this.model.hide();
            }).appendTo(_this.listBody);
            $('<span></span>').html(v['daoSymbol']).appendTo(_item);
            $('<img/>').height(24).width(24).attr('src', 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(v['daoLogo'])))).appendTo(_item);
        })
    }

    getData(paras) {
        let _this = this;
        if(paras.tokenId)
        $.ajax({
            type: 'POST',
            url: window.propertis.url + 'getTokenDaoList?_t='+(new Date()).getTime(),
            contentType: 'application/json',
            dataType: 'json',
            success(obj) {
              
                  if(paras.isEth){
                      _this.dataAll=[ { daoId:-1,blockNum:-1,daoName:'ETH',daoSymbol:'eth',daoDsc:'',daoTime:'',daoManager:'0x'
                          ,daoLogo:'<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M19.9 30L7.5 22.7 19.9 40l12.4-17.3zm.2-30L7.7 20.4l12.4 7.3 12.4-7.2z" fill="#38393a"/></svg>'
                          ,osAddress:'0x',tokenId:-1}];
                  }
                  else {
                      _this.dataAll=[];
                  }

               _this.dataAll.push( { daoId:-2,blockNum:-2,daoName:'UTOKEN',daoSymbol:'utoken',daoDsc:'',daoTime:'',daoManager:'0x'
                   ,daoLogo:'<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="83.9390387%" y1="42.6668547%" x2="16.4712778%" y2="98.0841187%" id="linearGradient-1"><stop stop-color="#FFFFFF" offset="5%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#736264" offset="62%"></stop><stop stop-color="#413A4C" offset="82%"></stop><stop stop-color="#2D2A42" offset="93%"></stop></linearGradient><linearGradient x1="88.5697538%" y1="37.4905169%" x2="21.0433763%" y2="99.9110614%" id="linearGradient-2"><stop stop-color="#F7F7F7" offset="15%"></stop><stop stop-color="#9B8278" offset="49%"></stop><stop stop-color="#8A7470" offset="56%"></stop><stop stop-color="#584C57" offset="75%"></stop><stop stop-color="#393348" offset="90%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="95.1348183%" y1="54.2882407%" x2="1.93434936%" y2="34.4456123%" id="linearGradient-3"><stop stop-color="#F7F7F7" offset="17%"></stop><stop stop-color="#9B8278" offset="55%"></stop><stop stop-color="#554A56" offset="81%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="85.8147714%" y1="52.0313108%" x2="-5.04103165%" y2="34.8667347%" id="linearGradient-4"><stop stop-color="#F7F7F7" offset="9%"></stop><stop stop-color="#9B8278" offset="42%"></stop><stop stop-color="#736264" offset="56%"></stop><stop stop-color="#413A4C" offset="76%"></stop><stop stop-color="#2D2A42" offset="86%"></stop></linearGradient><linearGradient x1="11.6647128%" y1="46.9804696%" x2="105.568581%" y2="67.939563%" id="linearGradient-5"><stop stop-color="#F7F7F7" offset="16%"></stop><stop stop-color="#F3F2F2" offset="17%"></stop><stop stop-color="#C4B6B0" offset="31%"></stop><stop stop-color="#A69088" offset="42%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#63555C" offset="68%"></stop><stop stop-color="#2D2A42" offset="87%"></stop></linearGradient><linearGradient x1="57.8546307%" y1="107.980059%" x2="26.4361079%" y2="25.8183825%" id="linearGradient-6"><stop stop-color="#F7F7F7" offset="12%"></stop><stop stop-color="#9B8278" offset="51%"></stop><stop stop-color="#2D2A42" offset="99%"></stop></linearGradient><linearGradient x1="54.982415%" y1="103.717192%" x2="30.0117233%" y2="22.5704843%" id="linearGradient-7"><stop stop-color="#F7F7F7" offset="16%"></stop><stop stop-color="#9B8278" offset="51%"></stop><stop stop-color="#736264" offset="65%"></stop><stop stop-color="#413A4C" offset="86%"></stop><stop stop-color="#2D2A42" offset="96%"></stop></linearGradient><linearGradient x1="12.8370457%" y1="61.1900244%" x2="75.6154748%" y2="3.59057887%" id="linearGradient-8"><stop stop-color="#F7F7F7" offset="12%"></stop><stop stop-color="#9B8278" offset="54%"></stop><stop stop-color="#2D2A42" offset="93%"></stop></linearGradient><linearGradient x1="14.1852286%" y1="59.5153269%" x2="82.7667057%" y2="-0.773784409%" id="linearGradient-9"><stop stop-color="#F7F7F7" offset="8%"></stop><stop stop-color="#9B8278" offset="45%"></stop><stop stop-color="#61545C" offset="66%"></stop><stop stop-color="#3B3649" offset="81%"></stop><stop stop-color="#2D2A42" offset="90%"></stop></linearGradient><linearGradient x1="45.8382181%" y1="0.545674256%" x2="72.6846424%" y2="77.6832578%" id="linearGradient-10"><stop stop-color="#F7F7F7" offset="11%"></stop><stop stop-color="#9B8278" offset="43%"></stop><stop stop-color="#736264" offset="61%"></stop><stop stop-color="#413A4C" offset="85%"></stop><stop stop-color="#2D2A42" offset="97%"></stop></linearGradient><linearGradient x1="45.8382181%" y1="-5.64563179%" x2="66.2368113%" y2="83.9760606%" id="linearGradient-11"><stop stop-color="#F7F7F7" offset="21%"></stop><stop stop-color="#9B8278" offset="50%"></stop><stop stop-color="#61535B" offset="71%"></stop><stop stop-color="#3B3549" offset="87%"></stop><stop stop-color="#2D2A42" offset="95%"></stop></linearGradient><linearGradient x1="7.97186401%" y1="46.8789728%" x2="101.23095%" y2="63.981187%" id="linearGradient-12"><stop stop-color="#F7F7F7" offset="13%"></stop><stop stop-color="#9B8278" offset="47%"></stop><stop stop-color="#836F6C" offset="56%"></stop><stop stop-color="#554A55" offset="76%"></stop><stop stop-color="#383347" offset="91%"></stop><stop stop-color="#2D2A42" offset="100%"></stop></linearGradient>    </defs>    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="资源-2" fill-rule="nonzero"><circle id="椭圆形" fill="#141E3D" cx="30" cy="30" r="30"></circle><polygon id="路径" fill="url(#linearGradient-1)" points="30 30 21.47 15.23 12.94 30"></polygon><polygon id="路径" fill="url(#linearGradient-2)" points="55.59 44.77 47.06 30 38.53 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-3)" points="30 30 38.53 15.23 21.47 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-4)" points="30 59.55 38.53 44.77 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-5)" points="30 0.46 21.47 15.23 38.53 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-6)" points="38.53 15.23 30 30 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-7)" points="12.94 30 4.41 44.77 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-8)" points="30 30 38.53 44.77 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-9)" points="4.41 15.23 12.94 30 21.47 15.23"></polygon><polygon id="路径" fill="url(#linearGradient-10)" points="30 30 12.94 30 21.47 44.77"></polygon><polygon id="路径" fill="url(#linearGradient-11)" points="55.59 15.23 38.53 15.23 47.06 30"></polygon><polygon id="路径" fill="url(#linearGradient-12)" points="30 30 21.47 44.77 38.53 44.77"></polygon></g>    </g></svg>'
                   ,osAddress:'0x',tokenId:-2});
                  obj.forEach(function (v){_this.dataAll.push(v)});

               
                for (let i = 0; i < 10; i++) {
                    let isok = false;
                    obj.forEach(function (v) {
                        let _item = v['daoSymbol'].substr(0, i + 1);
                        if (_item.length == i + 1) {
                            isok = true;
                            if (_this.dataSearch[_item] === undefined) _this.dataSearch[_item] = [];
                            _this.dataSearch[_item].push(v);
                        }
                    })
                    if (!isok) break;
                }
                if(!paras.noshow)
                 _this.model.show();
            }
        });
        else 
        $.ajax({
            type: 'POST',
            url: window.propertis.url + 'getDaoList?_t='+(new Date()).getTime(),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(paras),
            success(obj) {
               
                    _this.dataAll = obj;
                
                for (let i = 0; i < 10; i++) {
                    let isok = false;
                    obj.forEach(function (v) {
                        let _item = v['daoSymbol'].substr(0, i + 1);
                        if (_item.length == i + 1) {
                            isok = true;
                            if (_this.dataSearch[_item] === undefined) _this.dataSearch[_item] = [];
                            _this.dataSearch[_item].push(v);
                        }
                    })
                    if (!isok) break;
                }
                if(!paras.noshow)
                 _this.model.show();
            }
        });
    }


    constructor(paras) {
        this.fn = undefined;
        this.modelwindow = undefined;
        this.dataAll = [];
        this.dataSearch = [];
        this.searchInput = undefined;
        this.model = undefined;
        this.lastKey = undefined;
        this.listBody = undefined;

        let _this = this;
        this.modelwindow = $('<div class="modal fade"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"></div>').appendTo('body');
        let _w = $('<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>').appendTo(this.modelwindow);
        let _context = $('<div class="modal-content"></div>').css('border-radius', '15px').appendTo(_w);
        let _header = $('<div class="modal-header d-flex justify-content-between"></div>').css({
            paddingBottom: 6,
            paddingTop: 12
        }).appendTo(_context);
        this.searchInput = $('<input type="text" placeholder="搜索项目、地址"/>').css({
            flex: 1,
            border: 0,
            outline: 0
        }).on('keyup', function () {
            let _t = $(this).val().trim();
            if (_t != _this.lastKey) {
                _this.gene_item(_t);
                _this.lastKey = _t;
            }

        }).appendTo(_header);
        $('<i class="bi bi-search"></i>').appendTo(_header);
        let _body = $('<div class="modal-body"></div>').css("min-height",'400px').appendTo(_context);
        this.listBody = $('<div class="list-group "></div>').appendTo(_body);

        this.model = new bootstrap.Modal(this.modelwindow[0], {keyboard: false});
      //  this.window[0].addEventListener('shown.bs.modal', function () {
        this.modelwindow[0].addEventListener('show.bs.modal', function () {
           _this.searchInput.val('');
            _this.gene_item('');
        })
        this.getData(paras);
    }
}

