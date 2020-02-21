import React, { Component } from 'react';
import {
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage,
  Alert,
  Modal,
  ActivityIndicator,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import {NavigationActions, StackActions } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/Ionicons';

import i18n from '../i18n';
import { Button } from '../components/common';

const { height, width } = Dimensions.get('window')

import LanguageSelectorScreen from './LanguageSelectorScreen';
import AboutScreen from './AboutScreen';
import InformationScreen from './InformationScreen';
import FormsScreen from './FormsScreen';
import ViewFormScreen from './ViewFormScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import { loadSettings, saveSettings } from '../storage/settingsStorage';
import SettingsList from '../components/SettingsList';

import { NavigationEvents } from "react-navigation";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.props = props;
    this.state =
    {
      name: '',
      locale: 'vi',
      userName:'',
      showAlert: false,
      isLoading: false,
      isRefreshing: false,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.initUserPassFromCache().done();
    this.setState(initialState);
    const initialState = await loadSettings();

  }

  initUserPassFromCache = async () => {
      try{
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          this.setState({ userName: value });
        }
     }
      catch(error){}

  }
  componentDidUpdate(prevProps, prevState) {
    const locale = this.props.navigation.getParam('locale', null);
    if (locale && prevState.locale !== locale) {
      i18n.locale = locale;
      this.setState({ locale });
    }
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  handleSubmit() {
    saveSettings(this.state);
  }

  dangXuatHeThong() {
    this.setState({
      showAlert: true
    });
  }
  doiMatKhau(){

  }
  confimrDangXuatHeThong() {
        this.setState({
          showAlert: false
        });
        this.setState({isLoading: true});
        setTimeout(() => {
          this.setState({isLoading: false});

          AsyncStorage.removeItem('username');
          this.setState({ userName: '' });

         const navigateAction = NavigationActions.navigate({
           routeName: 'Profile',
           action: NavigationActions.navigate({ routeName: 'Profile' }),
         });
         this.props.navigation.dispatch(navigateAction);

       }, 1000);
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  render() {
    const currentLocale = this.state.locale;
    const { navigation } = this.props;
    const {showAlert} = this.state.showAlert;
    let wapper_login_view='';
    const wapper_login = (<View style={[styles.buttonContainer, styles.button_dangnhap]}>
      <TouchableOpacity
        style={[styles.listItem, styles.item_line]}
        onPress={() => this.props.navigation.navigate('ChangePassword')}
      >
        <Icon style={[styles.icon_left,{color:'blue'}]} name="ios-lock" size={28} />
        <Text style={styles.listItemText}>{i18n.t('settings.change_password')}</Text>
        <Icon style={styles.icon} name="ios-arrow-forward" size={23} />
        </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listItem, styles.item_last]}
        onPress={() => {this.dangXuatHeThong()}}
      >
        <Icon style={[styles.icon_left,{color:'red'}]} name="md-log-out" size={28} />
        <Text style={styles.listItemText}>{i18n.t('settings.logout')}</Text>
        <Icon style={styles.icon} name="ios-arrow-forward" size={23} />
      </TouchableOpacity>
    </View>);

    if(this.state.userName!=='')
    {
      wapper_login_view = wapper_login
    }
    else {
      wapper_login_view = ''
    }
    return (
      <View style={styles.container}>
      <NavigationEvents
         onDidFocus ={payload => {
           this.initUserPassFromCache().done();
         }}
       />
        <ScrollView style={{ flex: 1, flexDirection: 'column' }}
        refreshControl={
          <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
        }>
        <View style={styles.container_logo}>
            <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResident_white.png')} />
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.title_user}>{i18n.t('list_more.welcome')}, <Text style={styles.title_user_name}>{this.state.userName!=='' ? this.state.userName: 'Khách' }</Text></Text>
        </View>
          <View style={[styles.inputContainer]}>
            <View style={styles.buttonContainer}>
              <SettingsList
                onPressItem={(screen) => navigation.navigate(screen, { currentLocale })}
              />
            </View>
            {this.state.userName!=='' && wapper_login_view}
          </View>

        </ScrollView>
        <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title=""
            message={i18n.t('list_more.title_signout')}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText={i18n.t('list_more.cancel')}
            confirmText={i18n.t('list_more.confrim_signout')}
            confirmButtonColor="#AA2829"
            cancelButtonColor= "#AAAAAA"
            titleStyle={{fontSize:20,fontFamily: 'Nunito-Regular',color:'#000' }}
            messageStyle={{fontSize:20,fontFamily: 'Nunito-Bold', textAlign:'center', color:'#000' }}
            cancelButtonTextStyle={{fontSize:20,fontFamily: 'Nunito-Regular'}}
            confirmButtonTextStyle={{fontSize:20,fontFamily: 'Nunito-Regular'}}
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.confimrDangXuatHeThong();
            }}
          />
          <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
              <Modal transparent={true} animationType={'none'}
                  visible={this.state.isLoading}>
                  <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                      <ActivityIndicator
                        animating={this.state.isLoading} size="large" />
                    </View>
                  </View>
                </Modal>
          </View>
      </View>
    );
  }
}

const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen,
  LanguageSelector: LanguageSelectorScreen,
  About: AboutScreen,
  Information:InformationScreen,
  Forms:FormsScreen,
  ViewForm:ViewFormScreen,
  ChangePassword:ChangePasswordScreen
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container_logo:{
    flex: 1,
    width:'100%',
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#AA2829'
  },
  wapper_img:{
    position: 'absolute',
    width:'100%',
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#efefef',
    height:60,
  },
  logo: {
    flex:1,
    width: '40%',
    resizeMode: 'contain',
  },
  inputContainer: {
    paddingTop: 10,
    paddingBottom:10
  },
  title_user:{
    fontWeight: '600',
    color:'#337ab7',
    fontFamily: "Nunito-Regular",
    fontSize:18,
    paddingLeft: 20,
    paddingRight: 20
  },
  title_user_name:{
    fontFamily: "Nunito-Bold",
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom:15
  },
  listItemText: {
    fontSize: 18,
    color: '#434343',
    width:'90%',
    fontFamily: "Nunito-Regular",
  },
  icon: {
    color: '#CCCCCC',
  },
  modalBackground: {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: '#00000040'
  },
  buttonContainer:{
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    elevation: 5,
    borderRadius:4,
    borderColor:'#ddd',
    borderWidth:0.5,
    backgroundColor:'#fff',
    marginLeft:10,
    marginRight:10,
    paddingLeft:10,
    paddingRight:10
  },
  button_dangnhap:{
    marginTop:20
  },
  icon_left:{
    width:23,
    textAlign:'center',
    marginRight:5
  },
  item_line:{
    borderBottomWidth:1,
    borderColor:'#ddd'
  }
});

export default SettingsNavigator;
