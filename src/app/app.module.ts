import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/Footer/footer/footer.component';
import { NavComponent } from './components/Nav/nav/nav.component';
import { LoginComponent } from './components/Login/login/login.component';
import { HomeComponent } from './components/Home/home/home.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { ShipperComponent } from './components/Shippers/shipper/shipper.component';
import { SupplierComponent } from './components/Suppliers/supplier/supplier.component';
import { SizesComponent } from './components/BSC/Size/sizes/sizes.component';
import { BrandsComponent } from './components/BSC/Brand/brands/brands.component';
import { MenuComponent } from './components/BSC/Menu/menu/menu.component';
import { CategoriesComponent } from './components/BSC/Category/categories/categories.component';
import { ProductComponent } from './components/Products/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ShipperComponent,
    SupplierComponent,
    SizesComponent,
    BrandsComponent,
    CategoriesComponent,
    MenuComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
