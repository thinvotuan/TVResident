import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,
RefreshControl } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'


import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import PhanAnhRow from '../components/PhanAnhRow'

const { width: screenWidth } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Dashboard')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Dashboard')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Phản ánh cư dân</Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 10, paddingBottom:15, marginLeft:'auto' }}
      onPress={() => props.navigation.navigate('AddPhanAnh')} underlayColor="transparent">
        <Icon name="md-create" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Phản ánh cư dân</Text>
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

class PhanAnhScreen extends React.Component {
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
        search: '',
        listPhanAnh:[],
        isRefreshing: false,
      };
      this.init();
      this.onRefresh = this.onRefresh.bind(this)
    }

    init(){
      this.state = {
        listPhanAnh: [
          {
            id:1,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS02_Ven%20Song%20_DEM_v091.png",
            title: "Đề nghị không xịt thuốc diệt cỏ trong công viên Đề nghị không xịt thuốc diệt cỏ trong công viên",
            datetime: "05/12/2019 10:22",
            status:"Đang xử lý",
            statusInt:'1'
          }, {
            id:2,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS04_Can%20Ho%20Boi_V23_CAP%20NHAT1.png",
            title: "Đề nghị cư dân vứt rác đúng nơi quy định",
            datetime: "05/12/2019 10:22",
            status:"Đang xử lý",
            statusInt:'1'
          }, {
            id:3,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS03_Tong%20Du%20An_V101.png",
            title: "Sửa chữa cửa thoát hiểm Bali tầng 18",
            datetime: "05/12/2019 10:22",
            status:"Đã xử lý",
            statusInt:'3'
          }, {
            id:4,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS03_Tong%20Du%20An_V101.png",
            title: "Mât nút bấm thang máy sảnh babylon 2c",
            datetime: "05/12/2019 10:22",
            status:"Đã xử lý",
            statusInt:'3'
          }, {
            id:5,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS03_Tong%20Du%20An_V101.png",
            title: "Mât nút bấm thang máy sảnh babylon 2",
            datetime: "05/12/2019 10:22",
            status:"Đã tiếp nhận",
            statusInt:'2'
          }, {
            id:6,
            thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS03_Tong%20Du%20An_V101.png",
            title: "Khói thuốc lá không thể chịu nổi",
            datetime: "05/12/2019 10:22",
            status:"Đã xử lý",
            statusInt:'3'
          }
        ],
        activeTab : 0
      };

    }
    onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
          this.setState({
            isRefreshing: false
          });
        }, 2000);
      }
    handlePress(id)
    {
      const navigateAction = NavigationActions.navigate({
        routeName: 'ViewPhanAnh',
        params: {
          id: id,
        }
      });
      this.props.navigation.navigate(navigateAction);
    }
  render() {
    const { search } = this.state;
    return (
      <ScrollView style={styles.container_scroll} refreshControl={
        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
      }>
          <View style={styles.container}>
            <View style={styles.search_bar}>
                <Icon name="ios-search" size={20}  style={styles.search_icon}/>
                <TextInput style={styles.search_input}
                    underlineColorAndroid="transparent"
                    placeholder="Tìm kiếm phản ánh ..."
                    placeholderTextColor="#ccc2c2"
                />
            </View>

            <View style={styles.container_list}>
            <FlatList
              style={styles.container_TinTuc}
              data={this.state.listPhanAnh}
              renderItem={({ item }) => (
                <TouchableHighlight onPress={() => this.handlePress(item.id)}  underlayColor="transparent">
                  <PhanAnhRow {...item} />
                </TouchableHighlight>
              )}
            />
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
    alignItems: 'flex-start'
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
  wapper_tienich:{
    width: width / 2 - 15,
    height: width / 2 - 30,
    backgroundColor:'#fff',
    borderRadius:4
  },
  back_icon:{
    color:'#fff',
    fontWeight:'bold',
    marginTop:5
  },
  wapper_title_main:{
    paddingLeft:40
  },
  container_list:{
    margin:10
  }
}

export default PhanAnhScreen;
