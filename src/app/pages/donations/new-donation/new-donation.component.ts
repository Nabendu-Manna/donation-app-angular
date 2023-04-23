import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.scss']
})
export class NewDonationComponent implements OnInit {
  donationForm: FormGroup
  constructor(
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _localStorage: LocalStorage,
    private router: Router
  ) {
    this.donationForm = this._formBuilder.group({
      donation_for: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern(/^\d*$/)]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      address: [null, [Validators.required]],
      end_date: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this._localStorage.getItem("auth_details").subscribe((authDetails: any) => {
      if(authDetails && authDetails.token){
      } else {
        this.router.navigate(['donation/list']);
      }
    })
  }

  onDonationFormSubmit() {
    if(this.donationForm.valid) {
      let payload = this.donationForm.value;
      
      if(typeof payload.end_date != 'string')
        payload.end_date = payload.end_date.getFullYear() + "-" + (payload.end_date.getMonth() + 1)  + "-" + payload.end_date.getDate();

      this._postService.saveNewDonationPost(payload).subscribe((result) => {
        this.router.navigate(['donation/list']);
      })
    }
  }
}
