import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { DonationPost } from 'src/app/shared/models/donation.model';
import { pageViewType } from 'src/app/shared/store/shared/shared.selector';

@Component({
  selector: 'app-donation-item',
  templateUrl: './donation-item.component.html',
  styleUrls: ['./donation-item.component.scss']
})
export class DonationItemComponent implements OnInit{
  @Input() donation!: DonationPost;
  pageViewType$: Observable<string>;
  constructor(
    private store: Store<AppState>
  ){
    this.pageViewType$ = this.store.select(pageViewType);
  }

  ngOnInit(): void {
    if(this.donation)
      console.log(this.donation);
  }
}
