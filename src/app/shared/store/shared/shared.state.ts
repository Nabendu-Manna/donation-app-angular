
export interface SharedState {
    loading: boolean;
    page_view_type: string;
}

export const initialState: SharedState = {
    loading: false,
    page_view_type: "list"
}