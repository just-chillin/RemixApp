import React from "react";
import Feed from "./src/components/Feed";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


console.log('Application Running!');

const skipLogin = true;

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Feed"
          component={Feed}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default App;
