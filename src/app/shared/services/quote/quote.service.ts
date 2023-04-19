import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentData } from '../../models/payment-data.models';
import { PremiumAPIResponse, PremiumPlan, ProviderData, ProviderListApiResponse } from '../../models/premium.modal';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(
    private httpClient: HttpClient
  ) {
    
  }

  /**
   * 
   * @param enquiryId 
   * @returns 
   */
  getPremium(enquiryId: string, insurerId: number): Observable<PremiumPlan> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "GET_PREMIUM",
        insurer_id: insurerId,
        enquiry_id: enquiryId
      }
    });

    return this.httpClient.get<PremiumAPIResponse>(environment.apiUrl, { params: queryParams }).pipe(map((response: PremiumAPIResponse) => {
      return response.premium;
    }));
  }
  
  savePaymentData(enquiry_id: string, insurer_id: number): Observable<PaymentData> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "SAVE_PAYMENT_DATA",
        enquiry_id: enquiry_id
      }
    });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let quoteDetails = {
      insurer_id: insurer_id
    };
    return this.httpClient.post<PaymentData>(environment.apiUrl, quoteDetails, { params: queryParams, headers: headers });
  }

  getPremiumByOrderId(orderId: string): Observable<PremiumAPIResponse> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "GET_PREMIUM_BY_ORDER_ID",
        order_id: orderId
      }
    });
    return this.httpClient.get<PremiumAPIResponse>(environment.apiUrl, { params: queryParams });
  }

  getProviderList(): Observable<ProviderData[]> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "GET_PROVIDER_LIST"
      }
    });
    return this.httpClient.get<ProviderListApiResponse>(environment.apiUrl, { params: queryParams }).pipe(map((response: ProviderListApiResponse) => {
      return response.provider_list;
    }));
  }
}
