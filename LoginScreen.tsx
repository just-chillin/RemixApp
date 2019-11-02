import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import RESTService from './RESTService'

let username: string;
let password: string;

export default class LoginScreen extends Component {
    username: string;
    password: string;

    constructor(props) {
        super(props);
    }

    render = () =>
        <View style={styles.container}>
            <Text>Welcome to Remix!</Text>
            <TextInput placeholder='email' onChangeText={evt=>this.setState({email: evt.target.value})}></TextInput>
            <TextInput placeholder='password' onChangeText={evt=>this.setState({password: evt.target.value})}></TextInput>
            <Button onPress={this.login} title='Login' />
            <Button onPress={this.goToRegisterPage} title='Register' />
        </View>;

    login = () => RESTService.login(this.state.username, this.state.password).then(res => AsyncStorage.setItem(this.state.email, res));
    goToRegisterPage = () => this.props.navigation.navigate('Register');
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
