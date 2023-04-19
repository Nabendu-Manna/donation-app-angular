import { createAction, props } from "@ngrx/store";


export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const CHANGE_PAGE_VIEW_TYPE = '[shared state] change page view type';


export const setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{ status: boolean}>());
export const changePageViewType = createAction(CHANGE_PAGE_VIEW_TYPE, props<{ page_view_type: string }>());
