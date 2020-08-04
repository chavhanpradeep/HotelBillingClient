import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-bill-pdf',
  templateUrl: './view-bill-pdf.component.html',
  styleUrls: ['./view-bill-pdf.component.scss']
})
export class ViewBillPdfComponent implements OnInit {

  @Input() pdfSrc: string;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.activeModal.dismiss('canceled');
  }

  close(reason: any) {
    this.activeModal.dismiss('closed by cross click');
  }
}
