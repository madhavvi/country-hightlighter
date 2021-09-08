import { takeEvery, call, put, fork } from 'redux-saga/effects';
import * as actions from '../countriesActions';
import * as api from '../../../Utils/Api';

function* getCountries() {
    try {
        const result = yield call(api.getCountries);
        yield put(actions.getCountriesSuccess({
			countries: result.data
		}));
    } catch (e) {
        yield put(actions.getCountriesError({
            error: 'An error occurred when trying to fetch project list'
        }));
    }
}

function* watchGetCountriesRequest() {
    yield takeEvery(actions.Types.GET_COUNTRIES_REQUEST, getCountries);
}

const GetCountriesSagas = [
    fork(watchGetCountriesRequest)
]

export default GetCountriesSagas;