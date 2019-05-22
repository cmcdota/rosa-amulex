import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as numeral from 'numeral';

@Component({
  selector: 'rosa-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input()
  public header: string;
  @Input()
  public content: string = 'название элемента';
  @Input()
  public price: number = 0;
  @Input()
  public  helperContent: string;
  @Input()
  public classList: string;
  @Input()
  public tabindex: number = -1;


  @Output() ClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.price = numeral(this.price).format('0,0')
  }

}
