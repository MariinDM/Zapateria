import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/BSC/Menu/menu/menu.component';
import { HomeComponent } from './components/Home/home/home.component';
import { LoginComponent } from './components/Login/login/login.component';
import { ProductComponent } from './components/Products/product/product.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { ShipperComponent } from './components/Shippers/shipper/shipper.component';
import { SupplierComponent } from './components/Suppliers/supplier/supplier.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"shippers",component:ShipperComponent},
  {path:"suppliers",component:SupplierComponent},
  {path:"bsc",component:MenuComponent},
  {path:"products",component:ProductComponent},
  {path:"**",redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
