import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Feed from './Feed';

const routeConfigs = {
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Feed: {
    screen: Feed,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false,
    },
  },
};

const stackNavigatorConfig = {
  
};

export default createAppContainer(createStackNavigator(routeConfigs, stackNavigatorConfig));