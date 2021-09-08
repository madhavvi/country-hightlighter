import GetCountriesSagas from './countries/sagas/getCountries';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...GetCountriesSagas,
    ])
}