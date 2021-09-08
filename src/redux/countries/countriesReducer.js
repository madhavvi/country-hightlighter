import { Types } from './countriesActions';

const INITIAL_STATE = {
    countries: {},
};

export default function getCountries(state = INITIAL_STATE, action){
    switch(action.type){
        case Types.GET_COUNTRIES_REQUEST: {
            return {
                ...state,
                countries: action?.payload?.countries,
                loading: true,
            }
        }

        case Types.GET_COUNTRIES_SUCCESS: {
            return {
                ...state,
                countries: action?.payload?.countries,
                loading: false,
            }
        }

        case Types.GET_COUNTRIES_ERROR: {
            return {
                ...state,
                error: action?.payload?.error
            }
        }

        default: {
            return state;
        }
    }
}