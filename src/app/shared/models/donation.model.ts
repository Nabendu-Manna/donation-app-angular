import { UserDetails } from "./auth.model";

export interface DonationPost {
    id: number, 
    donation_for: string, 
    amount: number, 
    country: string, 
    state: string, 
    latitude: string, 
    longitude: string, 
    end_date: string, 
    received_amount: number,
    progress: number,
    created_at: string, 
    user: number, 
    user_details: UserDetails
}

export interface DonationPostResponse {
    id: number, 
    donation_for: string, 
    amount: number, 
    country: string, 
    state: string, 
    latitude: string, 
    longitude: string, 
    end_date: string, 
    received_amount: number,
    created_at: string, 
    user: number, 
    user_details: UserDetails
}

export interface DonationPostSearch {
    count: number,
    next: string | null,
    previous: string | null,
    results: DonationPost[]
}
export interface DonationPostSearchApiResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: DonationPostResponse[]
}
