import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationsRoutingModule } from './donations-routing.module';
import { DonationListComponent } from './donation-list/donation-list.component';
import { HeaderModule } from 'src/app/core/header/header.module';
import { FooterModule } from 'src/app/core/footer/footer.module';
import { CommonMaterialModule } from 'src/app/shared/modules/common-material/common-material.module';
import { DonationItemComponent } from './donation-item/donation-item.component';
import { NewDonationComponent } from './new-donation/new-donation.component';
import { CommonFormsModule } from 'src/app/shared/modules/common-forms/common-forms.module';
import { DonationMapComponent } from './donation-map/donation-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DonateDialogModule } from 'src/app/shared/dialogs/donate-dialog/donate-dialog.module';


@NgModule({
  declarations: [
    DonationListComponent,
    DonationItemComponent,
    NewDonationComponent,
    DonationMapComponent
  ],
  imports: [
    CommonModule,
    DonationsRoutingModule,
    CommonMaterialModule,
    HeaderModule,
    FooterModule,
    CommonFormsModule,
    GoogleMapsModule,
    DonateDialogModule
  ]
})
export class DonationsModule { }
