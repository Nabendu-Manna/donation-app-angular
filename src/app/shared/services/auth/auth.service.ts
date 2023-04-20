import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ForgotPasswordPayload, ForgotPasswordResponse, LoginPayload, LoginResponse, RegisterPayload } from '../../models/auth.model';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: LocalStorage
  ) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    // let queryParams = new HttpParams({ fromObject: { action: "SAVE_PRE_QUOTE_DETAILS" } });
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<LoginResponse>(`${environment.apiUrl}account/login/`, payload, { params: queryParams, headers: headers }).pipe(tap(loginResponse => {
      this._localStorage.setItem("auth_details", loginResponse).subscribe(() => {})
    }));
  }

  register(payload: RegisterPayload): Observable<LoginResponse> {
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<LoginResponse>(`${environment.apiUrl}/account/register/`, payload, { params: queryParams, headers: headers }).pipe(tap(registerResponse => {
      this._localStorage.setItem("auth_details", registerResponse).subscribe(() => {})
    }));
  }

  forgotPassword(payload: ForgotPasswordPayload): Observable<any> {
    let queryParams = new HttpParams({});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._httpClient.post<any>(`${environment.apiUrl}/forgot-password/`, payload, { params: queryParams, headers: headers });
  }
}
