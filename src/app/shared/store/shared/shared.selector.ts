import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const loadingStatus = createSelector(getSharedState, (state) => state.loading);
export const pageViewType = createSelector(getSharedState, (state) => state.page_view_type);