import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { AuthService } from './shared/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'investment-plans';

  status: OnlineStatusType = this.onlineStatusService.getStatus();
  loginStatus$: Observable<boolean>;
  adminStatus$: Observable<boolean>;
  constructor(
    private onlineStatusService: OnlineStatusService,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.loginStatus$ = this._authService.loginStatus
    this.adminStatus$ = this._authService.adminStatus
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }

  goToHome() {
    this.router.navigate(['/'])
  }
  goToDonationRequestList() {
    this.router.navigate(['donation/list'])
  }
  goToDonationRequestMap() {
    this.router.navigate(['donation/map'])
  }
  goToNewDonation() {
    this.router.navigate(['donation/new'])
  }
  goToSetting() {
    this.router.navigate(['setting'])
  }
  goToLogIn() {
    this.router.navigate(['login'])
  }
  goToLogOut() {
    this._authService.logout().subscribe(() => { })
  }
  goToRegister() {
    this.router.navigate(['register'])
  }
  goToForgotPassword() {
    this.router.navigate(['forgot-password'])
  }

}
