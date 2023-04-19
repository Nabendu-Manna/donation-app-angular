import { SHARED_STATE_NAME } from "src/app/shared/store/shared/shared.selector";
import { SharedState } from "src/app/shared/store/shared/shared.state";

export interface AppState {
    [SHARED_STATE_NAME]: SharedState;
}
