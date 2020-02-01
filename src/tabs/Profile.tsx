import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


export default class ProfilePage extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Connor you like big fat dick in your butt! You homo</Text>
        </View>
      );
    }
  }
  
const TabNavigator = createBottomTabNavigator({
    Profile : ProfilePage
});