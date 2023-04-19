
export interface EnquiryNumber {
    enquiry_id: string,
}
export interface EnquiryNumberAPIResponse extends EnquiryNumber {
    status?: boolean,
    massage?: string,
}

export interface AllAPIResponseStatus {
    get_pre_quote_data: boolean,
    save_pre_quote_data: boolean,
    update_pre_quote_data: boolean,
}

export interface PaymentLog {
    id: number,
    order_id: string,
    payment_status: number,
    message: string,
    billing_name: string,
    tracking_id: string,
    amount: number,
    payment_mode: string,
    service_charge: number,
    total: number
}

export interface PaymentLogAPIResponse {
    payment_data: PaymentLog,
    message: string
}


export interface AllQuoteApiResponseStatus {
    get_provider_list: boolean,
    get_premium_data: boolean
}