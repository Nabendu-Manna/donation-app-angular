import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'investment-plans';
  
  status: OnlineStatusType = this.onlineStatusService.getStatus();

  constructor(
    private onlineStatusService: OnlineStatusService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
    // this.router.navigate(['login'])
  }
  goToRegister() {
    this.router.navigate(['register'])
  }

}
