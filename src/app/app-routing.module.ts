import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CarouselSettingsComponent } from './admin/carousel-settings/carousel-settings.component';
import { CategoryComponent } from './admin/category/category.component';
import { ItemAddComponent } from './admin/item-add/item-add.component';
import { ItemEditComponent } from './admin/item-edit/item-edit.component';
import { ItemsViewComponent } from './admin/items-view/items-view.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ViewItemComponent } from './home/view-item/view-item.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "ostukorv", component: CartComponent },
  { path: "toode/:itemId", component: ViewItemComponent },
  { path: "logi-sisse", component: LoginComponent },
  { path: "registreeru", component: SignupComponent },
  { path: "admin", canActivateChild: [AuthGuard], children: [
    { path: "", component: AdminHomeComponent},
    { path: "lisa-ese", component: ItemAddComponent },
    { path: "muuda-eset/:itemId", component: ItemEditComponent },
    { path: "vaata-esemeid", component: ItemsViewComponent },
    { path: "kategooriad", component: CategoryComponent },
    { path: "galerii-seaded", component: CarouselSettingsComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
