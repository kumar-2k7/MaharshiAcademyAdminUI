import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private _http: HttpClient) { }

  postRequest(url, request) {
    const fullUrl = environment.baseUrl + url;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.post(fullUrl, request, headers);
  }

  getRequest(url) {
    const fullUrl = environment.baseUrl + url;
    return this._http.get(fullUrl);
  }

}
