import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,
  SafeAreaView, KeyboardAvoidingView,ActivityIndicator,
  Modal,
  Switch
 } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Settings')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Settings')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>{i18n.t('settings.change_password')}</Text>
    </TouchableHighlight>

  </View>
);

const ImageHeader = props => (
    <View style={styles.container_logo}>
        <View style={styles.wapper_img}>
            <Image
              style={styles.logo}
              source={require('../images/TVResident_color.png')}
            />
        </View>
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );
  class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
      headerTitleStyle: { color: '#fff' },
      header: (props) => <ImageHeader {...props} />,
      headerRight: null,
      headerLeft: null,
    };

    constructor(props){
        super();
        this.props = props;
        this.state = {
          current_password:'',
          new_password:'',
          confirm_new_password:'',
          isLoading:false,
          icEye_current: 'ios-eye-off',
          icEye_new: 'ios-eye-off',
          icEye_confirm: 'ios-eye-off',
          current_showPassword: true,
          new_showPassword: true,
          confirm_showPassword: true
        };
        this.toggleSwitch = this.toggleSwitch.bind(this);
      }
      toggleSwitch() {
          this.setState({ showPassword: !this.state.showPassword });
        }
      componentDidMount(){

      }
      DoiMatKhau(){
          this.setState({isLoading:true})
      }
      changePwdType_current = () => {
        let newState;
        if (this.state.current_showPassword) {
            newState = {
                icEye_current: 'ios-eye',
                current_showPassword: false,
                current_password: this.state.current_password
            }
        } else {
            newState = {
                icEye_current: 'ios-eye-off',
                current_showPassword: true,
                current_password: this.state.current_password
            }
        }
        // set new state value
        this.setState(newState)
    };

    changePwdType_new = () => {
      let newState;
      if (this.state.new_showPassword) {
          newState = {
              icEye_new: 'ios-eye',
              new_showPassword: false,
              new_password: this.state.new_password
          }
      } else {
          newState = {
              icEye_new: 'ios-eye-off',
              new_showPassword: true,
              new_password: this.state.new_password
          }
      }
      // set new state value
      this.setState(newState)
  };

  changePwdType_confirm = () => {
    let newState;
    if (this.state.confirm_showPassword) {
        newState = {
            icEye_confirm: 'ios-eye',
            confirm_showPassword: false,
            confirm_new_password: this.state.confirm_new_password
        }
    } else {
        newState = {
            icEye_confirm: 'ios-eye-off',
            confirm_showPassword: true,
            confirm_new_password: this.state.confirm_new_password
        }
    }
    // set new state value
    this.setState(newState)
};

    render() {
      const { search } = this.state;
      return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.container_scroll} >
            <KeyboardAvoidingView style={styles.container}>
              <View style={styles.wapper_form}>
                <Text style={styles.title_form}>{i18n.t('settings.current_password')}</Text>
                <View style={styles.input_wapper}>
                  <TextInput style = {[styles.input]}
                              autoCapitalize="none"
                              autoCorrect={false}
                              returnKeyType="next"
                              placeholder=''
                              placeholderTextColor='#595959'
                              underlineColorAndroid="transparent"
                              onChangeText={(current_password) => this.setState({current_password})}
                              secureTextEntry={this.state.current_showPassword}
                  />
                  <Icon style={styles.icon}
                        name={this.state.icEye_current}
                        size={30}
                        color='#AA2829'
                        onPress={this.changePwdType_current}
                    />
                </View>
                <Text style={styles.title_form}>{i18n.t('settings.new_password')}</Text>
                <View style={styles.input_wapper}>
                  <TextInput style = {[styles.input]}
                              autoCapitalize="none"
                              autoCorrect={false}
                              returnKeyType="next"
                              placeholder=''
                              placeholderTextColor='#595959'
                              underlineColorAndroid="transparent"
                              onChangeText={(new_password) => this.setState({new_password})}
                              secureTextEntry={this.state.new_showPassword}
                  />
                  <Icon style={styles.icon}
                        name={this.state.icEye_new}
                        size={30}
                        color='#AA2829'
                        onPress={this.changePwdType_new}
                    />
                </View>
                <Text style={styles.title_form}>{i18n.t('settings.confirm_new_password')}</Text>
                <View style={styles.input_wapper}>
                  <TextInput style = {[styles.input]}
                              autoCapitalize="none"
                              autoCorrect={false}
                              returnKeyType="next"
                              placeholder=''
                              placeholderTextColor='#595959'
                              underlineColorAndroid="transparent"
                              onChangeText={(confirm_new_password) => this.setState({confirm_new_password})}
                              secureTextEntry={this.state.confirm_showPassword}
                  />
                  <Icon style={styles.icon}
                        name={this.state.icEye_confirm}
                        size={30}
                        color='#AA2829'
                        onPress={this.changePwdType_confirm}
                    />
                </View>
              </View>
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
            </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.btn_wapper}>
            <TouchableHighlight
              style={styles.btn_gui}
              onPress={() => this.DoiMatKhau()} underlayColor="transparent">
                <Text style={styles.text_send}>{i18n.t('list_more.confrim_signout')}</Text>
            </TouchableHighlight>
        </View>
        </View>


      );
    }
  }

  const styles = {
    container_scroll:{
      backgroundColor:'#fff'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      fontFamily: "Nunito-Regular",
      backgroundColor:'#fff',
      padding:10,
      position:'relative'
    },
    container_logo:{
      width:'100%',
      height:125,
      backgroundColor:'#AA2829',
      position:'relative'
    },
    wapper_img:{
      position: 'absolute',
      width:'100%',
      flex:1,
      justifyContent: 'center',
      backgroundColor:'#efefef',
      height:70,
    },
    logo: {
      width: 240,
      height:80,
      resizeMode: 'contain',
      top:0,
      left: width / 2 - 120,

    },

    back_icon:{
      color:'#fff',
      fontWeight:'bold',
      marginTop:5
    },
    wapper_title_main:{
      paddingLeft:30
    },
    container_list:{
      marginLeft:10,
      marginBottom:10,
      marginRight:10
    },
    input:{
        backgroundColor:'#d6dce5',
        borderRadius:5,
        fontSize:16,
        padding:10,
        fontFamily: "Nunito-Regular",
        width:'100%',
        marginBottom:15
    },
    input_wapper:{
      marginBottom:10
    },
    title_form:{
      marginBottom:5,
      fontFamily: "Nunito-Bold",
      fontSize:16,
    },
    btn_wapper:{
      padding:10,
    },
    btn_gui:{
      backgroundColor:'#aa2829',
      padding:15,
      borderRadius:50,
      textAlign:'center',
      marginLeft:'auto',
      width: '100%'
    },
    text_send:{
      fontFamily: "Nunito-Bold",
      fontSize:16,
      color:'#fff',
      textAlign:'center'
    },
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    input_wapper:{
      flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        width:48,
        textAlign:'center',
        height:48,
        lineHeight:48
    }
  }
export default ChangePasswordScreen;
