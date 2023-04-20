import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap } from "rxjs";

@Injectable()
export class UtilityEffects {
    constructor(
        private actions$: Actions
    ) { }

}
