import * as types from './types';

const reducer = (state = {}, action = {}) => {
    const {
        type,
        ...rest
    } = action;

    if (type === types.FETCH_REQUEST_SUBMIT) {
        return { ...state,
            ...rest,
            error: false,
            loading: true
        };
    }

    if (type === types.FETCH_REQUEST_SUCCESS) {
        return { ...state,
            ...rest,
            error: false,
            loading: false
        };
    }

    if (type === types.FETCH_USER_CANCELLED) {
        return { ...state,
            ...rest,
            error: false,
            loading: false,
            // data: []
        };
    }

    if (type === types.FETCH_REQUEST_FAIL) {
        return { ...state,
            ...rest,
            error: false,
            loading: false
        };
    }

    if (type === types.FETCH_USER_FULFILLED) {
        return { ...state,
            ...rest,
            loading: false,
            isError: false
        };
    }

    if (type === types.FETCH_USER_REJECTED) {
        return { ...state,
            ...rest,
            loading: false,
            isError: true
        };
    }

    if (type === types.FETCH_USER) {
        return { ...state,
            loading: true,
            isError: false
        };
    }

    if (type === types.SEARCH) {
        return { ...state,
            ...rest,
            loading: true,
            isError: false
        };
    }

    if (type === types.SEARCH_DATA) {
        return { ...state,
            ...rest,
            loading: false,
            isError: false
        };
    }

    if (type === types.LEAVE) {
        return { 
            state : {}
        };
    }

    return state;
};

export default reducer;
