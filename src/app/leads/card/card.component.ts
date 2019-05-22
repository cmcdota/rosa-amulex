import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'rosa-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  public cert: any;

  public status: string;
  public date: string;
  constructor() { }

  ngOnInit() {
    this.date = this.cert.updated !== null ? this.cert.updated : moment(this.cert.created).add(5, 'days');
  }

}
