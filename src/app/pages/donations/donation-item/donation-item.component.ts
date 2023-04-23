import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { DonateDialogComponent } from 'src/app/shared/dialogs/donate-dialog/donate-dialog.component';
import { DonationPost } from 'src/app/shared/models/donation.model';
import { PostService } from 'src/app/shared/services/post/post.service';
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
    private store: Store<AppState>,
    private _postService: PostService,
    public _dialog: MatDialog
  ){
    this.pageViewType$ = this.store.select(pageViewType);
  }

  ngOnInit(): void {
  }

  onClickDonate(): void {
    let dialogRef = this._dialog.open(DonateDialogComponent, { data: { ...this.donation } });
    dialogRef.afterClosed().subscribe((result: DonationPost) => {
      this.donation.progress = this._postService.receivedAmountPercentage(this.donation.amount, result.received_amount)
      this.donation.received_amount = result.received_amount
    });
  }
}
