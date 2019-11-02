import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RESTService from './RESTService'
import LoginScreen from './LoginScreen'

const restURL = 'localhost'



function RegisterScreen() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Email'></TextInput>
      <TextInput placeholder='Password'></TextInput>
      <TextInput placeholder='Confirm Password'></TextInput>
      <TextInput placeholder='Handle'></TextInput>
      <Button onPress={()=>{}} title='Register'></Button>
    </View>
  )
}

export default createAppContainer(createStackNavigator({
  Home: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
