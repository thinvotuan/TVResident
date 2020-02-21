import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { connect } from 'react-redux';

import i18n from '../i18n';

import { username_login } from '../components/Auth/login_get';

import HomeScreen from './HomeScreen';
import PracticeScreen from './PracticeScreen';
import ResultsScreen from './ResultsScreen';
import HighScoresScreen from './HighScoresScreen';
import SettingsScreen from './SettingsScreen';
import SplashScreen from './SplashScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

const HomeNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Practice: PracticeScreen,
  Results: ResultsScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.home')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="home" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.profile_us')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="user" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },

    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.settings')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="info" size={horizontal ? 20 : 25} color={tintColor} />
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#AA2829',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const AppLoginNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.home')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="home" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.notification')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="bell" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.profile_us')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="user" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },

    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 12, color: tintColor, textAlign:'center',fontFamily: 'Nunito-Regular' }}>
            {i18n.t('navigation.more_app')}
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="grid" size={horizontal ? 20 : 25} color={tintColor} />
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#AA2829',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

let _username  =  username_login();

const NavMain = (_username === 'none_0') ? AppNavigator : AppLoginNavigator;

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: NavMain,
  AuthLoading: AuthLoadingScreen,
},
{
  initialRouteName: 'Splash',
}
);

const AppContainer = createAppContainer(InitialNavigator);

export default AppContainer;
