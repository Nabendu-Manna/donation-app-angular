import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { IsAdminGuard } from './guard/is-admin.guard';
import { IsLoginGuard } from './guard/is-login.guard';
import { IsGuestGuard } from './guard/is-guest.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [IsGuestGuard]
    

  }, {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [IsGuestGuard]
  }, {
    path: 'donation',
    loadChildren: () => import('./pages/donations/donations.module').then(m => m.DonationsModule)
  }, {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [IsGuestGuard]
  }, {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
    canActivate: [IsAdminGuard]
  }, { 
    path: '', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  }, {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
