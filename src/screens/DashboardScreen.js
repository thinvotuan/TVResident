import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/Ionicons'
import { List, ListItem, SearchBar } from "react-native-elements";
import { FlatGrid } from 'react-native-super-grid';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

const { width: screenWidth } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('DuAn')} underlayColor="transparent">
      <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('DuAn')} underlayColor="transparent">
      <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Dashboard</Text>
    </TouchableHighlight>
  </View>
);

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

class DashboardScreen extends React.Component {

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
        idDuAn: this.props.navigation.getParam('id'),
        userName:'',
      };
    }


  componentDidMount(){
    const data_duan = {
      duAn: [
      {
        thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS02_Ven%20Song%20_DEM_v091.png",
        title: "Newcity Thủ thiêm 2",
        description: "Layout direction specifies the direction in which children and text in a hierarchy should be laid out. Layout direction also affects what edge",
        status:"Đang mở bán"
      }, {
        thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS04_Can%20Ho%20Boi_V23_CAP%20NHAT1.png",
        title: "2220 Căn hộ tái định cư Bình Khánh, Quận 2",
        description: "Layout direction specifies the direction in which children and text in a hierarchy should be laid out. Layout direction also affects what edge",
        status:"Đã bán"
      }, {
        thumbnail: "https://batdongsan.newcitythuthiem.com.vn/Images/HinhNen/PS03_Tong%20Du%20An_V101.png",
        title: "Thuận Việt Contruction 2019",
        description: "Layout direction specifies the direction in which children and text in a hierarchy should be laid out. Layout direction also affects what edge",
        status:"Đang cho thuê"
      }
    ]};

    this.setState({
       duAn: data_duan.duAn
    });
    this.initUserPassFromCache().done();
  }

  initUserPassFromCache = async () => {
      let email = '';
      try{
        email = await AsyncStorage.getItem('username');
       }
      catch(error){}
      this.setState({ userName: email });

  }
  goToDanhMuc(router)
  {
    const navigateAction = NavigationActions.navigate({
      routeName: router,
      params: {
        idDuAn: this.state.idDuAn,
      }
    });
    this.props.navigation.navigate(navigateAction);
  }

  _renderItemQuangCao ({item, index}, parallaxProps) {
          return (
              <View style={styles.item_gioithieu}>
                  <ParallaxImage
                      source={{ uri: item.thumbnail }}
                      containerStyle={styles.image_container}
                      style={styles.image}
                      parallaxFactor={0.4}
                      {...parallaxProps}
                  />
              </View>
          );
      }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container_scroll}>
          <View style={styles.container}>
            <Text style={styles.title_user}>Xin chào, <Text style={styles.title_user_name}>{this.state.userName}</Text></Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <TouchableHighlight style={styles.wapper_menu} onPress={()=>{this.goToDanhMuc('TienIch')}}  underlayColor="transparent">
                    <View style={styles.itemContainer}>
                            <View>
                                <Image style={styles.itemImg}
                                    source={require('../images/tien_ich.jpg')}/>
                            </View>
                            <View>
                                <Text style={styles.itemName} numberOfLines={2}>Tiện ích cư dân</Text>
                            </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.wapper_menu} onPress={()=>{this.goToDanhMuc('PhanAnh')}}  underlayColor="transparent">
                <View style={styles.itemContainer}>
                    <View>
                        <Image style={styles.itemImg}
                            source={require('../images/phan_anh.png')}/>
                    </View>
                    <View>
                        <Text style={styles.itemName} numberOfLines={2}>Phản ánh từ cư dân</Text>
                    </View>
                </View>
                  </TouchableHighlight>
                <TouchableHighlight style={styles.wapper_menu} onPress={()=>{this.goToDanhMuc('NhanKhau')}}  underlayColor="transparent">
                <View style={styles.itemContainer}>
                    <View>
                        <Image style={styles.itemImg}
                            source={require('../images/dang_ky_nk.png')}/>
                    </View>
                    <View>
                        <Text style={styles.itemName} numberOfLines={2}>Đăng ký nhân khẩu</Text>
                    </View>
                </View>
                  </TouchableHighlight>
                <TouchableHighlight style={styles.wapper_menu} onPress={()=>{this.goToDanhMuc('PhiThanhToan')}}  underlayColor="transparent">
                    <View style={styles.itemContainer}>
                        <View>
                            <Image style={styles.itemImg}
                                source={require('../images/phi_thanh_toan.jpg')}/>
                        </View>
                        <View>
                            <Text style={styles.itemName} numberOfLines={2}>Phí & Thanh toán</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.wapper_menu} onPress={()=>{this.goToDanhMuc('ChooseBlock')}}  underlayColor="transparent">
                    <View style={styles.itemContainer}>
                        <View>
                            <Image style={styles.itemImg}
                                source={require('../images/phi_thanh_toan.jpg')}/>
                        </View>
                        <View>
                            <Text style={styles.itemName} numberOfLines={2}>Nhập chỉ số điện nước</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.wapper_quangcao}>
            <Carousel
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth}
                  data={this.state.duAn}
                  renderItem={this._renderItemQuangCao}
                  hasParallaxImages={true}
                  inactiveSlideOpacity={ 1 }
                  inactiveSlideScale={ 1 }
              />
            </View>
          </View>
      </ScrollView>
    );
  }
}


const styles = {
  container_scroll:{
    padding:10
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
  title_user:{
    fontWeight: '600',
    color:'#337ab7',
    fontFamily: "Nunito-Regular",
    fontSize:18,
    marginBottom:35,
  },
  title_user_name:{
    fontFamily: "Nunito-Bold",
  },
  back_icon:{
    color:'#fff',
    fontWeight:'bold',
    marginTop:5
  },
  containermenu:{
    backgroundColor:'#fff',
    marginBottom:20,
    marginTop:20,
  },
  wapper_menu:{
    width: width / 2 - 15,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:35,
    backgroundColor:'#fff'
  },
  itemImg:{
    width:width / 2 - 130,
    height:width / 2 - 130,
    marginBottom:15,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
    color: '#222',
    fontWeight: '300',
    fontFamily: "Nunito-Regular",
    textAlign:'center'
  },
  wapper_quangcao:{
    position:'relative',
    marginBottom:20
  },
  item_gioithieu: {
    width: screenWidth - 20,
    height: 280,
  },
  image_container: {
   flex: 1,
   marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
   backgroundColor: 'white',
   borderRadius: 3,
   position:'relative'
 },
}

export default DashboardScreen;
