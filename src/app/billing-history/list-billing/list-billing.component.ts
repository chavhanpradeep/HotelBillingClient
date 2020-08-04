import { Component, OnInit } from '@angular/core';
import { BillService } from '@app/generate-bill/bill.service';
import { ToastService } from '@app/services/toast.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewBillPdfComponent } from '../view-bill-pdf/view-bill-pdf.component';

@Component({
  selector: 'app-list-billing',
  templateUrl: './list-billing.component.html',
  styleUrls: ['./list-billing.component.scss']
})
export class ListBillingComponent implements OnInit {

  bills: any = [];
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(
    private billService: BillService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getBillHistory();
  }

  getBillHistory() {
    this.billService.getBillHistory().subscribe((res: any) => {
      this.bills = res;
    }, (error: any) => {
      this.toastService.showDangerMessage(error.message);
    });
  }

  viewBill(pdfFilePath: string) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'viewBillPDF',
      size: 'lg'
    };

    console.log(pdfFilePath);
    const modalRef = this.modalService.open(ViewBillPdfComponent, ngbModalOptions);
    modalRef.componentInstance.pdfSrc = pdfFilePath;

    modalRef.result.then(
      result => {
        modalRef.close();
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

}
