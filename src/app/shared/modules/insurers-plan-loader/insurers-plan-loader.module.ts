import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurersPlanLoaderComponent } from './insurers-plan-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    InsurersPlanLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    InsurersPlanLoaderComponent
  ]
})
export class InsurersPlanLoaderModule { }
