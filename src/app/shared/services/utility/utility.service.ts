import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /**
   * 
   * @param httpClient 
   */
  constructor(
    private _httpClient: HttpClient
  ) {}

}
