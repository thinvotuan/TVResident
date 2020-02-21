import React, { Component } from 'react';
import { Button, Text, TextInput, View, AsyncStorage, ActivityIndicator, StyleSheet, StatusBar, Modal, TouchableOpacity, KeyboardAvoidingView, Image,
Dimensions, Alert } from 'react-native';
import {NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationEvents } from "react-navigation";

import {loginApi} from '../networking/Server.js';
import { fetchLogins } from '../storage/getLoginStorage';
import HighScores from '../components/HighScores';

import DuAnScreen from './DuAnScreen';
import DashboardScreen from './DashboardScreen';
import TienIchScreen from './TienIchScreen';
import PhanAnhScreen from './PhanAnhScreen';
import LoginScreen from './LoginScreen';
import LoginSavedScreen from './LoginSavedScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import AddPhanAnhScreen from './AddPhanAnhScreen';
import ViewPhanAnhScreen from './ViewPhanAnhScreen';

import NhanKhauScreen from './NhanKhauScreen';
import AddNhanKhauScreen from './AddNhanKhauScreen';
import ViewNhanKhauScreen from './ViewNhanKhauScreen';

import PhiThanhToanScreen from './PhiThanhToanScreen';
import ViewPhiThanhToanScreen from './ViewPhiThanhToanScreen';

import ChooseBlockScreen from './ChooseBlockScreen';
import ChooseTangScreen from './ChooseTangScreen';
import AddChiSoScreen from './AddChiSoScreen';

class ProfileScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {

      };
      this.init();
    }

  static navigationOptions = {
    header: null,
  };

  navigateToScreen = (route)  => {
      /* const navigateAction = NavigationActions.navigate({
         routeName: route,
       });
       this.props.navigation.dispatch(navigateAction);*/


        const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions:  [
                    NavigationActions.navigate({ routeName: route})
                  ]
        })
        this.props.navigation.dispatch(resetAction)
  }
  init(){
    this.initUserPassFromCache().done();
  }
  componentDidMount(){
    this.initUserPassFromCache().done();
  }
  
  initUserPassFromCache = async () => {
      let email = '';
      let savelogin = '';
      try
        {

          email = await AsyncStorage.getItem('username');
          savelogin = await AsyncStorage.getItem('savelogin');
          this.setState({ userName: email });
          if(JSON.stringify(email)=='' || email==null || email.length <=0 || email === undefined || email == '')
          {
            if(JSON.stringify(savelogin)=='' || savelogin==null || savelogin.length <=0 || savelogin === undefined || savelogin == '')
            {
              this.navigateToScreen('LoginScreen');
            }
            else {
              this.navigateToScreen('LoginSaved');
            }
          }
          else {
              this.navigateToScreen('DuAn');
          }
        }
      catch(error){
      }

  }


  render() {
    const stylesResponsive = StyleSheet.create({
     inputContainer: {
       backgroundColor: '#e1e1e1',
       borderRadius:30,
       width: Dimensions.get('window').width - 80,
       height:56,
       marginBottom:10,
       flexDirection: 'row',
       alignItems:'center',
       justifyContent: 'center',
     }
     });
    return (

      <View>
      </View>
    );
  }
}

const ProfileNavigator = createStackNavigator ({
  Profile: ProfileScreen,
  LoginScreen: LoginScreen,
  LoginSaved: LoginSavedScreen,
  ForgotPassword:ForgotPasswordScreen,
  DuAn: DuAnScreen,
  Dashboard: DashboardScreen,
  TienIch: TienIchScreen,
  PhanAnh: PhanAnhScreen,
  AddPhanAnh: AddPhanAnhScreen,
  ViewPhanAnh:ViewPhanAnhScreen,
  NhanKhau: NhanKhauScreen,
  AddNhanKhau: AddNhanKhauScreen,
  ViewNhanKhau: ViewNhanKhauScreen,
  PhiThanhToan: PhiThanhToanScreen,
  ViewPhiThanhToan: ViewPhiThanhToanScreen,
  ChooseBlock: ChooseBlockScreen,
  ChooseTang: ChooseTangScreen,
  AddChiSo:AddChiSoScreen,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
         backgroundColor:'rgba(170, 40, 41, 0.7)',
         padding: 20,
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    container_login: {
     padding: 20,
     fontFamily: "Nunito-Regular",
    },
    input:{
      height:56,
      flex:1,
      color: '#000',
      fontFamily: "Nunito-Regular",
      fontSize:17,
    },
    inputIcon:{
     width:30,
     height:30,
     marginLeft:15,
     justifyContent: 'center'
   },
    buttonContainer:{
        backgroundColor: '#2980b6',
        borderRadius:30,
        height:56,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: "Nunito-Regular",
        fontSize:20
    },
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    },
    btnLoginLinearGradient:{
      width:'100%',
      height:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:30
    },
    lblQuenMK:{
      color:'#fff',
      fontFamily:'Nunito-Regular',
      fontSize:16
    },
    wapperQuenMK:{
      alignItems: 'flex-end',
      marginTop:10
    },
    btnLoginLinearGradient:{
      width:'100%',
      height:'100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:30
    },
    modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
    },
});
export default ProfileNavigator;
//export default connect(mapStateToProps, {})(ProfileScreen);
