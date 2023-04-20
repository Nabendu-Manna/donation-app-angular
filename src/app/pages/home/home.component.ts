import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { SettingService } from 'src/app/shared/services/setting/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  homePageData: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _settingService: SettingService,
    private store: Store<AppState>,
  ) {
    
  }

  ngOnInit(): void {
    this._settingService.getHomePageLayout().subscribe((data) => {
      this.homePageData = data
    })
  }

  ngOnDestroy(): void {
  }

}
