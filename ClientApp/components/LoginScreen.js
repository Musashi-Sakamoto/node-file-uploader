import React from 'react';
import Axios from 'axios';
import { Button, TextInput, View } from 'react-native';


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = { name: '', password: '' };
  }

  onPressClicked = async () => {
    if (this.state.name !== '' && this.state.password !== '') {
      let result;
      try {
        result = await Axios.post('http://localhost:3000/api/v1/login', {
          username: this.state.name,
          password: this.state.password,
        });
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
      console.log('====================================');
      console.log(result);
      console.log('====================================');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="username"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="password"
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="Login"
          onPress={() => navigate('Main', { name: 'Jane' })}
        />
      </View>
    );
  }
}

export default LoginScreen;
