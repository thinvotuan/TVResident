import React , { Component }  from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import i18n from '../i18n';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')


const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết thông báo</Text>
    </TouchableHighlight>

  </View>
);
//<View style={styles.wapper_title_main}>
  //<Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết</Text>
//</View>
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


class ViewThongBaoScreen extends React.Component {
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
        idthis: this.props.navigation.getParam('id'),
        title:'',
      };
    }

    componentDidMount(){
    }

  render(){
    return (
      <ScrollView style={styles.container_scroll} >
          <View style={styles.container}>
              <Text style={styles.title}>Tuyên truyền phổ biến kiến thức PCCC và thực hành phương án chữa cháy, cứu nạn, cứu hộ tại Tòa nhà New City năm 2019</Text>
                <View style={styles.wapper_description}>
                    <Text style={styles.description}>Kính gửi: Quý Cư dân/ Quý Shophouses,
                        Ban quản lý Tòa nhà New City xin thông báo kế hoạch tuyên truyền phổ biến kiến thức pháp luật PCCC, và thực hành phương án chữa cháy và cứu nạn, cứu hộ tại Tòa nhà New City năm 2019 như sau:
                    </Text>

                    <Text style={[styles.description, {marginTop:10}]}>Từ 8h30 đến 10h30: Tổ chức tuyên truyền, phổ biến kiến thức pháp luật về phòng cháy chữa cháy cho cư dân New City nhằm trang bị kiến thức, kỹ năng ngăn ngừa, xử lý sự.
                    </Text>

                    <Text style={[styles.description, {marginTop:10}]}>Trong quá trình tổ chức thực tập phương án sẽ có tín hiệu báo cháy, chuông sẽ reo vang, thang máy dừng về tầng 1, điện lưới sẽ bị ngắt và máy phát dự phòng sẽ hoạt động ...
                    </Text>

                    <Text style={[styles.description, {marginTop:10}]}>Trong quá trình tổ chức thực tập phương án sẽ có tín hiệu báo cháy, chuông sẽ reo vang, thang máy dừng về tầng 1, điện lưới sẽ bị ngắt và máy phát dự phòng sẽ hoạt động ...
                    </Text>
                    <Text style={[styles.description, {marginTop:10}]}>Trong quá trình tổ chức thực tập phương án sẽ có tín hiệu báo cháy, chuông sẽ reo vang, thang máy dừng về tầng 1, điện lưới sẽ bị ngắt và máy phát dự phòng sẽ hoạt động ...
                    </Text>
                </View>
          </View>
      </ScrollView>
    )
  }
}

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
  },
  title:{
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    fontWeight:'600',
    lineHeight:23,
  },
  description:{
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  }
}

export default ViewThongBaoScreen;
