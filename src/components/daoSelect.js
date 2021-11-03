import DaoSelectWindow from "./daoSelectWindow";

export default class DaoSelect {
  
    constructor(_tip) {
        this.tip=_tip;
        this.selectobj=undefined;
        this.viewDiv=undefined;
        this.daoManagerWindow=undefined;
    }

  show1(daoId)
  {
      let _this=this;
      for(let i=0;i<_this.daoManagerWindow.dataAll.length;i++)
      {
          if(_this.daoManagerWindow.dataAll[i]["daoId"]==daoId)
          {
              this.selectobj
                  .data('osaddress',_this.daoManagerWindow.dataAll[i]["osAddress"])
                  .data('tokenid',_this.daoManagerWindow.dataAll[i]["tokenId"])
                  .data('logodaoId',_this.daoManagerWindow.dataAll[i]["logodaoId"])
                  .data('daoname',_this.daoManagerWindow.dataAll[i]["daoName"])
                  .empty()
                  .append('<option value="'+daoId+'" >'+_this.daoManagerWindow.dataAll[i]['daoName']+'('+_this.daoManagerWindow.dataAll[i]['daoSymbol']+')</option>');
              this.viewDiv.empty();
              $('<img>').height(32).width(32).attr('src','data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(_this.daoManagerWindow.dataAll[i]['daoLogo'])))).appendTo(this.viewDiv);
              break;
          }
      }

  }
    init(parentDiv,viewDiv) {
        let _this = this;
        this.viewDiv = viewDiv;
        this.selectobj = $('<select required class="form-select form-control" ></select>').appendTo(parentDiv);
        $('<button class="input-group-text btn btn-primary ">'+daodappData.daoselect[0]+'</button>').on('click', function (e) {
            if (propertis.isConnect) {
                if (_this.daoManagerWindow === undefined) {
                    _this.daoManagerWindow = new DaoSelectWindow({id: 0, managerAddress:propertis.selectedAccount});
                    _this.daoManagerWindow.setFn(function (daoId) {
                        _this.show1(daoId);
                    })
                } else {
                    _this.daoManagerWindow.setFn(function (daoId) {
                        _this.show1(daoId);
                    })
                   _this.daoManagerWindow.model.show();
                }
            } else {
               _this.tip.makeBack(daodappData.noConnect, true, true);
            }
            e.preventDefault()
            e.stopPropagation()
        }).appendTo(parentDiv);
    }
}
