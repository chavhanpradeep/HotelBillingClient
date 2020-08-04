import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuItemRoutingModule } from './menu-item-routing.module';
import { ListMenuItemsComponent } from './list-menu-items/list-menu-items.component';
import { EditMenuItemComponent } from './edit-menu-item/edit-menu-item.component';

@NgModule({
  declarations: [ListMenuItemsComponent, EditMenuItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuItemRoutingModule
  ]
})
export class MenuItemModule { }
