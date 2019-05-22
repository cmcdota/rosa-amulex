import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { ProductsearchService } from '@app/services/productsearch.service';
import { environment } from '@env/environment';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrinterService {

  constructor(private _http: HttpClient) { }
  public docDefinition: any;
  public invoicePrintOptions: any;
  public certificateBase64: any;
  public invoiceBase64: any;
  public attachments: any[] = [];
  public callBack: any;

  public printDocs(certificate) {
    const body = new HttpParams()
    .append('certificate', certificate);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(`${environment.getFiles}`, body, { headers: headers });
  }
  public sendEmail(certificate, email?): Observable<any> {
    if (!email) {email = null};
    const body = new HttpParams()
    .append('email', email)
    .append('certificate', certificate);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(`${environment.sendMail}`, body, { headers: headers });
  }


}





