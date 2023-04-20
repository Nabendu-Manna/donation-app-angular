import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonMaterialModule } from 'src/app/shared/modules/common-material/common-material.module';
import { CommonFormsModule } from 'src/app/shared/modules/common-forms/common-forms.module';
import { HeaderModule } from 'src/app/core/header/header.module';
import { FooterModule } from 'src/app/core/footer/footer.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonMaterialModule,
    CommonFormsModule,
    HeaderModule,
    FooterModule
  ]
})
export class HomeModule { }
