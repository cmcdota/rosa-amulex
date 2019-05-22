import { HelperService } from '@app/services/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rosa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public constructor(private _helperService: HelperService) {
  }
  public ngOnInit() {
    this._helperService.preFlight().subscribe(data => {console.log(data)});
  }

}
