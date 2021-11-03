
export default class Tips
{
    constructor(){

        this.toastParent=undefined;
        this.toast=undefined;
        this.toastBody=undefined;
      
    
    }

    render(){
        let _this=this;
      this.toastParent=$('<div></div>').addClass('tast');
      let _a=$('<div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%" ></div>').appendTo(this.toastParent);
      let _b=$('<div class="toast frentfresh" role="alert" aria-live="assertive" aria-atomic="true"></div>').appendTo(_a);
      let _c=$('<div class="toast-header text-warning">').appendTo(_b);
      $('<strong class="me-auto"></strong>').html(window.daodappData.w_tipMessage).appendTo(_c);
      $('<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>').appendTo(_c);
      this.toastBody= $('<div class="toast-body bg-light"></div>').appendTo(_b);

      $('body').append(this.toastParent);    
      this.toast= new bootstrap.Toast(_b[0], {animation:true,autohide:false});
      
      _b[0].addEventListener('show.bs.toast', function () {_this.toastParent.show();});
      _b[0].addEventListener('hidden.bs.toast', function () {_this.toastParent.hide();});
         
    }

        
    makeBack(htmlstr,isBbutton,isStr) {
        if (isBbutton) this.toastParent.find('button').show(); else this.toastParent.find('button').hide();
        if (isStr) this.toastBody.html(' <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-lock2" viewBox="0 0 16 16">' +
            ' <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0z"/>' +
            ' <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>' +
            '</svg>' +
            '<strong>' + htmlstr + '</strong>');
        else{
        this.toastBody.html(htmlstr);
        }
        this.toast.show();
       

    }

}

