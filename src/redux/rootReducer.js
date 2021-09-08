import { combineReducers } from 'redux';
import countriesReducer from './countries/countriesReducer';

 export default combineReducers({
    countries: countriesReducer
});