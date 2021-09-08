
export const selectGetCountriesState = state => state;

export const selectCountries = state => selectGetCountriesState(state).countries;

