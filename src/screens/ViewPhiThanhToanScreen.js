import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,SafeAreaView,
Alert } from 'react-native';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { NavigationActions, DrawerActions } from 'react-navigation';

import {ScrollableTabView, DefaultTabBar } from '@valdio/react-native-scrollable-tabview'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const { width: screenWidth } = Dimensions.get('window')
const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('PhiThanhToan')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('PhiThanhToan')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Thông tin thanh toán</Text>
    </TouchableHighlight>

  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Phí và thanh toán</Text>
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


class ViewPhiThanhToanScreen extends React.Component {

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
        tableHeadTab1: ['Nội dung', 'Số tiền', 'Đã đóng'],
        tableHeadTab2: ['Loại phí', 'Kỳ', 'Ngày', 'Số tiền'],
        tableDataTab2: [
        ['Tiền điện', '11/2019', '01/12/2019', '250.000'],
        ['Tiền nước', '11/2019', '01/12/2019', '150.000'],
        ['Phí quản lý', '11/2019', '01/12/2019', '1.350.000'],
        ['Tiền nước', '10/2019', '12/11/2019', '350.000'],
        ['Tiền điện', '11/2019', '01/12/2019', '250.000'],
        ['Tiền nước', '11/2019', '01/12/2019', '150.000'],
      ]
      };
    }

render() {
    return (
      <View style={{flex:1, paddingHorizontal:10}}>
        <ScrollableTabView
          refreshControlStyle={{backgroundColor: 'red'}}
          pullToRefresh={this._onRefresh}
          tabBarActiveTextColor="#AA2829"
          renderTabBar={()=> <DefaultTabBar
              underlineStyle={{
                backgroundColor:'#AA2829'
              }}
          />}
        >
          <ScrollView tabLabel="Chưa thanh toán"   showsHorizontalScrollIndicator={false} >
            <View style={styles.wapper_tab}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'transparent'}}>
                  <Row data={this.state.tableHeadTab1} flexArr={[2, 1, 1]} style={styles.head} textStyle={styles.text}/>
                </Table>
            </View>
          </ScrollView>
          <ScrollView tabLabel="Đã thanh toán"  showsHorizontalScrollIndicator={false} >
            <View style={styles.wapper_tab}>
              <Table borderStyle={{borderWidth: 1, borderColor: 'transparent'}}>
                <Row data={this.state.tableHeadTab2} flexArr={[2, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>

              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'transparent'}}>
                  <Rows data={this.state.tableDataTab2} flexArr={[2, 1, 1, 1]} textStyle={[styles.text, styles.row_data]}/>
                </Table>
              </ScrollView>
            </View>
          </ScrollView>

        </ScrollableTabView>
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
    paddingLeft:30
  },
  container_list:{
    marginLeft:10,
    marginBottom:10,
    marginRight:10
  },
  container_canho:{
    padding:10,
    paddingBottom:0
  },
  container_canho_item:{
    borderWidth:1,
    borderRadius:5,
    marginRight:10,
    padding:15,
    borderColor:'#AA2829'
  },
  name:{
     fontSize:16,
     fontFamily: "Nunito-Regular",
     textAlign:'center',
     alignItems: 'center',
     justifyContent: 'center'
  },
  wapper_tab:{
    marginTop:10,
    marginBottom:10
  },
  head:{
    backgroundColor:'#ddd',
    textAlign:'center',
    height:28
  },
  text: {
    textAlign: 'center',
    fontSize:14,
    fontFamily: "Nunito-Regular",
  },
  row_data:{
     height: 28,
     textAlign:'center',
     alignItems: 'center',
     justifyContent: 'center',
  }
}
export default ViewPhiThanhToanScreen;
