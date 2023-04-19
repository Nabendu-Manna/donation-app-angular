import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormField, FormFieldAPIResponse } from '../../models/proposal-form-field.models';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  submitProposal(enquiryId: string, insurerId: number, proposalData: any) {
    let queryParams = new HttpParams({
      fromObject: {
        action: "BUY_PREMIUM",
        enquiry_id: enquiryId
      }
    })
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    let apiPayload = {
      insurer_id: insurerId,
      proposal_details: proposalData
    };
    return this._httpClient.post(environment.apiUrl, apiPayload, { params: queryParams, headers: headers })
  }

  getProposalFormFields(enquiryId: string, insurerId: number): Observable<FormField[]> {
    let queryParams = new HttpParams({
      fromObject: {
        action: "GET_PROPOSAL_FORM_FIELDS",
        enquiry_id: enquiryId,
        insurer_id: insurerId
      }
    });

    return this._httpClient.get<FormFieldAPIResponse>(environment.apiUrl, { params: queryParams }).pipe(map((data: FormFieldAPIResponse) => data.field_list ));
  }
}
