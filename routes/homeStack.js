import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header.js';
import Home from '../screens/home';
import StockProfile from '../screens/StockProfile';
import FromWhen from '../screens/FromWhen';
import UntilWhen from '../screens/UntilWhen';
import NotificationInput from '../screens/NotificationInput';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Home' navigation={navigation} />
      }
    },
  },
  StockProfile: {
    screen: StockProfile,
    navigationOptions: {
      title: 'Stock Profile',
    }
  },
  FromWhen: {
    screen: FromWhen,
    navigationOptions: {
      title: 'From',
    }
  },
  UntilWhen: {
    screen: UntilWhen,
    navigationOptions: {
      title: 'Until',
    }
  },
  NotificationInput: {
    screen: NotificationInput,
    navigationOptions: {
      title: 'Set the Price',
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;
