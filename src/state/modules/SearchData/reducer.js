import * as types from './types';

const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case types.SEARCH:
            {
                const {
                    values
                } = action;
                return {
                    ...state,
                    values
                };
            }
        default:
            return state;
    }
};

export default reducer;
