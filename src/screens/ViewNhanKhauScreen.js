import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,
Modal, ActivityIndicator } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-datepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';


const { width: screenWidth } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('NhanKhau')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={23}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('NhanKhau')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 18, paddingBottom:15}}>Chi tiết nhân khẩu</Text>
    </TouchableHighlight>

  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 18, paddingBottom:15}}>Chi tiết nhân khẩu</Text>
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

class ViewNhanKhauScreen extends React.Component {
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
        can_ho_da_chon: '',
        favSport1: undefined,
        isLoading: false,
        list_quan_he:[
        {
          label: 'Ông',
          value: 'ong',
        },
        {
          label: 'Bà',
          value: 'ba',
        },
        {
          label: 'Cha',
          value: 'cha',
        },
        {
          label: 'Mẹ',
          value: 'me',
        },
        {
          label: 'Chồng',
          value: 'chong',
        },
        {
          label: 'Vợ',
          value: 'vo',
        },
        {
          label: 'Con',
          value: 'con',
        },
        {
          label: 'Cháu',
          value: 'chau',
        },
        {
          label: 'Anh',
          value: 'anh',
        },
        {
          label: 'Chị',
          value: 'chi',
        },
        {
          label: 'Em',
          value: 'em',
        },
        {
          label: 'Bạn bè',
          value: 'banbe',
        },]

      };
      this.inputRefs = {
          favSport1: null,
      };
    }
    componentDidMount(){
      this._retrieveData()
    }

    _retrieveData = async () => {
      try {
         const value = await AsyncStorage.getItem('cacheCanHo');
          if (value !== null) {
            //alert(value);
            this.setState({can_ho_da_chon: value})
          }
        }
    catch (error) {}};

    DangKyNhanKhau()
    {
        this.setState({isLoading:true})
    }

  render() {
    const placeholder = {
          label: 'Chọn mối quan hệ với chủ hộ',
          value: null,
          color: '#ccc',
        };
    return (
      <ScrollView style={styles.container_scroll} >
          <View style={styles.container}>
            <Text style={styles.title_canho}>Mã căn hộ: {this.state.can_ho_da_chon}</Text>
            <View style={styles.wapper_form}>
                <View style={styles.wapper_item}>
                    <Text style={styles.title_input}>
                      Họ và tên
                    </Text>
                    <Text style={styles.input}>Lê Thị Tú Anh</Text>
                </View>
                <View style={[styles.wapper_item,styles.wapper_short]}>
                    <View styles={styles.short_item}>
                      <Text style={styles.title_input}>
                        Ngày sinh
                      </Text>
                      <Text style={styles.input_date}>04/12/1994</Text>
                    </View>
                    <View styles={styles.short_item}>
                      <Text style={styles.title_input}>
                        Số điện thoại
                      </Text>
                      <Text style = {[styles.input, styles.so_dien_thoai]}>0900090909</Text>
                    </View>
                </View>

                <View style={styles.wapper_item}>
                    <Text style={styles.title_input}>
                    Số CMND/Passport
                    </Text>
                    <Text style={styles.input}>0123456789</Text>
                </View>

                <View style={styles.wapper_item}>
                    <Text style={styles.title_input}>
                    Email
                    </Text>
                    <Text style={styles.input}>tu.anhle@gmail.com</Text>
                </View>

                <View style={[styles.wapper_item,styles.wapper_short]}>
                    <View styles={styles.short_item}>
                      <Text style={styles.title_input}>
                        Ngày bắt đầu
                      </Text>
                      <Text style={styles.input_date}>12/01/2020</Text>
                    </View>
                    <View styles={styles.short_item}>
                    <Text style={styles.title_input}>
                      Ngày kết thúc
                    </Text>
                    <Text style={[styles.input_date, styles.so_dien_thoai]}>12/11/2020</Text>
                    </View>
                </View>

                <View style={styles.wapper_item}>
                    <Text style={styles.title_input}>
                      Quan hệ với chủ hộ
                    </Text>
                    <Text style={styles.input}>Vợ</Text>
                </View>

            </View>
          </View>
        </ScrollView>
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
  title_canho:{
    fontFamily: "Nunito-Bold",
    fontSize:17,
    marginBottom:10
  },
  wapper_item:{
    marginBottom:15
  },
  title_input:{
    fontFamily: "Nunito-Bold",
    fontSize:16,
    marginBottom:5
  },
  input:{
      backgroundColor:'#d6dce5',
      borderRadius:5,
      fontSize:16,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:10,
      paddingRight:10,
      fontFamily: "Nunito-Regular",
      width:'100%'
  },
  input_date:{
      backgroundColor:'#d6dce5',
      borderRadius:5,
      fontSize:16,
      fontFamily: "Nunito-Regular",
      width: width / 2 - 10,
      marginRight:10,
      padding:10
  },
  wapper_short:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex:1
  },
  so_dien_thoai:{
    width: width / 2 - 20,
  },
  short_item:{
  },
  btn_wapper:{
    padding:10,
  },
  btn_gui:{
    backgroundColor:'#aa2829',
    padding:10,
    borderRadius:50,
    textAlign:'center',
    marginLeft:'auto',
    width: '100%'
  },
  text_send:{
    fontFamily: "Nunito-Regular",
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
  icon_dropdown:{
      position: 'absolute',
      top:10,
      right:10
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    backgroundColor:'#d6dce5',
    marginTop:0,
    fontFamily: "Nunito-Regular",
    height:40,
    position:'relative'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    color: '#000',
    paddingRight: 10,
    backgroundColor:'#d6dce5',
    marginTop:0,
    fontFamily: "Nunito-Regular",
    height:40,
    position:'relative'
  },
})
export default ViewNhanKhauScreen;
