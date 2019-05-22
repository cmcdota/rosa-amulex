import { PrinterService } from '@app/services/printer.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ProductsearchService } from '@app/services/productsearch.service';
import { environment } from './../../../../environments/environment';
import { NotifyService } from '@app/services/notify.service';
import {switchMap, tap, finalize, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';


import { Certificate } from '@app/models/certificate.model';
import { Company } from '@app/models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from 'moment';

@Component({
  selector: 'rosa-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor(
    private _http: HttpClient,
    private _formBuilder: FormBuilder,
    private _productService: ProductsearchService,
    private _notify: NotifyService,
    private _printer: PrinterService,
    private _router: ActivatedRoute,
    private _navigator: Router
  ) { }
  public activeProduct: number = 0;
  public products: Certificate[] = [];
  public nestedCerts$: Certificate[] = [];
  public taxFieldState: string = 'default';
  public selectedProduct: Certificate;
  public company: Company;
  public _businessForm: FormGroup;
  public formMessage: string;
  public buttonDaemon: boolean = false;
  public pending: boolean = false;
  @Output() cardRecived: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public setProduct(product: Certificate, productNumber: number) {
    this.selectedProduct = product;
    this.activeProduct = productNumber;
    this._businessForm.controls['product'].setValue(product.id);
  }

  // describe initialize form properties
  public initForm(): void {
    this._businessForm = this._formBuilder.group({
      company: ['',
               [Validators.required,
                Validators.minLength(1)]],
      tax: ['',
             [Validators.required,
              Validators.minLength(10),
              Validators.maxLength(12),
              Validators.pattern(/[0-9]/)]],
      product: ['',
                [Validators.required,
                 Validators.minLength(1)]],
      ceo: ['',
             [Validators.required,
              Validators.minLength(1)]],
      phone: ['',
               [Validators.required,
                Validators.pattern(/[0-9]/),
                Validators.minLength(10)]],
      email: ['',
               [Validators.required, Validators.email]
              ],
      seller: ['',
                [Validators.required]],
    });
  }

  // автоматически делает поля тронутыми для валидации при отрп. Запускается sendLead()
  public markAsTouched(group: FormGroup | FormArray) {
  Object.keys(group.controls).map((field) => {
    const control = group.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.markAsTouched(control);
    }
  });
}

  public taxFieldStateManager(isNested: boolean = false): void {
      this.taxFieldState = isNested ? 'hasNested' : 'default';
  }

  public ngOnInit() {
    this.initForm();

    // get certificates list from backend and set first cert as selected
    this._router.queryParams
    .subscribe(params => {
      this._businessForm.controls['seller'].setValue(params.seller || localStorage.getItem('seller'));
      // tslint:disable-next-line:no-unused-expression
     // !! params.seller || localStorage.setItem('seller', params.seller);
     // tslint:disable-next-line:no-unused-expression
     console.log(params.seller);
     if ( params.seller) { console.log(`setting up seller ${ params.seller}`); localStorage.setItem('seller', params.seller)};
      this._businessForm.controls['tax'].setValue(params.tax || null);
      this._businessForm.controls['ceo'].setValue(params.ceo || null);
      this._businessForm.controls['company'].setValue(params.company || null);
      this._businessForm.controls['phone'].setValue(params.phone || null);
      this._businessForm.controls['email'].setValue(params.email || null);
      console.log(params); // {order: "popular"}
     // this.order = params.order;
     // console.log(this.order); // popular
    });
    this._productService.searchProducts().subscribe(data => {
      this.products = data;
      this.setProduct(data[0], 0);
    }, err => {
      this._notify.error('Возникла ошибка при загрузке сертификатов' + err.error);
    });
    /*
   this._businessForm.get('tax').valueChanges.pipe(
       debounceTime(3000),
       filter((value: string) => (value !== null && value.length > 9)),
       distinctUntilChanged(),
       tap(() => {this.pending = true; this.taxFieldStateManager()}),
       debounceTime(3000),
       switchMap(value => this._productService.getCertificates(localStorage.getItem('seller'), `${value}`)
       .pipe (
         finalize(() => this.pending = false)
       )
     )
   ).subscribe(results => {
      this.nestedCerts$ = results;
      this.taxFieldStateManager(this.nestedCerts$.length > 0);
    },
    err => { console.log(err.message)}
    );
    */

  };

  public sendLead(): boolean {
  if (!this._businessForm.valid) {
    this._notify.warn('Заполните все поля формы');
    this.markAsTouched(this._businessForm);
    this.formMessage = 'Вы не заполнили все поля формы';
    setTimeout(() => {this.formMessage = ''}, 5000);
    return false;
  }

  const body = new HttpParams()
    .append('company', this._businessForm.controls['company'].value)
    .append('tax', this._businessForm.controls['tax'].value)
    .append('product', this._businessForm.controls['product'].value)
    .append('ceo', this._businessForm.controls['ceo'].value)
    .append('phone', this._businessForm.controls['phone'].value)
    .append('email', this._businessForm.controls['email'].value)
    .append('seller', this._businessForm.controls['seller'].value);
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  this._http.post(`${environment.postCerts}`, body, { headers: headers, params: body })
    .subscribe(
    (data: any[]) => {
    //  setTimeout(() => { this.cardsReciver.emit(this.newCard); this.clearModel(); }, 5000);
      this._notify.success('Необходимо оплатить в течении 5 календарных дней');
      // tslint:disable-next-line:max-line-length
      this.cardRecived.emit(true);
      // tslint:disable-next-line:max-line-length
     // alert('Сертификат оформлен и ожидает оплаты. Копия сертификата и счет на оплату отправлены на электронную почту клиента. Сейчас откроются сертификат и счет на оплату');
      alert('Сертификат оформлен и ожидает оплаты. Копии сертификата и счета уже высланы клиенту на указанный адрес электронной почты');

      // tslint:disable-next-line:prefer-const
      for (let link of data) {
        const linkSource = `${environment.storage}/assets/${link}.pdf`;
        const downloadLink = document.createElement('a');
        const fileName = `${link}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.target = '_blank';
        downloadLink.download = fileName;
        downloadLink.click();
      }
      this._businessForm.reset();
      this._navigator.navigate([], {  queryParams: {seller: localStorage.getItem('seller')}, replaceUrl: true, skipLocationChange: true});
      this._businessForm.controls['seller'].setValue(localStorage.getItem('seller'));

      // this.ngOnInit();
    },
    (err) => {
      console.log(err);
      this.buttonDaemon = false;
      this._notify.error('Возникла ошибка при отправке' + err.status);
      return false;
    }
    );
  }
}



