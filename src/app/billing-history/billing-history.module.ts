import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingHistoryRoutingModule } from './billing-history-routing.module';
import { ListBillingComponent } from './list-billing/list-billing.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewBillPdfComponent } from './view-bill-pdf/view-bill-pdf.component';

@NgModule({
  declarations: [
    ListBillingComponent,
    ViewBillPdfComponent
  ],
  imports: [
    CommonModule,
    BillingHistoryRoutingModule,
    PdfViewerModule
  ]
})
export class BillingHistoryModule { }
