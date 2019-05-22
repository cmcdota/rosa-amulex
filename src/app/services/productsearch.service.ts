import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Certificate } from '@app/models/certificate.model';

@Injectable()
export class ProductsearchService {

  constructor(private _http: HttpClient) { }

  public searchProducts(): Observable<Certificate[]> {
    const _headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this._http.get<Certificate[]>(`${environment.products}`, { headers: _headers });
  }
  public getCertificates(data, tax?): Observable<Certificate[]> {
    if (!tax) {tax = null};
    const body = new HttpParams()
      .append('seller', data)
      .append('tax', tax);
    const _headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post<Certificate[]>(`${environment.created}`, body, { headers: _headers });
  }

}
