import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBillingComponent } from './list-billing/list-billing.component';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  { path: 'billing-history', component: ListBillingComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingHistoryRoutingModule { }
