import React from 'react';
import { Button } from 'react-native';


class LoginScreen extends React.Component {
    static navigationOptions = {
      title: 'Login',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Main', {name: 'Jane'})}
        />
      );
    }
  }

export default LoginScreen;