import { Action, createReducer, on } from "@ngrx/store";
import {  changePageViewType, setLoadingSpinner } from "./shared.action";
import { initialState, SharedState } from "./shared.state";

const _sharedReducer = createReducer(initialState,

    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            loading: action.status
        }
    }),
    on(changePageViewType, (state, action) => {
        return {
            ...state,
            page_view_type: action.page_view_type
        }
    })
);

export function sharedReducer(state: SharedState | undefined, action: Action) {
    return _sharedReducer(state, action);
}