import { KELVIN } from './constants';

const initialState = {
    dt: 1535317200,
    main: {
        temp: KELVIN,
        humidity: 0
    }
}

console.log(Date.now());

export const Weather = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WEATHER_SUCCESS':
            return action.data;
        case 'GET_WEATHER_FAIL':
            return action.data;
        default:
            return state;
    }
};
