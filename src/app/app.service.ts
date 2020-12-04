import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';
declare var $: any;

@Injectable()
export class AppService {
   
    public userName:any = '';

    constructor(private _http: HttpClient) { }

 //Notifications
    public showNotification(from, align,message,messagetype){
    //   const type = ['','info','success','warning','danger'];

    //   const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: message

      },{
          //type: type[color],
          type :messagetype,
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

    public validateUser(req): Observable<any> {
        return this._http.post('https://nodeapicontainers.azurewebsites.net/fetchUserDetails',req);
    }

    public getGraphData(): Observable<any>{
        return this._http.get('https://nodeapicontainers.azurewebsites.net/graph');
    }
    
    public submitUser(data): Observable<any>{
        return this._http.post('https://nodeapicontainers.azurewebsites.net/submitUser',data);
    }

    public fetchUser(data){
        return this._http.post('https://nodeapicontainers.azurewebsites.net/showUserDetails',data);
    }

    public fetchTableData(data): Observable<any>{
        return this._http.post('https://nodeapicontainers.azurewebsites.net/fetchTableData',data);
    }
}