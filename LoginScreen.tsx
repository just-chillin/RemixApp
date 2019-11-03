import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import RESTService from "./RESTService";

interface Props {
  navigation: { navigate: { (arg0: string): void; (arg0: string): void } };
}

interface State {
  email: string;
  password: string;
}

export default class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentWillMount = () => AsyncStorage.getItem('auth').then(res => {
    if (res !== null) {
      console.warn(`BEARER TOKEN ${res} FOUND! The component should auto login here.`);
    } else {
      console.warn('Did not find bearer token.')
    }
  });

  render = () =>
    <View style={styles.container}>
      <Text>Welcome to Remix!</Text>
      <TextInput
        placeholder='email'
        onChangeText={v => this.setState({ email: v })}
      ></TextInput>
      <TextInput
        placeholder='password'
        onChangeText={v => this.setState({ password: v })}
      ></TextInput>
      <Button onPress={this.login} title='Login' />
      <Button onPress={this.goToRegisterPage} title='Register' />
      <Button onPress={RESTService.test} title='Debug API Connection' />
    </View>;

  login = () => RESTService.validateLogin(this.state.email, this.state.password);

  goToRegisterPage = () => this.props.navigation.navigate("Register");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
