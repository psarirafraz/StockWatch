import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header.js';
import NormalHeader from '../shared/NormalHeader.js';
import ProfileHeader from '../shared/ProfileHeader.js';
import Home from '../screens/home';
import StockProfile, {Symbol} from '../screens/StockProfile';
import FromWhen from '../screens/FromWhen';
import UntilWhen from '../screens/UntilWhen';
import NotificationInput from '../screens/NotificationInput';
import ChooseNotificationType from '../screens/ChooseNotificationType';
import dividendAnalysis from '../screens/dividendAnalysis';

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
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <ProfileHeader title={navigation.getParam('symbol')} navigation={navigation}/>
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
  NotificationInput: {
    screen: NotificationInput,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <NormalHeader title={navigation.getParam('notificationType')} />
      }
    },
  },
  ChooseNotificationType: {
    screen: ChooseNotificationType,
    navigationOptions: {
      title: 'Notification',
    }
  },
  dividendAnalysis: {
    screen: dividendAnalysis,
    navigationOptions: {
      title: 'Dividend Analysis',
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#000', height: 60}
  }
});

export default HomeStack;
