import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Certificate } from '@app/models/certificate.model';
import { PushService } from '@app/services/push.service';
import { ProductsearchService } from '@app/services/productsearch.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'rosa-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public certs$: any = 0;
  constructor(
    private _productService: ProductsearchService,
    private _pushService: PushService,
    private _router: ActivatedRoute
  ) {
    this._pushService.requestPermission();
  }
  public modalController: boolean = false;
  public modalData: Certificate;
  public order: any = 'id';
  public ascending = false;
  public updateCards(val) {
  this._productService.getCertificates(localStorage.getItem('seller')).subscribe(
    data => { if ( data.length > 0 ) {this.certs$ = data} },
    err => {}
  );
}

public showModal(data: Certificate): void {
  this.modalController = true;
  this.modalData = data;
}

public closeModal(val) {
  if (!val) {return};
  this.modalController = false;
}
notify() {
  const data: Array <any> = [];
  data.push({
      'title': 'PushNotification',
      'alertContent': 'Make me first'
  });
  // this._pushService.generateNotification(data);
}

  ngOnInit() {
    this._router.queryParams
    .subscribe(params => {
      if ( params.seller) { console.log(`setting up seller ${ params.seller}`); localStorage.setItem('seller', params.seller)};
      console.log(params); // {order: "popular"}
     // this.order = params.order;
     // console.log(this.order); // popular
    });
   // this.notify();
    this.updateCards(true);
  }

}
