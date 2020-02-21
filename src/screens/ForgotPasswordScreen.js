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
      onPress={() => props.navigation.navigate('Profile')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Profile')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>{i18n.t('settings.forgot_password')}</Text>
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
  class ForgotPasswordScreen extends React.Component {
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
          email:'',
          isLoading:false,
        };
      }

      DoiMatKhau(){
          this.setState({isLoading:true})
      }

    render() {
      return (
        <View style={{flex: 1}}>
        <ScrollView style={styles.container_scroll}>
            <KeyboardAvoidingView style={styles.container}>
              <View style={styles.wapper_form}>
                <Text style={styles.mess_forgot_password}>{i18n.t('settings.mess_forgot_password')}</Text>
                <Text style={styles.title_form}>E-mail</Text>
                <View style={styles.input_wapper}>
                  <TextInput style = {[styles.input]}
                              autoCapitalize="none"
                              autoCorrect={false}
                              returnKeyType="next"
                              placeholder=''
                              placeholderTextColor='#595959'
                              underlineColorAndroid="transparent"
                              onChangeText={(email) => this.setState({email})}
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
    },
    mess_forgot_password:{
      fontFamily: "Nunito-Regular",
      marginBottom:15,
      fontSize:16
    }
  }
export default ForgotPasswordScreen;
