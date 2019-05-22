import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: number): string {
    // if (!status) { return null }; not working  because if status=0 return false, change to isnan
    switch (status) {
      case 0:
        return 'Ожидает оплаты до'
      case 1:
        return 'Оплачен'
      case 2:
        return 'Просрочен'
      default:
        return 'статус не известен'
    }

  }
}
