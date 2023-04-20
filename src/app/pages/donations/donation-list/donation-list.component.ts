import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { DonationPost, DonationPostSearch } from 'src/app/shared/models/donation.model';
import { PostService } from 'src/app/shared/services/post/post.service';
import { changePageViewType } from 'src/app/shared/store/shared/shared.action';
import { pageViewType } from 'src/app/shared/store/shared/shared.selector';

@Component({
  selector: 'app-donations',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {
  searchForm: FormGroup
  // donationList$: Observable<DonationPostSearch>;
  donationList: DonationPostSearch;
  pageViewType$: Observable<string>;
  page: number = 1;
  constructor(
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private store: Store<AppState>,
    private router: Router
  ) {

    this.searchForm = this._formBuilder.group({
      search: [null],
    });

    this.donationList = {
      count: 0,
      next: null,
      previous: null,
      results: []
    };
    this.pageViewType$ = this.store.select(pageViewType);
  }
  ngOnInit(): void {
    this._postService.getDonationPostList({ page: this.page, limit: 10, search: null }).subscribe((data) => {
      this.donationList = data
    })
  }

  onClickLayout(layout: string) {
    this.store.dispatch(changePageViewType({ page_view_type: layout }))
  }

  onClickNew() {
    this.router.navigate(['donation/new']);
  }

  onSearchChange() {
    this.page = 1
    this._postService.getDonationPostList({ page: this.page, limit: 10, search: this.searchForm.value.search }).subscribe((data) => {
      this.donationList = data
    })
  }

  onPreviousClick() {
    this.page -= 1
    this._postService.getDonationPostList({ page: this.page, limit: 10, search: this.searchForm.value.search }).subscribe((data) => {
      this.donationList = data
    })
  }

  onNextClick() {
    this.page += 1
    this._postService.getDonationPostList({ page: this.page, limit: 10, search: this.searchForm.value.search }).subscribe((data) => {
      this.donationList = data
    })
  }
}
