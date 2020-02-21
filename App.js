import React from 'react';
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
import reducers from './src/reducers';

import i18n from './src/i18n';

import AppNavigator from './src/screens/AppNavigator';
/*
import HomeScreen from './src/screens/HomeScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HighScoresScreen from './src/screens/HighScoresScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';


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

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

const InitialLoginNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppLoginNavigator
});

const AppContainer = createAppContainer(InitialNavigator);
const AppLoginContainer = createAppContainer(InitialLoginNavigator);

class App extends React.Component {

  state = {
    userName: '',
  };

  async componentWillMount (){
    this.initUserPassFromCache().done();
  }
  async componentDidMount (){
    this.initUserPassFromCache().done();
  }

  initUserPassFromCache = async () => {
      let email = '';
      try
        {
          email = await AsyncStorage.getItem('username');
          this.setState({ userName: email });
        }
      catch(error){
      }

  }

  render() {
    if(JSON.stringify(this.state.userName)=='' || this.state.userName==null || this.state.userName.length <=0 || this.state.userName === undefined || this.state.userName == '')
    {
      return (

            <Provider store={createStore(reducers)}>
              <AppContainer />
            </Provider>
      );
    }
    else {
      return (

            <Provider store={createStore(reducers)}>
              <AppLoginContainer />
            </Provider>
      );
    }
  }
}

export default App;*/

export default class App extends React.Component {

  state = {
    userName: '',
  };
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
      let  user_Name = await AsyncStorage.getItem('username');
      if(JSON.stringify(user_Name)==='' || user_Name===null || user_Name.length <=0 || user_Name === undefined || user_Name === '')
      {
        user_Name = 'none_0';
      }
      this.setState('userName',user_Name);
  };

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppNavigator/>
      </Provider>
    );
  }
}
