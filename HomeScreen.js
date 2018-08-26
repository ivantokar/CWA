import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getWeather } from './actions';
import { KELVIN } from './constants';
import Moment from 'moment';

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
        };
    }

    componentDidMount = () => {
        this.refreshWeather();
    }

    refreshWeather = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });

                this.props.getWeather(this.state);
            },
            (error) => this.setState({
                    error: error.message
                }), {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    render() {
        const { error } = this.state;
        const { dt, main, name  } = this.props.data;
        const {
            container,
            headerContainer,
            headerText,
            headerDateText,
            headerCityText,
            dataContainer,
            temperatureText,
            humidityText,
            buttonContainer
        } = styles;
        
        return (
            <View style={container}>
                <View style={headerContainer}>
                    <Text style={headerText}>Weather at your location</Text>
                    <Text style={headerDateText}>
                        {
                            Moment(new Date(dt * 1000)).format('LLLL')
                        }
                    </Text>
                    <Text style={headerCityText}>{ name }</Text>
                </View>
                <View style={dataContainer}>
                    <Text style={temperatureText}>
                    { 
                        Math.round(main.temp - KELVIN)
                    }
                    &#8451;
                    </Text>
                    <Text style={humidityText}>humidity: { main.humidity }%</Text>
                </View>
                <View style={buttonContainer}>
                    <Button
                        onPress={this.refreshWeather}
                        title="Refresh Weather"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    headerContainer: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '300',
    },
    headerDateText: {
        fontSize: 12,
        color: '#666',
        paddingTop: 5,
    },
    headerCityText: {
        paddingTop: 10,
    },
    dataContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperatureText: {
        fontSize: 40,
    },
    humidityText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase'
    }
});

const mapStateToProps = state => ({
    data: state.Weather,
});

const mapDispatchToProps = {
    getWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
