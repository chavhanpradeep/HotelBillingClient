import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMenuItemsComponent } from './list-menu-items/list-menu-items.component';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  { path: 'menu-item', component: ListMenuItemsComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuItemRoutingModule { }
