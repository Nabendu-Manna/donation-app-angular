import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup
  status: OnlineStatusType = this.onlineStatusService.getStatus() // get initial status
  registerBtnLoader: boolean

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private onlineStatusService: OnlineStatusService
  ) {
    this.registerBtnLoader = false

    this.registerForm = this._formBuilder.group({
      first_name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+(( [a-zA-Z]+)*)+$/)]],
      last_name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+(( [a-zA-Z]+)*)+$/)]],
      email: [null, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
    });
  }

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status
    })
  }

  ngOnDestroy(): void {
  }

  //// end lifecycle hook

  /**
   * event handler functions
   */
  public onBackBtnClick(): void {
    this.router.navigate(['/'])
  }

  public onRegisterFormSubmit(): void {
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe((registerResponse) => {
        console.log(registerResponse)
      })
    }
  }

  public onFirstNameInput(): void {
    this.registerForm.controls['first_name'].setValue(this.registerForm.value.first_name.toString().replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()));
  }
  public onLastNameInput(): void {
    this.registerForm.controls['last_name'].setValue(this.registerForm.value.last_name.toString().replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()));
  }
  //// end event handler functions
}
