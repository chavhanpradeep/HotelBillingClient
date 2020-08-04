import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListMenuItemsComponent } from './menu-items/list-menu-items/list-menu-items.component';
import { ListDiscountComponent } from '@app/discount/list-discount/list-discount.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'menu-item', component: ListMenuItemsComponent },
  // { path: 'list-discount', component: ListDiscountComponent },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
