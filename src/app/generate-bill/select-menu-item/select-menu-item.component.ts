import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MenuItemService } from '@app/menu-items/menu-item.service';
import { ToastService } from '@app/services/toast.service';
import { menuItem } from '@app/classes/classes';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillSummaryComponent } from '../bill-summary/bill-summary.component';
import { DiscountService } from '@app/discount/discount.service';

@Component({
  selector: 'app-select-menu-item',
  templateUrl: './select-menu-item.component.html',
  styleUrls: ['./select-menu-item.component.scss']
})

export class SelectMenuItemComponent implements OnInit {

  // @Input() menuItems: any[] = [];
  // @Output() emitter = new EventEmitter();
  isBillPlaced: boolean = false;
  menuItemList: menuItem[] = [];
  menuItemsForm: FormGroup;
  tempImage = "https://homepages.cae.wisc.edu/~ece533/images/fruits.png";

  constructor(
    private menuItemService: MenuItemService,
    private discountService: DiscountService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuItemService.getAll()
    .subscribe((res: any) => {
      this.loadEntries(res);
    }, (error: any) => {
      this.toastService.showDangerMessage(error?.message);
    })
  }

  loadEntries(menuItems: any) {
    menuItems.forEach(element => {
      this.menuItemList.push({
        menuItemId: element.id,
        name: element.name,
        price: element.price,
        quantity: 1,
        isSelected: false
      });
    });
  }

  get canDisableGenerateBill() {
    if(this.menuItemList && this.menuItemList.filter(x => x.isSelected == true).length == 0){
      return true;
    }
    else
      return false;
  }

  loadBillSummary() {
    if(this.menuItemList.filter(x => x.isSelected == true).length == 0) {
      this.toastService.showDangerMessage("please select some items to continue");
      return;
    }

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'bill-summary'
    };

    let selectedItems = this.menuItemList.filter(x => x.isSelected == true);

    const modalRef = this.modalService.open(BillSummaryComponent, ngbModalOptions);
    modalRef.componentInstance.billDetails = selectedItems;

    modalRef.result.then(
      result => {
        modalRef.close();
        if(result) {
          this.isBillPlaced = true;
          this.resetSelection();
        }
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  resetSelection() {
    this.menuItemList.forEach(element => {
      element.quantity = 1;
      element.isSelected = false;
    });
  }
}
