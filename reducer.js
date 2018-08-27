import { KELVIN } from './constants';

export const Weather = (state = null, action) => {
    switch (action.type) {
        case 'GET_WEATHER_SUCCESS':
            return action;
        case 'GET_WEATHER_FAIL':
            return action;
        default:
            return state;
    }
};
