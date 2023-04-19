// export interface Premium {
//     insurer_id: number,
//     total_premium: number,
//     insurer_name: string,
//     insurer_images: string,
//     plan_name: string,
//     sum_insured: number
// }

export interface Premium {
    insurer_id: number,
    main_plan: string,
    more_plan_status: boolean,
    plan_list: PremiumPlan []
}

export interface PremiumPlan {
    insurer_id: number,
    total_premium: number,
    insurer_name: string,
    insurer_images: string,
    plan_name: string,
    sum_insured: number,
    plan_key: string,
    other_details: any
}

export interface PremiumAPIResponse {
    premium: PremiumPlan,
    message: string
}

export interface PremiumApiPayload {
    enquiry_id: string,
    insurer_id: number
}

export interface PlanData {
    plan_name: string,
    plan_key: string
}

export interface ProviderData {
    insurer_id: number,
    main_plan: string,
    more_plan_status: boolean,
    plan_list: PlanData[]
}
export interface ProviderListApiResponse {
    provider_list: ProviderData[],
    message: string
}