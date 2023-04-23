import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LoginResponse } from '../../models/auth.model';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
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

  getHomePageLayout(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}/setting/home-page/`).pipe(map((data) => {
      return {
        ...data,
        image: `${environment.apiUrl}${data.image}`
      }
    }))
  }

  saveNewDonationPost(payload: any, imageFile: any): Observable<any> {
    let queryParams = new HttpParams({});
    if (this.userDetails && this.userDetails.token) {
      
      var formData = new FormData();
      formData.append("title", payload.title);
      formData.append("body_text", payload.body_text);
      formData.append("image", imageFile, imageFile.name);

      let headers = new HttpHeaders({ 'Authorization': `Token ${this.userDetails.token}` });
      return this._httpClient.patch<any>(`${environment.apiUrl}/setting/home-page/update/`, formData, { params: queryParams, headers: headers });
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }
}
