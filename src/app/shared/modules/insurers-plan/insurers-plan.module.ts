import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurersPlanComponent } from './insurers-plan.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PriceFormatModule } from '../price-format/price-format.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    InsurersPlanComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PriceFormatModule
  ],
  exports: [
    InsurersPlanComponent
  ]
})
export class InsurersPlanModule { }
