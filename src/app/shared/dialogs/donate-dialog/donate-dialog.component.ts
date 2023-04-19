import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { Router } from '@angular/router';

@Component({
    selector: 'donate-dialog-dialog',
    templateUrl: 'donate-dialog.component.html',
})
export class DonateDialogComponent implements OnInit {
    donateForm: FormGroup
    constructor(
        public dialogRef: MatDialogRef<DonateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _postService: PostService,
        private router: Router
    ) {
        this.donateForm = this._formBuilder.group({
            donation_post: [null, [Validators.required]],
            amount: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.donateForm.controls['donation_post'].setValue(this.data.id)
        this.donateForm.controls['amount'].setValue(this.data.amount)
    }

    onDonationFormSubmit(): void {
        if(this.donateForm.valid && this.donateForm.value.amount <= this.data.amount) {
            this._postService.donate(this.donateForm.value).subscribe((data) => {
                this.dialogRef.close();
                this.router.navigate(['donation/list']);
            })
        } else {
            this.donateForm.controls['amount'].setValue(this.data.amount)
        }
    }

}