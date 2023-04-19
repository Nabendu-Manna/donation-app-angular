import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DonationPost } from '../../models/donation.model';
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
      if(authDetails)
        this.userDetails = authDetails
    })
  }

  getDonationPostList(): Observable<DonationPost[]> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.get<DonationPost[]>(`${environment.apiUrl}donation/all/`, { headers: headers })
  }

  saveNewDonationPost(payload: any): Observable<any> {
    let queryParams = new HttpParams({});
    if(this.userDetails && this.userDetails.token){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.userDetails.token}` });
      return this._httpClient.post<any>(`${environment.apiUrl}donation/new`, payload, { params: queryParams, headers: headers });
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }

  donate(payload:any): Observable<any> {
    let queryParams = new HttpParams({});
    if(this.userDetails && this.userDetails.token){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.userDetails.token}` });
      return this._httpClient.post<any>(`${environment.apiUrl}donation/donate`, payload, { params: queryParams, headers: headers });
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }
}
