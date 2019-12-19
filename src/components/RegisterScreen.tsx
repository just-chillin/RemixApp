import React, { Component } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import RESTService from "../RESTService";

// The 'official' email validation regular expression. Don't try and understand it.
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface Props {
  navigation;
}

interface State {
  email: string;
  password: string;
  handle: string; // The username that the user chooses to use
  error: string; // The error to display when the user tries to submit an invalid form.
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: 'column',
  },
  error: {
    color: "red"
  },
  button: {
    backgroundColor: 'blue',
    height:70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default class RegisterScreen extends Component<Props, State> {
  constructor(props: Props) {
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
        autoCompleteType="email"
        autoCapitalize="none"
        onChangeText={v => this.setState({ email: v })}
      ></TextInput>
      <TextInput
        placeholder='Password'
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={v => this.setState({ password: v })}
      ></TextInput>
      <TextInput
        placeholder='Handle'
        autoCapitalize="none"
        onChangeText={v => this.setState({ handle: v })}
      ></TextInput>
      <Button onPress={this.onRegisterClicked} title='Register'></Button>
      <Button onPress={this.cancel} title='Cancel'></Button>
    </View>
  );

  // Checks if the user's handle is valid.
  static validHandle = (handle: string) => handle !== "";
  // Checks if the user's password is valid.
  static validPassword = (password: string) => password !== "";
  // Checks if the email that the user has input is valid.
  static validEmail = (email: string) => email !== "" && EMAIL_REGEX.test(email);

  /**
   * Tells the api to register the user based on the data they put into the form.
   */
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
    Promise.resolve(RESTService.register(
      this.state.email,
      this.state.password,
      this.state.handle,
    ).then(this.cancel));
  };

  // Returns to the login screen. If the user has created a valid account it should then automatically log them in.
  cancel = () => this.props.navigation.navigate("Login");
}