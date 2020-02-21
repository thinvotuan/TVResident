  import React , { Component }  from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import i18n from '../i18n';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'

import { GiftedChat } from 'react-native-gifted-chat';

const { height, width } = Dimensions.get('window')

const user = {
  _id: 1,
  name: 'Developer',
}
const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('PhanAnh')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('PhanAnh')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Thông tin trao đổi</Text>
    </TouchableHighlight>

  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Trao đổi</Text>
</View>*/
const ImageHeader = props => (
    <View style={styles.container_logo}>
        <View style={styles.wapper_img}>
            <Image
              style={styles.logo}
              source={require('../images/logo.png')}
            />
        </View>
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );


class ViewPhanAnhScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { color: '#fff' },
    header: (props) => <ImageHeader {...props} />,
    headerRight: null,
    headerLeft: null,
  };

    state = {
      messages: [],
    };
  constructor(props){
      super();
      this.props = props;
      this.state = {
        idthis: this.props.navigation.getParam('id'),
        title:'',
      };
    }

    componentDidMount(){
      this.setState({
            messages: [
              {
                  _id: 3,
                  text: 'Xin cảm ơn quý cư dân đã phản hồi, chúng tôi sẽ kiểm tra và phản hồi. Xin cảm ơn',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'BQL',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                    _id:2,
                    text: 'Hiện tại tôi vẫn thấy cánh cửa vẫn chưa được sửa chữa. Kính mong ban quản lý cho người sửa gấp. Xin cảm ơn',
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                      name: 'BB19.15',
                      avatar: 'https://placeimg.com/140/140/any',
                    },
                  },
                {
                    _id: 1,
                    text: 'Sửa chữa cửa thoát hiểm Bali tầng 18, và mất nút thang máy sảnh Babylon 2',
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                      name: 'BB19.15',
                      avatar: 'https://placeimg.com/140/140/any',
                    },
                    image: 'https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS02_Ven%20Song%20_DEM_v091.png',
                  },

            ],
          });
    }

    onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render(){
    return (

          <View style={styles.container}>

            <GiftedChat
                isAnimated
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                  _id: 1,
                }}
                placeholder ='Nhập tin nhắn...'
                label={i18n.t('list_more.send_button')}
              />
          </View>

    )
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
    paddingLeft:50
  }
}

export default ViewPhanAnhScreen;
