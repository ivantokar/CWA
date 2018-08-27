import React from 'react';
import { connect } from 'react-redux';
import { getWeather } from './actions';
import { KELVIN } from './constants';
import {
    StyleSheet,
    Text,
    View,
    Button,
    AsyncStorage
} from 'react-native';
import Moment from 'moment';

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            error: false,
            data: null,
        };
    }

    componentWillMount() {
        this.retrieveDataFromStorage();
    }

    componentDidMount() {
        this.refreshWeather();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.weather.type !== 'GET_WEATHER_FAIL') {
            this.setState({
                data: nextProps.weather.data,
            });
            
            this.storeDataToStorage(nextProps.weather.data);
        } else {
            this.setState({
                error: true,
            });
        }
    }

    retrieveDataFromStorage = () => {
        try {
            var stored = AsyncStorage.getItem('CW');
            
            if (stored !== null) {
                this.setState({
                    data: JSON.parse(stored),
                    error: false,
                });
            }
            return;
        } catch (error) {
            this.setState({
                data: null,
            });

            return false;
        }
    }

    storeDataToStorage = (data) => {
        try {
            AsyncStorage.setItem('CW', JSON.stringify(data));
        } catch (error) {
            console.error('Storing: ', error);
        }
    }

    refreshWeather = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                this.props.getWeather(this.state);
            },
            (error) => this.setState({
                    error: error.message,
                }), {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    render() {
        const { error, data } = this.state;
        const { container, header, heading, small, light, red, uppercase, centerXY, display, normal } = styles;
        
        console.log(1, data, error);

        return (
            <React.Fragment>
            {
                data !== null
                ?
                    <View style={container}>
                        <View style={header}>
                            <Text style={heading}>Weather at your location</Text>
                            <Text style={[small, light]}>
                                {
                                    Moment(new Date(data.dt * 1000)).format('LLLL')
                                }
                            </Text>
                            <Text style={[normal, {paddingTop: 10}]}>{data.name}</Text>
                        </View>
                        <View style={[centerXY, {flex: 4}]}>
                            <Text style={display}>
                                {
                                    Math.round(data.main.temp - KELVIN)
                                }
                                &#8451;
                            </Text>
                            <Text style={[small, light, uppercase]}>humidity: {data.main.humidity}%</Text>
                        </View>
                        <View style={[centerXY, {flex: 1}]}>
                            <Button
                                style={{ height: 60 }}
                                onPress={this.refreshWeather}
                                title="Refresh Weather"
                            />
                        </View>
                    </View>
                :
                    <View style={[container, centerXY]}>
                        <View>
                            {
                                error
                                ?
                                    <Text style={[ red, small, {paddingTop: 10} ]}>
                                        It's likely that your connection has been interrupted
                                    </Text>
                                :
                                    <Text style={[normal, light]}>Loading...</Text>
                            }
                        </View>
                    </View>
            }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    heading: {
        fontSize: 18,
        fontWeight: '300',
    },
    small: {
        fontSize: 12,
        
        paddingTop: 5,
    },
    display: {
        fontSize: 40,
    },
    normal: {
        fontSize: 14,
    },
    light: {
        color: '#666',
    },
    red: {
        color: '#EF5350',
    },
    centerXY: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    uppercase: {
        textTransform: 'uppercase',
    }
});

const mapStateToProps = state => ({
    weather: state.Weather,
});

const mapDispatchToProps = {
    getWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
