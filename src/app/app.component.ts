import { Component } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'investment-plans';
  
  status: OnlineStatusType = this.onlineStatusService.getStatus();

  constructor(private onlineStatusService: OnlineStatusService) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }
}
