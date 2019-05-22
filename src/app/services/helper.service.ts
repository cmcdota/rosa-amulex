import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';

@Injectable()
export class HelperService {

  constructor(private _http: HttpClient) { }
  public preFlight(): Observable<any> {
    const _headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });
    return this._http.get<any>(`${environment.products}`, { headers: _headers });
  }

}
