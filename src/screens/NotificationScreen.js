import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, StatusBar, TextInput, Dimensions, TouchableHighlight, FlatList,
RefreshControl,
AsyncStorage } from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import i18n from '../i18n';
import { NavigationEvents } from "react-navigation";

import ViewThongBaoScreen from './ViewThongBaoScreen';
import NotificationRow from '../components/NotificationRow'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const { height, width } = Dimensions.get('window')

class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super();
      this.props = props;
      this.state = {
        search: '',
        listThongBao:[],
        listDuAn:[],
        favSport1: undefined,
        userName:'',
        chooseSave:'0',
        isRefreshing: false,
      };
      this.handlePress = this.handlePress.bind(this);
      this.changeSave = this.changeSave.bind(this);
      this.inputRefs = {
          favSport1: null,
      };
      this.onRefresh = this.onRefresh.bind(this)
    }

    async componentDidMount(){
      this.initUserPassFromCache().done();
      const data_duLieu = {
        listTB: [
          {
            id:1,
            title: "Những điều cần lưu ý trong dịp Tết Nguyên Đán 2020/ Cautions on the Lunar New Year holidays 2020",
            datetime: "14/01/2020 10:22",
            status:"0",
            statusSave:'1',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }, {
            id:2,
            title: "Lịch nghỉ Tết Canh Tý 2020/ Notice on Lunar New Year holiday 2020",
            datetime: "14/01/2020 10:22",
            status:"0",
            statusSave:'0',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }, {
            id:3,
            title: "LỊCH XỬ LÝ CÔN TRÙNG ĐỢT 2 THÁNG 12/2019 TẠI THÁP BABYLON / Pest control schedule 2nd time of December, 2019 at Babylon Tower",
            datetime: "10/01/2020 10:22",
            status:"1",
            statusSave:'0',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }, {
            id:4,
            title: "Kiểm tra an toàn Phòng cháy chữa cháy, an toàn điện, hệ thống thoát nước và an toàn vệ sinh thực phẩm tại các shophouse New City /Conducting an inspection of fire prevention safety, electrical safety, drainage system and food safety of shophouses in New City",
            datetime: "09/01/2020 10:22",
            status:"1",
            statusSave:'1',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }, {
            id:5,
            title: "LỊCH BẢO TRÌ THANG MÁY TẠI THÁP BABYLON THÁNG 01/2020./ Elevator maintenance schedule at Babylon Tower in January, 2020",
            datetime: "08/01/2020 10:22",
            status:"1",
            statusSave:'1',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }, {
            id:6,
            title: "THÔNG BÁO VỀ VIỆC TẠM NGƯNG HOẠT ĐỘNG HỒ BƠI ĐỂ PHỤC VỤ CHO CÔNG TÁC BẢO TRÌ VÀ THAY THẾ ĐÈN HỒ BƠI/ NOTICE OF TEMPORARY SUSPENSION OF SWIMMING FACILITIES IN SERVICE OF POINT MAINTENANCE AND REPLACEMENT OF POOL LIGHTS",
            datetime: "06/01/2020 10:22",
            status:"1",
            statusSave:'0',
            maDuAn:'Newcity',
            tenDuAn:'Chung cư Newcity Quận 2'
          }
        ],
          listDA:[
          {
            label: 'Newcity Thủ Thiêm Quận 2',
            value: 'newcity',
          },
          {
            label: 'Khu đô thị Quận 9',
            value: 'KDTQ9',
          },
          {
            label: '2.220 Căn hộ Thủ Thiêm',
            value: '2220CT',
          },
        ]
      }

      this.setState({
         listDuAn: data_duLieu.listDA
      });

      this.setState({
         listThongBao: data_duLieu.listTB
      });
    }
    navigateToScreen = (route)  => {

         const navigateAction = NavigationActions.navigate({
           routeName: 'Profile',
           action: NavigationActions.navigate({ routeName: 'Profile' }),
         });
         this.props.navigation.dispatch(navigateAction);

    }
    initUserPassFromCache = async () => {
      try{
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          this.setState({ userName: value });
        }
        else {
          this.setState({ userName: '' });
        }
     }
      catch(error){}
    }
  changeSave = () => {
    if(this.state.chooseSave==='0')
    {
      this.setState({ chooseSave : '1' });
    }
    else {
      this.setState({ chooseSave : '0' });
    }
  };

  handlePress = (item, index) => {
    item.status='0';
    this.state.listThongBao[index] = item;
    this.setState({
      listThongBao: this.state.listThongBao
    });
    const navigateAction = NavigationActions.navigate({
      routeName: 'ViewThongBao',
      params: {
        id: item.id
      }
    });
    this.props.navigation.navigate(navigateAction);

  }
  onRefresh(){
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.setState({
          isRefreshing: false
        });
      }, 2000);
    }
  updateSearch = search => {
    this.setState({ search });
  };

  SearchFilterFunction(text)
  {}

  render() {
    const placeholder = {
          label: 'Chọn dự án...',
          value: null,
          color: '#ccc',
        };
    return (
      <ScrollView style={styles.container_scroll}
      refreshControl={
        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
      }>
      <NavigationEvents
         onDidFocus ={payload => {
           this.initUserPassFromCache().done();
         }}
       />
          <View style={styles.container}>
            <View style={styles.container_logo}>
                <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResident_white.png')} />
            </View>
            <View style={styles.wapper_search}>
                  <View style={styles.wapper_start_save}>
                    <TouchableHighlight style={styles.wapper_button} onPress={() => this.changeSave()}  underlayColor="transparent">
                      <Icon name = {this.state.chooseSave==='0' ? "ios-star-outline" :'ios-star'} size={30}  style={{ color: this.state.chooseSave==='0' ? "#fff" :'#fdbc45', textAlign:'center'}}/>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.wapper_droplist_duan}>
                    <RNPickerSelect
                       placeholder={placeholder}
                       items={this.state.listDuAn}
                       onValueChange={value => {
                         this.setState({
                           favSport1: value,
                         });
                       }}
                       Icon={() => {
                        return <Icon name="ios-arrow-down" style={styles.icon_dropdown} size={24} color="#fff" />;
                      }}
                       onUpArrow={() => {
                        this.inputRefs.firstTextInput.focus();
                      }}
                      onDownArrow={() => {
                        this.inputRefs.favSport1.togglePicker();
                      }}
                       style={pickerSelectStyles}
                       value={this.state.favSport1}
                       useNativeAndroidPickerStyle={false}
                       ref={el => {
                         this.inputRefs.favSport1 = el;
                       }}
                     />
                  </View>
             </View>
             <View style={styles.search_bar}>
                 <Icon name="ios-search" size={20}  style={styles.search_icon}/>
                 <TextInput style={styles.search_input}
                     underlineColorAndroid="transparent"
                     placeholder="Tìm kiếm thông báo ..."
                     placeholderTextColor="#ccc2c2"
                 />
             </View>
             <View style={styles.container_list}>
             {this.state.userName !== '' && <FlatList
               style={styles.container_TinTuc}
               data={this.state.listThongBao}
               renderItem={({ item, index }) => (
                 <TouchableHighlight onPress={() => this.handlePress(item,index)}  underlayColor="transparent">
                   <NotificationRow {...item}  />
                 </TouchableHighlight>
               )}
             />}

             </View>
          </View>
      </ScrollView>
    );
  }
}


const NotificationNavigator = createStackNavigator ({
  Notification: NotificationScreen,
  ViewThongBao:ViewThongBaoScreen,
});

const styles = {
  container_scroll:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: "Nunito-Regular",
    backgroundColor:'#fff',
  },
  container_logo:{
    flex: 1,
    width:'100%',
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#AA2829'
  },
  logo: {
      flex: 1,
      width: '40%',
  },
  wapper_search:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',

  },
  search_bar:{
    flex: 1,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    margin: 10,
    backgroundColor:'#AA2829',
    borderRadius:5,
    height:40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop:0
  },
  search_input:{
    fontWeight: '600',
    color:'#fff',
    fontFamily: "Nunito-Regular",
    width:'100%'
  },
  search_icon:{
    margin: 10,
    color:'#ccc2c2',
    textAlign:'center',
  },
  wapper_duan:{
    width: width / 2 - 15,
    height: width / 2 - 30,
    backgroundColor:'#fff',
    borderRadius:4
  },
  wapper_start_save:{
    backgroundColor:'#AA2829',
    margin:10,
    borderRadius:5
  },
  wapper_button:{
      height:40,
      width:60,
      justifyContent: "center",

  },
  wapper_droplist_duan:{
    width: width - 90
  },

  container_list:{
    margin:10
  },
  icon_dropdown:{
      position: 'absolute',
      top:18,
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
    backgroundColor:'#AA2829',
    marginTop:10,
    fontFamily: "Nunito-Regular",
    height:40,
    position:'relative'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    color: '#fff',
    paddingRight: 10,
    backgroundColor:'#AA2829',
    marginTop:10,
    fontFamily: "Nunito-Regular",
    height:40,
    position:'relative'
  },
})
export default NotificationNavigator;
