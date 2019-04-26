import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
