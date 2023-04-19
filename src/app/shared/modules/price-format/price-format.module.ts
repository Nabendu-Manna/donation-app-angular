import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from './price-format.pipe';



@NgModule({
  declarations: [PriceFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [
    PriceFormatPipe
  ]
})
export class PriceFormatModule { }
