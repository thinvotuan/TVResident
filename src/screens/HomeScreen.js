import React, { Component } from 'react';
import { Text, View, ScrollView, Animated, Dimensions, TouchableOpacity, Image, StatusBar, SafeAreaView, TouchableHighlight } from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';
import i18n from '../i18n';
import { NavigationEvents } from "react-navigation";
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')
import ArticleRow from '../components/ArticleRow'
class HomeScreen extends React.Component {

  constructor(props){
      super();
      this.props = props;
      this._carousel = {};
      this.state = {
          duAn:[],
          userName:'',
          activeTab:0
      }
    }

    componentDidMount(){
      const data_duLieu = {
        listDA: [
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
        ],
      };

      this.setState({
         duAn: data_duLieu.listDA
      });
  }

  _renderItemGioiThieu ({item, index}, parallaxProps) {
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
    return (
      <ScrollView style={styles.container_scroll}>
        <View style={styles.container}>
            <View style={styles.container_logo}>
              <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResident_white.png')} />
            </View>
            <View style={styles.container_gioithieu}>
                <Text style={styles.title_top}>Giới thiệu Newcity</Text>
                <View style={styles.container_slider}>
                  <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={screenWidth}
                        itemWidth={screenWidth}
                        data={this.state.duAn}
                        renderItem={this._renderItemGioiThieu}
                        hasParallaxImages={true}
                        onSnapToItem={ i => this.setState({ activeTab : i }) }
                        inactiveSlideOpacity={ 1 }
                        inactiveSlideScale={ 1 }
                    />
                </View>
                <View style={ styles.tabBar }>
                    <Pagination
                        dotsLength={this.state.duAn.length}
                        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' ,paddingVertical: 0}}
                        dotStyle={styles.dot_paging}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        activeDotIndex={ this.state.activeTab}
                    />
                </View>
            </View>

            <View style={styles.container_carousel}>
                <View style={styles.item_title}>
                    <Text style={styles.title_top}>Tiện ích cư dân</Text>
                </View>
                <View style={styles.item_title}>
                    <TouchableHighlight  underlayColor="transparent">
                        <Text style={styles.title_link_top}>Xem tất cả</Text>
                    </TouchableHighlight >
                </View>
                <SafeAreaView >
                    <View>
                      <ScrollView scrollEventThrottle={16}>
                          <View>
                              <ScrollView
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}>
                                  <ArticleRow imageUri={require('../images/tienich/bts.jpg')} id={1}
                                      name="Trường mẫu giáo Blue Sky"
                                  />
                                  <ArticleRow imageUri={require('../images/tienich/gym.jpg')} id={2}
                                      name="Gym và dịch vụ"
                                  />
                                  <ArticleRow imageUri={require('../images/tienich/Ho-boi.jpg')} id={3}
                                      name="Hồ bơi trung tâm"
                                  />
                                  <ArticleRow imageUri={require('../images/tienich/vui-choi.jpg')} id={4}
                                      name="Khu vui chơi trẻ em"
                                  />
                              </ScrollView>
                          </View>
                      </ScrollView>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.container_carousel}>
                <View style={styles.item_title}>
                    <Text style={styles.title_top}>Sự kiện cộng đồng</Text>
                </View>
                <View style={styles.item_title}>
                    <TouchableHighlight>
                        <Text style={styles.title_link_top}>Xem tất cả</Text>
                    </TouchableHighlight >
                </View>
                <SafeAreaView >
                    <View>
                      <ScrollView scrollEventThrottle={16}>
                          <View>
                              <ScrollView
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}>
                                  <ArticleRow imageUri={require('../images/tt.jpg')}
                                      name="Chương trình Trung thu 2019 cho các cháu Thiếu nhi tại New City"
                                  />
                                  <ArticleRow imageUri={require('../images/thiep.jpg')}
                                      name="Thiệp chúc mừng trung thu Chung cư Newcity 2019"
                                  />
                              </ScrollView>
                          </View>
                      </ScrollView>
                    </View>
                </SafeAreaView>
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
    backgroundColor:'#fff'
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
  container_gioithieu:{
    backgroundColor:'#fff',
    width:'100%',
    padding:10,
    marginBottom:10,
  },
  title_top:{
    marginBottom:10,
    fontFamily: "Nunito-Bold",
    fontSize:16
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
 container_slider:{
   position:'relative',
   marginBottom:2
 },
 dot_paging:{
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  tabBar : {
    position : 'absolute',
    right : 0,
    bottom : 0,
    left : 0,
  },

  container_carousel:{
    backgroundColor:'#fff',
    width:'100%',
    padding:10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  title_link_top:{
    color:'#AA2829',
    fontSize:15,
    fontFamily: "Nunito-Regular",
    textAlign:'right'
  },
  item_title: {
    width: '50%'
  }

}

export default HomeScreen;
