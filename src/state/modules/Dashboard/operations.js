import * as types from './types';
import { of
} from 'rxjs';
import {
    map,
    takeUntil,
    mergeMap,
    debounceTime,
    catchError
} from 'rxjs/operators';
import {
    ofType
} from 'redux-observable';
import {
    serverUrl
} from '../../../config';
import {
    ajax
} from 'rxjs/ajax';

export const fetchUser = id => ({
    type: types.FETCH_USER,
});

export const search = data => ({
    type: types.SEARCH,
    data
});

export const leave = () => ({
    type: types.LEAVE
})

const fetchUserFulfilled = payload => {
    return  ({
    type: types.FETCH_USER_FULFILLED,
    data: payload.data
})};

const fetchSearchFulfilled = payload => {
   return ({
    type: types.SEARCH_DATA,
    search: payload.response.data
})};

export const cancelFetchUser = () => ({
    type: types.FETCH_USER_CANCELLED
});

export const fetchUserEpic = action$ => {
    return action$.pipe(
        ofType(types.FETCH_USER),
        mergeMap(() => ajax.getJSON(serverUrl).pipe(
            map(response => fetchUserFulfilled(response)),
            catchError(error => of ({
                type: types.FETCH_USER_REJECTED,
            })),
            takeUntil(action$.pipe(ofType(types.FETCH_USER_CANCELLED)))
        ))
    )
};

export const searchEpic = action$ => {
    return action$.pipe(
        ofType(types.SEARCH),
        debounceTime(500),
        mergeMap(query => {
            return ajax.post(serverUrl, {data: query.data}).pipe(
            map(response => fetchSearchFulfilled(response)),
            catchError(error => of ({
                type: types.CANCEL_SEARCH,
            }))
        )})
    )
}