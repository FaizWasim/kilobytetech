import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "company",
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
