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
    created_at: string, 
    user: number, 
    user_details: UserDetails
}