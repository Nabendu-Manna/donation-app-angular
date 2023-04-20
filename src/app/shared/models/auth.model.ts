export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    user_id: number
    token: string
}

export interface RegisterPayload {
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface UserDetails {
    email: string, 
    id: number, 
    first_name: string, 
    last_name: string, 
    role: boolean, 
    is_active: boolean, 
    is_deleted: boolean, 
    created_at: string, 
    modified_at: string, 
    deleted_at: string
}

export interface ForgotPasswordPayload {
    email: string
}

export interface ForgotPasswordResponse {
    user_id: number
    token: string
}