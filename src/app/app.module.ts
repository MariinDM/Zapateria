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
import { AuthModule }  from  '@auth0/auth0-angular';
import { UserComponent } from './components/Table/users/user/user.component';
import { OrderComponent } from './components/Orders/order/order.component';
import { OrdersComponent } from './Table/orders/orders.component';
import { ClientComponent } from './components/client/client.component';
import { ClientOrderComponent } from './components/client-order/client-order.component' ;

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
    ProductComponent,
    UserComponent,
    OrderComponent,
    OrdersComponent,
    ClientComponent,
    ClientOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot ( { 
      domain: 'YOUR_AUTH0_DOMAIN' , 
      clientId : 'YOUR_AUTH0_CLIENT_ID' , 
    }),
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
