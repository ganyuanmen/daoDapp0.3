
export default class Header
{
    constructor(){

        this.selectMenu=undefined;
        this.selectDiv=undefined;
        this.connectBtn=undefined;
        this.disconnectBtn=undefined
        this.connectProve=undefined;
        this.menu=[];
    
    }

    render(){
        let _this=this;
      //tle _0= $('<header class="navbar navbar-expand-md navbar-dark bd-navbar fixed-top  " style="background:#2b669a !important; "></header>');
      let _0= $('<header class="navbar navbar-expand-md navbar-dark bd-navbar" style="background:#2b669a !important; "></header>');
      let _1=$('<nav class="container-xxl flex-wrap flex-md-nowrap" ></nav>').appendTo(_0);

      $('<a class="navbar-brand p-0 me-2" href="./index.html" ><img src="./logo.svg" style="width: 40px"> </a>').appendTo(_1);
      $('<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="bi" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg></button>').appendTo(_1);
     let _2=$('<div class="collapse navbar-collapse" id="bdNavbar"></div>').appendTo(_1);
     let _3=$('<ul class="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0"></ul>').appendTo(_2);

     let _main=$('<div class="container-xxl my-md-4 bd-layout" style="padding-top:20px;" ></div>');
     let _9=$('<main class="bd-main order-1" ></main>').appendTo(_main);
     let _10=$('<div class="bd-content ps-lg-4"></div>').appendTo(_9);


        $.each(window.daodappData.menu,function(i,element){
           
          _this.menu[i]= $('<div></div>').appendTo(_10);
          if(i!=0){
            _this.menu[i].hide();  
          }

          let _c=$('<li class="nav-item col-6 col-md-auto"></li>').appendTo(_3);

           let _d= $('<a class="nav-link p-2 '+(i==0?'active':'')+'" href="#" >'+element+'</a>').data('sid',i)
            .on('click',function(){
                $('#bdNavbar').removeClass('show');
                if(_this.selectMenu) _this.selectMenu.removeClass('active');
                $(this).addClass('active');
                _this.selectMenu=$(this);

                if(_this.selectDiv){
                    _this.selectDiv.hide()
                }

                _this.menu[$(this).data('sid')].show();
                _this.selectDiv=_this.menu[$(this).data('sid')];
            }).appendTo(_c);
           
            if(i==0)
            {
                _this.selectMenu=_d;
                _this.selectDiv=_this.menu[i];

            }

        })
     

        $('<hr class="d-md-none text-white-50" />').appendTo(_2);
        let _4= $('<ul class="navbar-nav flex-row flex-wrap ms-md-auto"></ul>').appendTo(_2);
        let _5=$('<li class="nav-item col-6 col-md-auto"></li>').appendTo(_4);
        let _11 =$('<div></div>').appendTo(_5);
        this.connectBtn= $(' <button class="btn btn-success btn-sm" style="border-radius: 12px;"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/></svg> &nbsp;'
        +window.daodappData.header[0]+'&nbsp;</button>').appendTo(_11);
        let _12=$('<div style="display: none"></div>').appendTo(_5);
        this.connectProve= $('<span tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="bottom" style="margin-right: 20px;display: inline-block; " ></span>').appendTo(_12);
        $('<img></img>').width(24).height(24).attr('src','data:image/svg+xml;base64,'+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>')).appendTo(this.connectProve);
        

        this.disconnectBtn=  $(' <button class="btn btn-warning btn-sm" style="border-radius: 12px;"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/></svg> &nbsp;'
        +window.daodappData.header[1]+'&nbsp;</button>').appendTo(_12);

        $('body').append(_0);
        $('body').append(_main);        
    }



}

