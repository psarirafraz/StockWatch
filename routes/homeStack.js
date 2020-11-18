import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header.js';
import Home from '../screens/home';
import FromWhen from '../screens/FromWhen';
import UntilWhen from '../screens/UntilWhen';
import ChooseNotif from '../screens/ChooseNotif';
import InputStop from '../screens/InputStop';
import InputLimit from '../screens/InputLimit';

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
  InputStop: {
    screen: InputStop,
    navigationOptions: {
      title: 'Set the Stop Price',
    }
  },
  InputLimit: {
    screen: InputLimit,
    navigationOptions: {
      title: 'Set the Limit Price',
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
