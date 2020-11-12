import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header.js';
import Home from '../screens/home';
import stockProfile from '../screens/stockProfile';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Home' navigation={navigation} />
      }
    },
  },
  stockProfile: {
    screen: stockProfile,
    navigationOptions: {
      title: 'stock Profile',
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
