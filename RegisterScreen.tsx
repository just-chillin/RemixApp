import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RESTService from './RESTService'
import LoginScreen from './LoginScreen'

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
    }

    render = () =>
        <View style={styles.container}>
            <TextInput placeholder='Email' onChangeText={v => this.setState({ email: v })}></TextInput>
            <TextInput placeholder='Password' onChangeText={v => this.setState({ password: v })}></TextInput>
            <TextInput placeholder='Confirm Password' onChangeText={v => this.setState({ confirmPassword: v })}></TextInput>
            <TextInput placeholder='Handle' onChangeText={v => this.setState({ handle: v })}></TextInput>
            <Button onPress={this.register} title='Register'></Button>
            <Button onPress={this.cancel} title='Cancel'></Button>
        </View>;

    register() {
        if (this.state.confirmPassword !== this.statet)
        RESTService.register(this.state.email, this.state.password, this.state.handle)
        .then(res => AsyncStorage.setItem('auth', res))
        .then(() => this.props.navigation.navigate('Login'));
    }

    cancel = () => this.props.navigation.navigate('Login');
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});