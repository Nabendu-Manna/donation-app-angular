import { NgModule } from "@angular/core";
import { CommonMaterialModule } from "../../modules/common-material/common-material.module";
import { EditPreQuoteComponent } from "./edit-pre-quote.component";

@NgModule({
    declarations: [
        EditPreQuoteComponent
    ],
    imports: [
        CommonMaterialModule
    ],
    exports: [
        EditPreQuoteComponent
    ]
})
export class EditPreQuoteModule { }