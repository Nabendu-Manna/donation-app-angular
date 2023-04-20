import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SettingService } from 'src/app/shared/services/setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {

  settingForm: FormGroup
  status: OnlineStatusType = this.onlineStatusService.getStatus() // get initial status
  settingBtnLoader: boolean
  imageFile: any = null

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _settingService: SettingService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private onlineStatusService: OnlineStatusService
  ) {
    this.settingBtnLoader = false

    this.settingForm = this._formBuilder.group({
      title: [null, [Validators.required]],
      body_text: [null, [Validators.required]],
      image: [null, [Validators.required]]
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

  onChangeImage(event: any) {
    this.imageFile = event.target.files[0]
  }

  public onSettingFormSubmit(): void {
    if (this.settingForm.valid && this.imageFile) {
      this._settingService.saveNewDonationPost(this.settingForm.value, this.imageFile).subscribe((loginResponse) => {
        this.router.navigate(['/'])
      })
    }
  }
  //// end event handler functions
}
