import { NgModule } from "@angular/core";
import { CommonMaterialModule } from "../../modules/common-material/common-material.module";
import { DonateDialogComponent } from "./donate-dialog.component";

@NgModule({
    declarations: [
        DonateDialogComponent
    ],
    imports: [
        CommonMaterialModule
    ],
    exports: [
        DonateDialogComponent
    ]
})
export class DonateDialogsModule { }