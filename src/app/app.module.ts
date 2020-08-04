import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuItemModule } from './menu-items/menu-item.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { DiscountModule } from '@app/discount/discount.module';
import { SelectMenuItemComponent } from './generate-bill/select-menu-item/select-menu-item.component';
import { BillSummaryComponent } from './generate-bill/bill-summary/bill-summary.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { BillingHistoryModule } from './billing-history/billing-history.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SelectMenuItemComponent,
    BillSummaryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    CoreModule,
    RegisterModule,
    LoginModule,
    MenuItemModule,
    DiscountModule,
    SharedModule,
    BillingHistoryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
