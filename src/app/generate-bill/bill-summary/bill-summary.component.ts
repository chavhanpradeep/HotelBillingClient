import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from '../bill.service';
import { ToastService } from '@app/services/toast.service';
import { DiscountService } from '@app/discount/discount.service';
import { CommonFunctions } from '@app/shared/common-functions';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.scss']
})
export class BillSummaryComponent implements OnInit {

  @Input() billDetails: any;
  discounts: any = [];
  vat: number = 5;
  public discountPercentage: number;
  date = new Date();

  constructor(
    private activeModal: NgbActiveModal,
    private billService: BillService,
    private toastService: ToastService,
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    // this.loadDiscounts();
  }

  ngAfterContentInit() {
    this.loadDiscounts();
  }

  loadDiscounts() {
    this.discountService.getAll()
    .subscribe((res: any) => {
      this.discounts = res;
    }, (err: any) => {

    });
  }

  subTotal() {
    let totalPrice: number = 0;
    this.billDetails.forEach(element => {
      totalPrice += (element.price * element.quantity);
    });
    return totalPrice;
  }

  vatAmount() {
    return this.subTotal() * (this.vat / 100);
  }

  discountAmount() {
    let total = this.subTotal();
    let totalWithVAT = total + this.vatAmount();

    let commonFunctions = new CommonFunctions();
    let dayOfWeek = commonFunctions.getDayOfWeek().toLowerCase();
    let discount = this.discounts.find(x => x.dayOfWeek.toLowerCase() == dayOfWeek.toLowerCase());

    if(discount) {
      // this.discountPercentage = discount.percentage;
      return (discount.percentage / 100) * totalWithVAT;
    }
    else return 0;
  }

  billTotal() {
    return (this.subTotal() - this.discountAmount()) + this.vatAmount();
  }

  placeOrder() {
    let billDetailDTO = [];
    this.billDetails.forEach(element => {
      billDetailDTO.push({
        id: 0,
        menuItemId: element.menuItemId,
        quantity: element.quantity
      })
    });

    let bill = {
      id: 0,
      customerName: "Pradeep Chavhan",
      billGeneratedOn: new Date(),
      billDetails: billDetailDTO,
      subTotal: 0
    }

    this.billService.generateBill(bill)
    .subscribe((res: any) => {
      this.toastService.showSuccessMessage("bill is generated successfully");
      this.activeModal.close(true);
    }, (error: any) => {
      this.toastService.showDangerMessage("Error. failed to generate bill");
      this.activeModal.close(false);
    });
  }

  cancel() {
    this.activeModal.close(false);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
