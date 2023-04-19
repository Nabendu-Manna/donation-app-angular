import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonFooterComponent } from './common-footer/common-footer.component';



@NgModule({
  declarations: [
    CommonFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonFooterComponent
  ]
})
export class FooterModule { }
