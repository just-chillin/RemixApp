import React, { Component } from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import Feed from "./src/components/Feed";
import HomePage from "./src/tabs/Home";


const skipLogin = true;

interface Props { navigation: { navigate: Function }; }

class AuthLoadingScreen extends Component<Props> {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 0
    }
  });

  constructor(props: Props) {
    super(props);
    AsyncStorage.getItem("auth").then(auth =>
      this.props.navigation.navigate(auth || skipLogin ? "App" : "Auth")
    );
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={this.styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const authStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: createBottomTabNavigator({
        Feed: Feed,
        Home: HomePage
      }),
      Auth: authStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
