import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Permission, PushNotification } from '@app/models/push.model';
@Injectable()
export class PushService {
  public permission: Permission;

  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }
  create(title: string, options ?: PushNotification): any {
    const self = this;
    return new Observable(function(obs) {
        if (!('Notification' in window)) {
            console.log('Notifications are not available in this environment');
            obs.complete();
        }
        if (self.permission !== 'granted') {
            console.log('The user hasn\'t granted you permission to send push notifications');
            obs.complete();
          }
        const _notify = new Notification(title, options);
        _notify.onshow = function(e) {
            return obs.next({
                notification: _notify,
                event: e
            });
        };
        _notify.onclick = function(e) {
            return obs.next({
                notification: _notify,
                event: e
            });
        };
        _notify.onerror = function(e) {
            return obs.error({
                notification: _notify,
                event: e
            });
        };
        _notify.onclose = function() {
            return obs.complete();
        };
    });
}

  requestPermission(): void {
    const self = this;
    if ('Notification' in window) {
        Notification.requestPermission(function(status) {
            return self.permission = status;
        });
    }
}
generateNotification(source: Array < any > ): void {
  const self = this;
  source.forEach((item) => {
      const options = {
          body: item.alertContent,
          icon: '../resource/images/bell-icon.png'
      };
      const notify = self.create(item.title, options).subscribe();
  })
}



}

