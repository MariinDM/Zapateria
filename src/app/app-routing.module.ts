import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/BSC/Brand/brands/brands.component';
import { CategoriesComponent } from './components/BSC/Category/categories/categories.component';
import { MenuComponent } from './components/BSC/Menu/menu/menu.component';
import { SizesComponent } from './components/BSC/Size/sizes/sizes.component';
import { HomeComponent } from './components/Home/home/home.component';
import { LoginComponent } from './components/Login/login/login.component';
import { OrderComponent } from './components/Orders/order/order.component';
import { ProductComponent } from './components/Products/product/product.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { ShipperComponent } from './components/Shippers/shipper/shipper.component';
import { SupplierComponent } from './components/Suppliers/supplier/supplier.component';
import { UserComponent } from './components/Table/users/user/user.component';
import { AuthGuard } from './Guards/auth.guard';
import { CheckLoginGuard } from './Guards/check-login.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent,canActivate:[CheckLoginGuard]},
  {path:"register",component:RegisterComponent, canActivate:[CheckLoginGuard]},
  {path:"shippers",component:ShipperComponent,canActivate:[AuthGuard]},
  {path:"brands",component:BrandsComponent,canActivate:[AuthGuard]},
  {path:"sizes",component:SizesComponent,canActivate:[AuthGuard]},
  {path:"categories",component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:"suppliers",component:SupplierComponent,canActivate:[AuthGuard]},
  {path:"bsc",component:MenuComponent,canActivate:[AuthGuard]},
  {path:"products",component:ProductComponent,canActivate:[AuthGuard]},
  {path:"orders",component:OrderComponent,canActivate:[]},
  {path:"**",redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
