import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
    declarations: [
        ToastComponent,
        ConfirmationModalComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        NgbModule,
        FormsModule
    ],
    exports: [
        ToastComponent,
        ConfirmationModalComponent
    ]
})
export class SharedModule { }