import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItemService } from '../menu-item.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.scss']
})
export class EditMenuItemComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private menuItemSerive: MenuItemService,
    private toastService: ToastService
  ) { }

  isEdit: boolean = false;
  title: string = "Add New";
  @Input() menuItem: any;
  @Output() menuItemEventEmitter = new EventEmitter();

  public menuItemForm: FormGroup;

  ngOnInit(): void {
    console.log(`item: ${JSON.stringify(this.menuItem)}`);
    if(this.menuItem) {
      this.isEdit = true;
      this.title = "Edit";
    }
    this.buildForm();
  }

  buildForm() {
    this.menuItemForm = new FormGroup({
      id: new FormControl(
        this.menuItem ? this.menuItem.id : 0
      ),
      name: new FormControl( 
        this.menuItem ? this.menuItem.name : '', 
        [Validators.required, Validators.maxLength(30)]),
      price: new FormControl(
        this.menuItem ? this.menuItem.price : '',
        [Validators.required, Validators.min(0.1)])
    });
  }

  save() {
    if(this.isEdit)
      this.edit();
    else
      this.addNew();
  }

  addNew() {
    this.menuItemSerive.addNew(this.menuItemForm.getRawValue())
    .subscribe((res: any) => {
      this.activeModal.close(true);
      this.toastService.showSuccessMessage("record added successfully");
    }, (error: any) => {
      this.activeModal.dismiss(JSON.stringify(error));
      this.toastService.showDangerMessage("error. failed to update record");
    });
  }

  edit() {
    this.menuItemSerive.edit(this.menuItemForm.getRawValue())
    .subscribe((res: any) => {
      this.activeModal.close(true);
      this.toastService.showSuccessMessage("record updated successfully");
    }, (error: any) => {
      this.activeModal.dismiss(JSON.stringify(error));
      this.toastService.showDangerMessage("error. failed to update record");
    });
  }

  cancel() {
    this.activeModal.dismiss('canceled');
  }

  close(reason: any) {
    this.activeModal.dismiss('closed by cross click');
  }
}
