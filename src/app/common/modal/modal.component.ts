import { PrinterService } from '@app/services/printer.service';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Certificate } from '@app/models/certificate.model';
import * as moment from 'moment';
import { environment } from '@env/environment';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
}

@Component({
  selector: 'rosa-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  public certificate: any;
  public date: any;

  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
        case KEY_CODE.ESCAPE:
          this.close();
        break;
    }
  }
  public close(): void {
    this.closeModal.emit(true)
  }
  public print(): void {
    this._printer.printDocs(this.certificate.id).subscribe(
      data => {this.downloadFiles(data); console.log(data)},
      err => {console.log(err)}
    );


  }
  public sendMail() {
    this._printer.sendEmail(this.certificate.id, 'mail').subscribe(
      data => {alert('Документы успешно отправлены клиенту')},
      err => {console.log(err); alert('Ошибка при отправке. Попробуйте позже или обратитесь в техподдержку proportal@rosbank.ru')}
    );
  }

  private downloadFiles(data): void {
    // tslint:disable-next-line:prefer-const
    for (let link of data) {
        // tslint:disable-next-line:prefer-const
        let linkSource = `${environment.storage}/assets/${link}.pdf`;
        // tslint:disable-next-line:prefer-const
        let downloadLink = document.createElement('a');
        // tslint:disable-next-line:prefer-const
        let fileName = `${link}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.target = '_blank';
        downloadLink.download = fileName;
        downloadLink.click();
      }
  }


  constructor(private _printer: PrinterService) { }
  ngOnInit() {
    if (!this.certificate) { this.close() };
    this.date = this.certificate.updated !== null ? this.certificate.updated : moment(this.certificate.created).add(5, 'days');
  }

}
