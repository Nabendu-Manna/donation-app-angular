import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { DonationPost } from 'src/app/shared/models/donation.model';
import { PostService } from 'src/app/shared/services/post/post.service';
import { changePageViewType } from 'src/app/shared/store/shared/shared.action';
import { pageViewType } from 'src/app/shared/store/shared/shared.selector';

@Component({
  selector: 'app-donations',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {
  donationList$: Observable<DonationPost[]>;
  pageViewType$: Observable<string>;
  constructor(
    private _postService: PostService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.donationList$ = of([]);
    this.pageViewType$ = this.store.select(pageViewType);
  }
  ngOnInit(): void {
    this.donationList$ = this._postService.getDonationPostList()
  }

  onClickLayout(layout: string) {
    this.store.dispatch(changePageViewType({ page_view_type: layout }))
  }

  onClickNew() {
    this.router.navigate(['donation/new']);
  }
}
