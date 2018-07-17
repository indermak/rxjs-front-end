import * as types from './types';
import { of } from 'rxjs';
import { delay, map, filter, takeUntil, mergeMap, debounceTime, switchMap, take, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { serverUrl } from '../../../config';
import { ajax } from 'rxjs/ajax';

export const searchEpic = (action$) =>
    action$.pipe(
        ofType(types.SEARCH),
        map(action => action.payload),
        debounceTime(500),
        switchMap(query =>
            ajax.post(serverUrl, {
                query
            }),
            takeUntil(action$.ofType(types.CANCEL_SEARCH))),
        map(res => ({
            type: types.SEARCH_DATA,
            result: res.response
        })))