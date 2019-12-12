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
import RESTService from "./RESTService";
import base64 from "react-native-base64";

const btoa = base64.encode;

interface Props {
  navigation: any;
}

interface State {
  email: string;
  password: string;
}

export default class LoginScreen extends Component<Props, State> {
  shouldAutoLogin = true;

  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    AsyncStorage.getItem("auth").then(res => {
      if (res !== null && this.shouldAutoLogin) {
        console.log(
          `BEARER TOKEN ${res} FOUND! The component should auto login here.`
        );
        this.goToApp();
      } else {
        console.log("Did not find bearer token.");
      }
    });
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

  login = () =>
    Promise.resolve(
      RESTService.validateCredentials(this.state.email, this.state.password)
        .then(res => {
          if (res.ok) {
            console.log("Login Successful!!!!");
            AsyncStorage.setItem(
              "auth",
              btoa(`${this.state.email}:${this.state.password}`)
            ).then(() => {
              console.log("saved auth code!");
              this.goToApp();
            });
          } else {
            console.log("Login failed!");
          }
        })
        .catch(console.error)
    );

  goToRegisterPage = () => this.props.navigation.navigate("Register");
  goToApp = () => this.props.navigation.navigate("Feed");
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
