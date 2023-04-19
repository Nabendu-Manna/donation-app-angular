import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap } from "rxjs";
import { UtilityService } from "../../services/utility/utility.service";

@Injectable()
export class UtilityEffects {
    constructor(
        private actions$: Actions,
        private _utilityService: UtilityService,
    ) { }

}
