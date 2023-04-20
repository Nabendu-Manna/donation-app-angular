import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ForgotPasswordPayload, ForgotPasswordResponse, LoginPayload, LoginResponse, RegisterPayload } from '../../models/auth.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails!: LoginResponse;
  private loginStatusSubject = new BehaviorSubject(false)
  public loginStatus = this.loginStatusSubject.asObservable()
  private adminStatusSubject = new BehaviorSubject(false)
  public adminStatus = this.adminStatusSubject.asObservable()

  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorage
  ) {
    this._localStorage.getItem("auth_details").subscribe((authDetails: any) => {
      if (authDetails && authDetails.user_id) {
        this._httpClient.get<{ valid: boolean }>(`${environment.apiUrl}/account/admin/valid`).subscribe(data => {
          this.adminStatusSubject.next(data.valid)
        })
        this.userDetails = authDetails
        this.loginStatusSubject.next(true)
      } else {
        this.loginStatusSubject.next(false)
      }
    })

  }

  isUserValid(): Observable<boolean> {
    if (this.userDetails && this.userDetails.token) {
      return this._httpClient.get<{ valid: boolean }>(`${environment.apiUrl}/account/user/valid`).pipe(map(data => {
        this.loginStatusSubject.next(data.valid)
        return data.valid
      }))
    } else {
      this.loginStatusSubject.next(false)
      return of(false)
    }

  }
  isAdminValid(): Observable<boolean> {
    if (this.userDetails && this.userDetails.token) {
      return this._httpClient.get<{ valid: boolean }>(`${environment.apiUrl}/account/admin/valid`).pipe(map(data => {
        this.adminStatusSubject.next(data.valid)
        return data.valid
      }))
    } else {
      this.loginStatusSubject.next(false)
      return of(false)
      
    }
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    // let queryParams = new HttpParams({ fromObject: { action: "SAVE_PRE_QUOTE_DETAILS" } });
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<LoginResponse>(`${environment.apiUrl}/account/login/`, payload, { params: queryParams, headers: headers }).pipe(tap(loginResponse => {
      if (loginResponse.user_id) {
        this._localStorage.setItem("auth_details", loginResponse).subscribe(() => { })
        this.loginStatusSubject.next(true)
      } else {
        this.loginStatusSubject.next(false)
      }
    }));
  }

  logout(): Observable<any> {
    this.loginStatusSubject.next(false)
    this._localStorage.removeItem("auth_details").subscribe(() => {})
    if (this.userDetails && this.userDetails.token) {
      let queryParams = new HttpParams({})
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.userDetails.token}` })
      return this._httpClient.post<any>(`${environment.apiUrl}/account/logout/`, {}, { params: queryParams, headers: headers })
    } else {
      return of({
        error: "Invalid Data"
      })
    }
  }

  register(payload: RegisterPayload): Observable<LoginResponse> {
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<LoginResponse>(`${environment.apiUrl}/account/register/`, payload, { params: queryParams, headers: headers }).pipe(tap(registerResponse => {
      this._localStorage.setItem("auth_details", registerResponse).subscribe(() => { })
    }));
  }

  forgotPassword(payload: ForgotPasswordPayload): Observable<any> {
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<any>(`${environment.apiUrl}/forgot-password/`, payload, { params: queryParams, headers: headers });
  }
}
