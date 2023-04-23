import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DonationPost, DonationPostResponse, DonationPostSearch, DonationPostSearchApiResponse } from '../../models/donation.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LoginResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userDetails!: LoginResponse;
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorage
  ) {
    this._localStorage.getItem("auth_details").subscribe((authDetails: any) => {
      if (authDetails)
        this.userDetails = authDetails
    })
  }

  receivedAmountPercentage(target: number, received: number): number {
    return (received / target) * 100
  }

  getDonationPostList(filter: { page: number, limit: number, search: string | null }): Observable<DonationPostSearch> {
    let queryParams;
    if (filter.search) {
      queryParams = new HttpParams({
        fromObject: {
          page: filter.page,
          limit: filter.limit,
          search: filter.search
        }
      });
    } else {
      queryParams = new HttpParams({
        fromObject: {
          page: filter.page,
          limit: filter.limit
        }
      });
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.get<DonationPostSearchApiResponse>(`${environment.apiUrl}/donation/list/`, { params: queryParams, headers: headers }).pipe(map((postListData: DonationPostSearchApiResponse) => {
      let newPostList: DonationPost[] = []
      postListData.results.forEach(post => {
        let endDate = new Date(post.end_date)
        let toDay = new Date()
        let diff = endDate.getTime() - toDay.getTime()
        if (diff > -1)
          newPostList.push({
            ...post,
            progress: this.receivedAmountPercentage(post.amount, post.received_amount)
          })
      })
      return {
        ...postListData,
        results: newPostList
      }
    }))
  }

  getAllDonationPostList(): Observable<DonationPost[]> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.get<DonationPostResponse[]>(`${environment.apiUrl}/donation/all/`, { headers: headers }).pipe(map((postList: DonationPostResponse[]) => {
      let newPostList: DonationPost[] = []
      postList.forEach(post => {
        let endDate = new Date(post.end_date)
        let toDay = new Date()
        let diff = endDate.getTime() - toDay.getTime()
        if (diff > -1)
          newPostList.push({
            ...post,
            progress: this.receivedAmountPercentage(post.amount, post.received_amount)
          })
      })
      return newPostList
    }))
  }

  saveNewDonationPost(payload: any): Observable<any> {
    let queryParams = new HttpParams({});
    if (this.userDetails && this.userDetails.token) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.userDetails.token}` });
      return this._httpClient.post<any>(`${environment.apiUrl}/donation/new/`, payload, { params: queryParams, headers: headers });
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }

  donate(payload: any): Observable<any> {
    let queryParams = new HttpParams({});
    if (this.userDetails && this.userDetails.token) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.userDetails.token}` });
      return this._httpClient.post<any>(`${environment.apiUrl}/donation/donate/`, payload, { params: queryParams, headers: headers });
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }
}
