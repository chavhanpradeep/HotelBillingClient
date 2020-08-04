import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../discount.service';
import { ToastService } from '@app/services/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private discountSerive: DiscountService,
    private toastService: ToastService
  ) { }

  isEdit: boolean = false;
  title: string = "Add New";
  @Input() discount: any;
  @Output() menuItemEventEmitter = new EventEmitter();

  public discountForm: FormGroup;

  ngOnInit(): void {
    if (this.discount) {
      this.isEdit = true;
      this.title = "Edit";
    }
    this.buildForm();
  }

  buildForm() {
    this.discountForm = new FormGroup({
      id: new FormControl(
        this.discount ? this.discount.id : 0
      ),
      name: new FormControl(
        this.discount ? this.discount.name : '',
        [Validators.required, Validators.maxLength(30)]),
      description: new FormControl(
        this.discount ? this.discount.description : ''),
      percentage: new FormControl(
        this.discount ? this.discount.percentage : '',
        [Validators.required, Validators.min(0.1)]),
      priceCriteria: new FormControl(
        this.discount ? this.discount.priceCriteria : '',
        [Validators.required, Validators.min(0.1)]),
      dayOfWeek: new FormControl(
        this.discount ? this.discount.dayOfWeek : ''),
      isRecurring: new FormControl(true),
      applicableFrom: new FormControl(
        this.discount ? this.discount.applicableFrom : new Date()),
      applicableTo: new FormControl(this.discount ? this.discount.applicableTo : new Date())
    });
  }

  save() {
    if (this.isEdit)
      this.edit();
    else
      this.addNew();
  }

  addNew() {
    this.discountSerive.addNew(this.discountForm.getRawValue())
      .subscribe((res: any) => {
        this.activeModal.close(true);
        this.toastService.showSuccessMessage("record added successfully");
      }, (error: any) => {
        this.activeModal.dismiss(JSON.stringify(error));
        this.toastService.showDangerMessage("error. failed to update record");
      });
  }

  edit() {
    this.discountSerive.edit(this.discountForm.getRawValue())
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
