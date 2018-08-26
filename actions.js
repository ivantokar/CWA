import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const APP_ID = 'a4d44e06ecb9eda022f7f2db9d40d61c';

export const getWeather = (data)  => {
    console.log(data, data.latitude);
     
    return (dispatch) => {
        axios.get(`${API_URL}?appid=${APP_ID}&lat=${data.latitude}&lon=${data.longitude}`)
        .then((response) => {
           if (response.data.cod && response.data.message) {
               throw new Error(response.data.message)
           } else {
                dispatch({
                    type: 'GET_WEATHER_SUCCESS',
                    data: response.data.main.temp
                });
           }
        }, (error) => {
            throw new Error(error.response.data.message)
        })
    };
};
