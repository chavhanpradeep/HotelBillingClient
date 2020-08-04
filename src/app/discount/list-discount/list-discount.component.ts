import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../discount.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@app/services/toast.service';
import { EditDiscountComponent } from '../edit-discount/edit-discount.component';
import { ConfirmationModalComponent } from '@app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.scss']
})
export class ListDiscountComponent implements OnInit {

  constructor(
    private discountService: DiscountService,
    private modalService: NgbModal,
    private toastService: ToastService
    ) { }
  
  discounts: any = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = this.discounts.length;

  ngOnInit() {
    this.getDiscounts();
  }

  getDiscounts(){
    this.discountService.getAll().subscribe((response: any) => {
      this.discounts = response;
    })
  }

  addNew() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'discount',
      size: 'lg'
    };

    const modalRef = this.modalService.open(EditDiscountComponent, ngbModalOptions);

    modalRef.result.then(
      result => {
        modalRef.close();
        if(result)
          this.getDiscounts();
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  edit(discount: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'discount',
      size: 'lg'
    };

    const modalRef = this.modalService.open(EditDiscountComponent, ngbModalOptions);
    modalRef.componentInstance.discount = discount;

    modalRef.result.then(
      result => {
        modalRef.close();
        if(result)
          this.getDiscounts();
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  confirmDelete(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirmationText = "Are you sure you want to delete this record ?";

    modalRef.result.then(
      result => {
        if(result) {
          this.delete(id);
          modalRef.close();
        }
      },
      error => {
        modalRef.dismiss();
      }
    );
  }

  delete(id: number) {
    this.discountService.delete(id)
    .subscribe((res: any) => {
      this.toastService.showSuccessMessage("record deleted successfully");
      this.getDiscounts();
    }, (error: any) => {
      this.toastService.showDangerMessage(error.message);
    });
  }

}
