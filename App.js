import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './HomeScreen';

class App extends React.Component
{
    render() {
        return (
            <Provider store={ store }>
                <HomeScreen />
            </Provider>
        )
    }
}

export default App