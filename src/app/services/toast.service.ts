import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  showMessage(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    console.log(this.toasts);
  }

  showSuccessMessage(textOrTpl: string | TemplateRef<any>) {
    let options = {
      classname: 'bg-success text-light'
    };
    this.toasts.push({ textOrTpl, ...options });
  }

  showDangerMessage(textOrTpl: string | TemplateRef<any>) {
    let options = {
      classname: 'bg-danger text-red'
    };
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
