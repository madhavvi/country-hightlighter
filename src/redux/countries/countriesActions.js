export const Types = {
    GET_COUNTRIES_REQUEST: 'countries/GET_COUNTRIES_REQUEST',
    GET_COUNTRIES_SUCCESS: 'countries/GET_COUNTRIES_SUCCESS',
    GET_COUNTRIES_ERROR: 'countries/GET_COUNTRIES_ERROR'
}

export const getCountries = () => ({
    type: Types.GET_COUNTRIES_REQUEST
})

export const getCountriesSuccess = ({countries}) => ({
    type: Types.GET_COUNTRIES_SUCCESS,
    payload: {
        countries: countries
    }
})

export const getCountriesError = ({error}) => ({
    type: Types.GET_COUNTRIES_ERROR,
    payload: {
        error
    }
});

