import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header.js';
import Home from '../screens/home';
import FromWhen from '../screens/FromWhen';
import UntilWhen from '../screens/UntilWhen';
import ChooseNotif from '../screens/ChooseNotif';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Home' navigation={navigation} />
      }
    },
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
  ChooseNotif: {
    screen: ChooseNotif,
    navigationOptions: {
      title: 'Choose Notification',
    }
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;
