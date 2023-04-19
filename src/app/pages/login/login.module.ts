import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HeaderModule } from 'src/app/core/header/header.module';
import { FooterModule } from 'src/app/core/footer/footer.module';

import { CommonMaterialModule } from 'src/app/shared/modules/common-material/common-material.module';
import { CommonFormsModule } from 'src/app/shared/modules/common-forms/common-forms.module';
import { OnlineStatusModule } from 'ngx-online-status';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    OnlineStatusModule,
    CommonMaterialModule,
    CommonFormsModule
  ],
})
export class LoginModule { }
