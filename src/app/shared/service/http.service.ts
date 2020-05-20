import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  post(url: any, body: any, options: any): Observable<any> {
    return this._http.post(url, body, options);
  }
  postWithoutHeader(url: any, body: any): Observable<any> {
    return this._http.post(url, body);
  }
  get(url: any, options: any): Observable<any> {
    return this._http.get(url, options);
  }

  getWithoutHeader(url): Observable<any> {
    return this._http.get(url);
  }

  put(url: any, body: any, options: any): Observable<any> {
    return this._http.put(url, body, options);
  }
  putWithOutToken(url: any, body: any): Observable<any> {
    return this._http.put(url, body);
  }
  delete(url: any, options: any): Observable<any> {
    return this._http.delete(url, options);
  }
  deleteWithoutToken(url: any): Observable<any> {
    return this._http.delete(url);
  }
}
