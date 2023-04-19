import { sharedReducer } from "src/app/shared/store/shared/shared.reducer";
import { SHARED_STATE_NAME } from "src/app/shared/store/shared/shared.selector";

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
}