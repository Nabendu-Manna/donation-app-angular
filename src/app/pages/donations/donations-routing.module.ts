import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationListComponent } from './donation-list/donation-list.component';
import { NewDonationComponent } from './new-donation/new-donation.component';
import { DonationMapComponent } from './donation-map/donation-map.component';
import { IsLoginGuard } from 'src/app/guard/is-login.guard';

const routes: Routes = [
  { 
    path: 'list', 
    component: DonationListComponent 
  }, { 
    path: 'new', 
    component: NewDonationComponent
  }, { 
    path: 'map', 
    component: DonationMapComponent 
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationsRoutingModule { }
