import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'edit-pre-quote-dialog',
    templateUrl: 'edit-pre-quote.component.html',
})
export class EditPreQuoteComponent {
    constructor(public dialogRef: MatDialogRef<EditPreQuoteComponent>) { }
    
}