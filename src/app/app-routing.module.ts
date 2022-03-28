import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './components/BSC/Brand/brands/brands.component';
import { CategoriesComponent } from './components/BSC/Category/categories/categories.component';
import { MenuComponent } from './components/BSC/Menu/menu/menu.component';
import { SizesComponent } from './components/BSC/Size/sizes/sizes.component';
import { ClientOrderComponent } from './components/client-order/client-order.component';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/Home/home/home.component';
import { LoginComponent } from './components/Login/login/login.component';
import { OrderComponent } from './components/Orders/order/order.component';
import { ProductComponent } from './components/Products/product/product.component';
import { RegisterComponent } from './components/Register/register/register.component';
import { ShipperComponent } from './components/Shippers/shipper/shipper.component';
import { SupplierComponent } from './components/Suppliers/supplier/supplier.component';
import { UserComponent } from './components/Table/users/user/user.component';
import { AccessUsersGuard } from './Guards/access-users.guard';
import { AccessGuard } from './Guards/access.guard';
import { AuthGuard } from './Guards/auth.guard';
import { CheckLoginGuard } from './Guards/check-login.guard';
import { OrdersComponent } from './Table/orders/orders.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent,canActivate:[CheckLoginGuard]},
  {path:"register",component:RegisterComponent, canActivate:[CheckLoginGuard]},
  {path:"shippers",component:ShipperComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"brands",component:BrandsComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"sizes",component:SizesComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"categories",component:CategoriesComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"suppliers",component:SupplierComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"bsc",component:MenuComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"products",component:ProductComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"ordersc",component:ClientOrderComponent,canActivate:[AuthGuard]},
  {path:"cproducts",component:ClientComponent,canActivate:[AuthGuard]},
  {path:"users",component:UserComponent,canActivate:[AuthGuard,AccessGuard,AccessUsersGuard]},
  {path:"orders",component:OrderComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"table",component:OrdersComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:"**",redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
