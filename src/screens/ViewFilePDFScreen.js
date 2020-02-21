import React , { Component }  from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight, Dimensions,StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import i18n from '../i18n';
import WebView  from 'react-native-webview';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')
import ViewFilePDF from '../components/ViewFilePDF';

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
<Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết</Text>
    </TouchableHighlight>

  </View>
);
//<View style={styles.wapper_title_main}>
  //<Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết</Text>
//</View>
const ImageHeader = (props) => (
    <View style={styles.container_logo}>
        <View style={styles.wapper_img}>
            <Image
              style={styles.logo}
              source={require('../images/logo.png')}
              //source={{uri:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'}}
            />
        </View>
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );


class ViewFilePDFScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitleStyle: { color: '#fff' },      
      headerRight: null,
      headerLeft: null,
      header: (props) => 

      <ImageHeader {...props} tenfile={navigation.state.params.tenFile} />
        /*<View style={styles.container_logo}>
            <View style={styles.wapper_img}>
                <Image
                  style={styles.logo}
                  source={require('../images/logo.png')}
                />
            </View>
          <Header {...props} tenfile={navigation.state.params.tenFile} style={{ backgroundColor: 'transparent' }}/>
        </View>*/

    };
};


  constructor(props){
      super();
      this.props = props;
      this.state = {
        TenFile: this.props.navigation.getParam('tenFile'),
        TieuDeFile: this.props.navigation.getParam('tieuDeFile'),
      };
    }
    
    componentDidMount(){
      
    }


  render(){
    return (
      
        <View style={{flex: 1, padding:10}}>
          <ViewFilePDF tenFile = {this.state.TenFile} w={width} h={height} />
        </View>
        
    )
  }
}

const webViewStyle = StyleSheet.create({ 
  a: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  p: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  li: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  em: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  strong: {
    fontFamily: "Nunito-Bold",
    lineHeight:23,
    fontSize: 16,
  },
  u: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
 });

const styles = {
  container_scroll:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    fontFamily: "Nunito-Regular",
    backgroundColor:'#fff',
    padding:10
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
    paddingLeft:50,
  },
  wapper_description:{
    paddingLeft:20,
    marginTop:10
  }
  ,wapper_file:{
    flex:1,
    width:width,
    height:height/2
  }
}

export default ViewFilePDFScreen;
