import React from 'react';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen }
})

const App = createAppContainer(MainNavigator);

export default App;