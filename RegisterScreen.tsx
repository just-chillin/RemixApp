import React, { Component } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import RESTService from "./RESTService";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Props {
  navigation: { navigate: { (arg0: string): void; (arg0: string): void } };
}

interface State {
  email: string;
  password: string;
  handle: string;
  error: string;
}

export default class RegisterScreen extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      handle: "",
      error: "Here are where the errors should go, if there are any."
    };
  }

  render = () => (
    <View style={styles.container}>
      <Text style={styles.error}>{this.state.error}</Text>
      <TextInput
        placeholder='Email'
        onChangeText={v => this.setState({ email: v })}
      ></TextInput>
      <TextInput
        placeholder='Password'
        onChangeText={v => this.setState({ password: v })}
      ></TextInput>
      <TextInput
        placeholder='Handle'
        onChangeText={v => this.setState({ handle: v })}
      ></TextInput>
      <Button onPress={this.onRegisterClicked} title='Register'></Button>
      <Button onPress={this.cancel} title='Cancel'></Button>
    </View>
  );

  static validHandle = handle => handle !== "";
  static validPassword = password => password !== "";
  static validEmail = email => email !== "" && EMAIL_REGEX.test(email);

  onRegisterClicked = () => {
    const email = this.state.email;
    const password = this.state.password;
    const handle = this.state.handle;
    if (!RegisterScreen.validEmail(email)) {
      this.setState({ error: "Invalid email" });
      return;
    } else if (!RegisterScreen.validPassword(password)) {
      this.setState({ error: "Invalid password" });
      return;
    } else if (!RegisterScreen.validHandle(handle)) {
      this.setState({ error: "Invalid handle" });
      return;
    }
    RESTService.register(
      this.state.email,
      this.state.password,
      this.state.handle
    ).then(() => {
      console.debug("HIT IT");
      this.cancel();
    });
  };

  cancel = () => this.props.navigation.navigate("Login");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "red"
  }
});
