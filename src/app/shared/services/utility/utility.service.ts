import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../../models/business.model';
import { City } from '../../models/city.models';
import { catchError, map, tap } from 'rxjs/operators';
import { Premium, PremiumApiPayload, PremiumAPIResponse } from '../../models/premium.modal';
import { EnquiryNumber, EnquiryNumberAPIResponse, PaymentLog, PaymentLogAPIResponse } from '../../models/util.model';
import { QuoteDetails, QuoteDetailsAPIResponse } from '../../models/quote-details.models';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /**
   * 
   * @param httpClient 
   */
  constructor(
    private httpClient: HttpClient
  ) {
    console.log(environment.apiUrl);
  }

  /**
   * 
   * @returns 
   */
  getEnquiryId(): Observable<EnquiryNumber> {
    let queryParams = new HttpParams({ fromObject: { action: "GET_ENQUIRY_NUMBER" } });
    return this.httpClient.get<EnquiryNumberAPIResponse>(environment.apiUrl, { params: queryParams }).pipe(tap(data => {
      return {
        enquiry_id: data.enquiry_id
      }
    }));
  }

  /**
   * 
   * @returns Observable<City[]>
   */
  cityList(): Observable<City[]> {
    let cityListStr = localStorage.getItem("city_list");
    if (cityListStr) {
      let cityList = JSON.parse(cityListStr);
      const now = new Date();
      if (now.getTime() + 86400000 > cityList.created_at)
        return of(cityList.data);
    }

    let queryParams = new HttpParams({ fromObject: { action: "GET_CITY_LIST" } });
    return this.httpClient.get<City[]>(environment.apiUrl, { params: queryParams }).pipe(tap(data => {
      let payload = {
        created_at: new Date().getTime(),
        data: data
      }
      localStorage.setItem("city_list", JSON.stringify(payload));
    }));
  }

  /**
   * 
   * @returns Observable<Business[]>
   */
  businessList(): Observable<Business[]> {
    let businessListStr = localStorage.getItem("business_list");
    if (businessListStr) {
      let businessList = JSON.parse(businessListStr);
      const now = new Date();
      if (now.getTime() + 86400000 > businessList.created_at)
        return of(businessList.data);
    }

    let queryParams = new HttpParams({ fromObject: { action: "GET_BUSINESS_LIST" } });
    return this.httpClient.get<Business[]>(environment.apiUrl, { params: queryParams }).pipe(tap(data => {
      let payload = {
        created_at: new Date().getTime(),
        data: data
      }
      localStorage.setItem("business_list", JSON.stringify(payload));
    }));
  }

  // appState(): Observable<>{
  // }

  getPreQuoteData(enquiryId: string): Observable<QuoteDetailsAPIResponse> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "GET_PRE_QUOTE_DETAILS",
        enquiry_id: enquiryId
      }
    });

    return this.httpClient.get<QuoteDetailsAPIResponse>(environment.apiUrl, { params: queryParams });
  }

  savePreQuoteData(payload: QuoteDetails): Observable<EnquiryNumber> {
    let queryParams = new HttpParams({ fromObject: { action: "SAVE_PRE_QUOTE_DETAILS" } });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<EnquiryNumberAPIResponse>(environment.apiUrl, payload, { params: queryParams, headers: headers }).pipe(tap(data => {
      return data.enquiry_id;
    }));
  }

  updatePreQuoteData(enquiry_id: string, quoteDetails: QuoteDetails): Observable<EnquiryNumber> {
    let queryParams = new HttpParams(
      {
        fromObject: {
          action: "UPDATE_PRE_QUOTE_DETAILS",
          enquiry_id: enquiry_id
        }
      });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<EnquiryNumberAPIResponse>(environment.apiUrl, quoteDetails, { params: queryParams, headers: headers }).pipe(tap(data => {
      return data.enquiry_id;
    }));
  }

  getPaymentLog(order_id: string): Observable<PaymentLog> {
    let queryParams = new HttpParams({ fromObject: { 
      action: "GET_PAYMENT_RESPONSE",
      order_id: order_id
    } });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<PaymentLogAPIResponse>(environment.apiUrl, { params: queryParams, headers: headers }).pipe(map(data => {
      return data.payment_data;
    }));
  }
}
