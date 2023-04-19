import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { CommonMaterialModule } from "../../modules/common-material/common-material.module";
import { DonateDialogComponent } from "./donate-dialog.component";
import { CommonFormsModule } from "../../modules/common-forms/common-forms.module";

@NgModule({
    declarations: [
        DonateDialogComponent
    ],
    imports: [
        CommonModule,
        CommonMaterialModule,
        CommonFormsModule
    ],
    exports: [
        DonateDialogComponent
    ]
})
export class DonateDialogModule { }