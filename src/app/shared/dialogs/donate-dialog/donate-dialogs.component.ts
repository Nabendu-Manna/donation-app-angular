import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'donate-dialog-dialog',
    templateUrl: 'donate-dialog.component.html',
})
export class DonateDialogComponent {
    constructor(public dialogRef: MatDialogRef<DonateDialogComponent>) { }
    
}