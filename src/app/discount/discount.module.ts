import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { ListDiscountComponent } from './list-discount/list-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListDiscountComponent, EditDiscountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DiscountRoutingModule
  ]
})
export class DiscountModule { }
