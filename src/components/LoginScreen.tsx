import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import RESTService from "../RESTService";
import base64 from "react-native-base64";

interface Props {
  navigation: any;
}

interface State {
  email: string;
  password: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column"
  },
  loading: {
    display: "none",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center"
  }
});

export default class LoginScreen extends Component<Props, State> {
  // Boolean that determines if this component should auto login the user. Should never be false in production.
  shouldAutoLogin = true;

  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    if (this.shouldAutoLogin) {
      AsyncStorage.getItem("auth").then(res => {
        if (res !== null) {
          console.log(
            `BEARER TOKEN ${res} FOUND! The component should auto login here.`
          );
          this.goToApp();
        } else {
          console.log("Did not find bearer token.");
        }
      });
    }
  }

  render = () => (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        style={styles.loading}
      ></ActivityIndicator>
      <Text>Welcome to Remix!</Text>
      <TextInput
        placeholder="email"
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={v => this.setState({ email: v })}
      ></TextInput>
      <TextInput
        placeholder="password"
        autoCompleteType="password"
        secureTextEntry={true}
        onChangeText={v => this.setState({ password: v })}
      ></TextInput>
      <Button onPress={this.login} title="Login" />
      <Button onPress={this.goToRegisterPage} title="Register" />
      <Button onPress={RESTService.test} title="Debug API Connection" />
    </View>
  );

  /**
   * Validates the user's credentials against the api, and if they are valid, saves the auth token to AsyncStorage and navigates to the user's video feed.
   */
  login = () =>
    Promise.resolve(
      RESTService.validateCredentials(this.state.email, this.state.password)
        .then(res => {
          if (res.ok) {
            console.log("Login Successful!!!!");
            AsyncStorage.setItem(
              "auth",
              base64.encode(`${this.state.email}:${this.state.password}`)
            ).then(() => {
              console.log("saved auth code!");
            });
            this.goToApp();
          } else {
            console.log("Login failed!");
          }
        })
        .catch(console.error)
    );

  // Navigates to the register page.
  goToRegisterPage = () => this.props.navigation.navigate("Register");

  // Navigates to the user's feed page.
  goToApp = () => this.props.navigation.navigate("Feed");
}
