import { Component, Input, OnInit } from '@angular/core';
import { Premium, PremiumPlan } from '../../models/premium.modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { QuoteService } from '../../services/quote/quote.service';
import { AppState } from 'src/app/core/store/app.state';
import { enquiryId, loadingStatus } from '../../store/shared/shared.selector';
import { Output, EventEmitter } from '@angular/core';
import { PaymentData } from '../../models/payment-data.models';
import { setLoadingSpinner } from '../../store/shared/shared.action';

@Component({
  selector: 'app-insurers-plan',
  templateUrl: './insurers-plan.component.html',
  styleUrls: ['./insurers-plan.component.scss']
})
export class InsurersPlanComponent implements OnInit {
  @Output() onBuyNow = new EventEmitter<{
    quotation_id: string,
    insurer_id: number
  }>();
  @Input() premium_plan_data!: PremiumPlan;
  enquiryId$: Observable<string | undefined>;
  loadingStatus$: Observable<boolean>;
  loadingStatus: boolean;
  deepLoadingStatus: boolean;

  constructor(
    private store: Store<AppState>,
    private quoteService: QuoteService
  ) {
    this.loadingStatus = false;
    this.deepLoadingStatus = false;
    this.enquiryId$ = this.store.select(enquiryId);
    this.loadingStatus$ = this.store.select(loadingStatus);
  }

  ngOnInit(): void {
    this.loadingStatus$.subscribe(loadingStatus => {
      if (loadingStatus) {
        this.loadingStatus = loadingStatus;
      }
    });
  }

  public onBuyClick(): void {
    this.enquiryId$.subscribe(enquiryId => {
      this.onBuyNow.emit({
        quotation_id: this.premium_plan_data.other_details.quotation_id,
        insurer_id: this.premium_plan_data.insurer_id
      });

      // if (enquiryId && this.premium_plan_data) {
      //   this.store.dispatch(setLoadingSpinner({ status: true }));
      //   this.deepLoadingStatus = true;
      //   this.quoteService.savePaymentData(enquiryId, this.premium_plan_data.insurer_id).subscribe(paymentData => {
      //     setTimeout(() => {
      //       this.store.dispatch(setLoadingSpinner({ status: false }));
      //       this.deepLoadingStatus = false;
      //     }, 10)
      //     this.onBuyNow.emit(paymentData);
      //   });
      // }
    });
  }

}
