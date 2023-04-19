import { BusinessDetails } from "./business-details.models";
import { ContactDetails } from "./contact-details.model";
import { InsureItems } from "./insure-items.model";
import { InvestmentDetails } from "./InvestmentDetails.model";
import { PersonalDetails } from "./personal-details.model";

export interface QuoteDetails {
    contact_details: ContactDetails,
    personal_details: PersonalDetails,
    investment_details: InvestmentDetails,
    addons: []
    
}

export interface QuoteDetailsAPIResponse {
    pre_quote_data: QuoteDetails
    message: string
}