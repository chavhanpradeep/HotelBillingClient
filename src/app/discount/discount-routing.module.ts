import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDiscountComponent } from './list-discount/list-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  { path: 'list-discount', component: ListDiscountComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
