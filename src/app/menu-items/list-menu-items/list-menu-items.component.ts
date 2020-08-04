import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemService } from '../menu-item.service';
import { EditMenuItemComponent } from '../edit-menu-item/edit-menu-item.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list-menu-items',
  templateUrl: './list-menu-items.component.html',
  styleUrls: ['./list-menu-items.component.scss']
})
export class ListMenuItemsComponent implements OnInit {

  constructor(
    private menuItemService: MenuItemService,
    private modalService: NgbModal,
    private toastService: ToastService
    ) { }
  menuItems: any = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = this.menuItems.length;

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems(){
    this.menuItemService.getAll().subscribe((items: any) => {
      this.menuItems = items;
    })
  }

  addNew() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'menu-item'
    };

    const modalRef = this.modalService.open(EditMenuItemComponent, ngbModalOptions);

    modalRef.result.then(
      result => {
        modalRef.close();
        if(result)
          this.getMenuItems();
      },
      err => {
        console.log(`err = ${JSON.stringify(err)}`);
      }
    );
  }

  edit(menuItem: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'menu-item'
    };

    const modalRef = this.modalService.open(EditMenuItemComponent, ngbModalOptions);
    modalRef.componentInstance.menuItem = menuItem;

    modalRef.result.then(
      result => {
        modalRef.close();
        if(result)
          this.getMenuItems();
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
    this.menuItemService.delete(id)
    .subscribe((res: any) => {
      this.toastService.showSuccessMessage("record deleted successfully");
      this.getMenuItems();
    }, (error: any) => {
      this.toastService.showDangerMessage("error. failed to delete record");
    });
  }

}
