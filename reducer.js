const initialState = { data: {}, error: false, loading: true };

export const Weather = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WEATHER_SUCCESS':
            return {
                data: [...state.data, action.data],
                errors: false,
                loading: false,
            };
        case 'GET_WEATHER_FAIL':
            return {
                data: state,
                errors: true,
                loading: false,
            };
        default:
            return state;
    }
};
