import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, combineLatest } from 'rxjs';


@Injectable()
export class AppService {
   
    public userName:any = '';

    constructor(private _http: HttpClient) { }

    public validateUser(req): Observable<any> {
        return this._http.post('https://nodeapicontainers.azurewebsites.net/fetchUserDetails',req);
    }

    public getGraphData(){
        return this._http.get('https://nodeapicontainers.azurewebsites.net/graph');
    }
 
}