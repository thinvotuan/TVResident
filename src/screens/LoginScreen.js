import React, { Component } from 'react';
import { Button, Text, TextInput, View, AsyncStorage, ActivityIndicator, StyleSheet, StatusBar, Modal, TouchableOpacity, KeyboardAvoidingView, Image,TouchableHighlight,
Dimensions, Alert,ImageBackground } from 'react-native';
import {NavigationActions, StackActions, SwitchActions  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import i18n from '../i18n';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackNavigator, DrawerNavigator } from 'react-navigation'

import {loginApi} from '../networking/Server.js';
import { fetchLogins } from '../storage/getLoginStorage';


class LoginScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        userName: 'BB19.15',
        userPass: '#ThuanViet123',
        token:'',
        saveLogin: '',
        isLoading: false,
        icEye: 'ios-eye-off',
        showPassword: true,
      };

    }

  static navigationOptions = {
    header: null,
  };

  navigateToScreen = (route)  => {
       /*const navigateAction = NavigationActions.navigate({
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
       this.props.navigation.dispatch(resetAction);
       //this.props.navigation.dispatch(SwitchActions.jumpTo({ routeName: route}));
  }


  quenMatKhau()
  {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ForgotPassword',
      action: NavigationActions.navigate({ routeName: 'ForgotPassword' }),
    });
    this.props.navigation.dispatch(navigateAction);
  }

  login = (email, pass) => {
   if((email === undefined || email == null || email.length <= 0)
     ||(pass === undefined || pass == null || pass.length <= 0)){
        Alert.alert('Thông báo','Vui lòng điền thông tin');
   }
   else{
     const params = {
       userName : email,
       userPass : pass,
       token:''
     };
     this.setState({isLoading: true});
     loginApi(params).then((result) => {

         if(result.UserName !== null){
           this.saveToCache(email);
           setTimeout(() => {
             this.setState({isLoading: false});
             this.navigateToScreen('DuAn');
           }, 1000);

         }
         else{
           this.setState({isLoading: false});
           Alert.alert('Thông báo','Tài khoản hoặc Mật khẩu không chính xác!');
         }

       });
   }
  }

  saveToCache = (email) => {
    AsyncStorage.setItem('username', email);
    AsyncStorage.setItem('savelogin', email);
  }

  changePwdType= () => {
    let newState;
    if (this.state.showPassword) {
        newState = {
            icEye: 'ios-eye',
            showPassword: false,
            userPass: this.state.userPass
        }
    } else {
        newState = {
            icEye: 'ios-eye-off',
            showPassword: true,
            userPass: this.state.userPass
        }
    }
    // set new state value
    this.setState(newState)
  };

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
          <ImageBackground source={require('../images/bgtv.png')} style={{width: '100%', height: '100%'}}>
          <KeyboardAvoidingView behavior="padding" style={styles.container} >
              <View style={styles.loginContainer}>
                  <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResident_white.png')} />
              </View>
              <View style={styles.container_login}>
                  <StatusBar barStyle="light-content"/>
                  <View style = {stylesResponsive.inputContainer}>
                      <Icon name="ios-person" size={25} color={'#000'} style={styles.inputIcon} />
                      <TextInput style = {styles.input}
                                  autoCapitalize="none"
                                  onSubmitEditing={() => this.passwordInput.focus()}
                                  autoCorrect={false}
                                  //keyboardType='email-address'
                                  returnKeyType="next"
                                  placeholder={i18n.t('list_more.name_login')}
                                  placeholderTextColor='#a0a0a0'
                                  value={this.state.userName}
                                  onChangeText={(userName) => this.setState({userName})}
                                  />
                  </View>
                  <View style = {stylesResponsive.inputContainer}>
                      <Icon name="ios-lock" size={25} color={'#000'} style={styles.inputIcon} />
                      <TextInput style = {styles.input}
                                 returnKeyType="go" ref={(input)=> this.passwordInput = input}
                                 placeholder={i18n.t('list_more.password_login')}
                                 placeholderTextColor='#a0a0a0'
                                 onChangeText={(userPass) => this.setState({userPass})}
                                 value={this.state.userPass}
                                 secureTextEntry = {this.state.showPassword}
                                 />
                       <Icon style={styles.icon}
                             name={this.state.icEye}
                             size={30}
                             color='#AA2829'
                             onPress={this.changePwdType}
                         />
                  </View>
                   <TouchableHighlight underlayColor="transparent" style={styles.buttonContainer}  onPress = {() => {
                     this.login(this.state.userName, this.state.userPass)
                    }}>
                      <LinearGradient colors={['#AA2829', '#BB3029']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.btnLoginLinearGradient}>
                        <Text  style={styles.buttonText}>{i18n.t('list_more.login_text')}</Text>
                      </LinearGradient>
                  </TouchableHighlight>

                  <TouchableOpacity style={styles.wapperQuenMK}  onPress={this.quenMatKhau.bind(this)}>
                     <Text  style={styles.lblQuenMK}>{i18n.t('settings.forgot_password')}</Text>
                  </TouchableOpacity>

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
          </KeyboardAvoidingView>
          </ImageBackground>
        );

  }
}



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
        fontFamily: "Nunito-Bold",
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
    wapperThoatTK:{
      alignItems: 'flex-end',
      marginTop:10,
      textAlign:'right'
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
  icon: {
      position: 'absolute',
      top: 0,
      right: 0,
      width:48,
      textAlign:'center',
      height:48,
      lineHeight:55
  }
});
export default LoginScreen;
