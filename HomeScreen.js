import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getWeather } from './actions';

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            latitude: 0,
            longitude: 0,
            error: null,
        };
    }

    componentDidMount = () => {
        this.getGeolocation();
        // this.refreshWeather();
    }

    refreshWeather = () => {        
        this.props.getWeather(this.state);
    }

    getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
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
        const { weather } = this.state;
        const { container, dataContainer, temperature, buttonContainer } = styles;

        console.log('weather: ', weather);

        return (
            <View style={container}>
                <View style={dataContainer}>
                    <Text style={temperature}>22 &#8451;</Text>
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
    temperature: {
        fontSize: 40,
    }
});

const mapStateToProps = state => ({
    weather: state,
});

const mapDispatchToProps = {
    getWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
