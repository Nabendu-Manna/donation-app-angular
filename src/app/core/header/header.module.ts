import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './common-header/common-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonMaterialModule } from 'src/app/shared/modules/common-material/common-material.module';
import {MatSidenavModule} from '@angular/material/sidenav';

var materialModules = [
  MatToolbarModule
];

@NgModule({
  declarations: [
    CommonHeaderComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
    CommonMaterialModule
  ],
  exports: [
    CommonHeaderComponent
  ]
})
export class HeaderModule { }
