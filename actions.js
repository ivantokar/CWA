import axios from 'axios';
import { API_URL, APP_ID } from './constants';

export const getWeather = (data)  => {
    return (dispatch) => {
        axios.get(`${API_URL}?appid=${APP_ID}&lat=${data.latitude}&lon=${data.longitude}`)
            .then((response) => {
                dispatch({
                    type: 'GET_WEATHER_SUCCESS',
                    data: response.data
                });
            })
            .catch((fail) => {
                dispatch({
                    type: 'GET_WEATHER_FAIL',
                    data: null,
                    error: true
                });
            });
    };
};
