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
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {

  loginForm: FormGroup
  status: OnlineStatusType = this.onlineStatusService.getStatus() // get initial status
  loginBtnLoader: boolean

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private onlineStatusService: OnlineStatusService
  ) {
    this.loginBtnLoader = false

    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
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

  public onLoginFormSubmit(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe((loginResponse) => {
        // console.log(loginResponse)
      })
    }
  }
  //// end event handler functions
}
