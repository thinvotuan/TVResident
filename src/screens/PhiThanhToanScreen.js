import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,SafeAreaView,
Alert } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'
/*import { Pie } from 'react-native-pathjs-charts';*/

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { NavigationActions, DrawerActions } from 'react-navigation';

import CanHoRow from '../components/CanHoRow'

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
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Phí và thanh toán</Text>
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

class PhiThanhToanScreen extends React.Component {
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
        listNhanKhau:[],
        listCanHo:[],
        chonCanho:''
      };
      this.init();


    }

    init(){
      this.state = {
        listNhanKhau: [
          {
            id:1,
            ho_va_ten: "Lê Thị Tú Anh",
            quan_he_chu_ho:"Vợ",
            datetime: "05/12/2019",
            statusActive:false
          }, {
            id:2,
            ho_va_ten: "Nguyễn Ngọc Huyền Trang",
            quan_he_chu_ho:"Con",
            datetime: "05/12/2019",
            statusActive:true
          }, {
            id:3,
            ho_va_ten: "Nguyễn Thế Trung",
            quan_he_chu_ho:"Con",
            datetime: "05/12/2019",
            statusActive:true
          },
        ],

        listCanHo:[
          {
            id:'BB19.15',
            ten_can_ho:'BB19.15',
            activeTab:'BB19.15'
          },
          {
            id:'BB19.16',
            ten_can_ho:'BB19.16',
            activeTab:''
          },
          {
            id:'BB19.17',
            ten_can_ho:'BB19.17',
            activeTab:'',
          },
          {
            id:'BB19.18',
            ten_can_ho:'BB19.18',
            activeTab:''
          },
          {
            id:'BB19.19',
            ten_can_ho:'BB19.19',
            activeTab:''
          },
          {
            id:'BB19.20',
            ten_can_ho:'BB19.20',
            activeTab:''
          }
        ],
        chonCanho:''

      };
    }

    componentDidMount(){
      let newData = [...this.state.listCanHo];
      this.setState({ chonCanho : newData[0].id });
      this._storeData(newData[0].id);
    }

    handlePressCanHo(id, item, index)
    {
      this.setState({ chonCanho : id });

      let newData = [...this.state.listCanHo];
      newData[index] = {...newData[index], activeTab : id};
      this.setState({listCanHo: newData});

      this.state.listCanHo[index] = item;
      this.setState({
         listCanHo: this.state.listCanHo
      });

      this._storeData(id);
      this._retrieveData();

      //get list nhân khẩu
      const data_new = {
        listNhanKhauLoad: [
        {
          id:4,
          ho_va_ten: "Nguyễn Thị Hoa",
          quan_he_chu_ho:"Em",
          datetime: "05/12/2019",
          statusActive:false
        }, {
          id:5,
          ho_va_ten: "Nguyễn Anh Văn",
          quan_he_chu_ho:"Cháu",
          datetime: "05/12/2019",
          statusActive:true
        }
      ],
      listNhanKhauLoad2: [
        {
          id:1,
          ho_va_ten: "Lê Thị Tú Anh",
          quan_he_chu_ho:"Vợ",
          datetime: "05/12/2019",
          statusActive:false
        }, {
          id:2,
          ho_va_ten: "Nguyễn Ngọc Huyền Trang",
          quan_he_chu_ho:"Con",
          datetime: "05/12/2019",
          statusActive:true
        }, {
          id:3,
          ho_va_ten: "Nguyễn Thế Trung",
          quan_he_chu_ho:"Con",
          datetime: "05/12/2019",
          statusActive:true
        }]};

      if(id==='BB19.15' || id==='BB19.17')
      {
        this.setState({
           listNhanKhau: data_new.listNhanKhauLoad2
        });
      }
      else {
        this.setState({
           listNhanKhau: data_new.listNhanKhauLoad
        });
      }
    }

    _retrieveData = async () => {
      try {
         const value = await AsyncStorage.getItem('cacheCanHo');
          if (value !== null) {
            //alert(value);
          }
        }
      catch (error) {}};

    _storeData = async (text) => {
      try {
        await AsyncStorage.setItem('cacheCanHo', text);
      } catch (error) {}};

    GoToView()
    {
      const navigateAction = NavigationActions.navigate({
        routeName: 'ViewPhiThanhToan',
        params: {
          id: this.state.chonCanho,
        }
      });
      this.props.navigation.navigate(navigateAction);
    }

    renderRow = (item, index) => {
      return(
        <TouchableHighlight onPress={() => this.handlePressCanHo(item.id, item ,index)}  underlayColor="transparent" style={[styles.container_canho_item, {backgroundColor: (`${this.state.chonCanho}` === `${item.id}` )  ? "#AA2829" :'#fff'}]}>
          <View style={styles.wapper}>
              <Text style={[styles.name,{color: `${this.state.chonCanho}` === `${item.id}` ? "#fff" :'#AA2829'}]}>{item.ten_can_ho}</Text>
          </View>
        </TouchableHighlight>
      );
  }
  _onRefresh = (callback) => {
      networkRequest().then(response => callback(response))
    }
  render() {

    let data = [{
      "name": "Washington",
      "population": 7694980
    }, {
      "name": "Oregon",
      "population": 2584160
    }, {
      "name": "Minnesota",
      "population": 6590667
    }, {
      "name": "Alaska",
      "population": 7284698
    }]

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }
    return (
      <ScrollView style={styles.container_scroll} >
          <View style={styles.container}>
            <SafeAreaView >
                <View>
                  <ScrollView scrollEventThrottle={16}>
                      <View style={styles.container_canho}>
                          <ScrollView
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}>
                              <FlatList
                                horizontal
                                pagingEnabled={false}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.listCanHo}
                                extraData={this.state}
                                renderItem={({ item, index }) => (
                                  this.renderRow(item, index)
                                )}
                              />
                          </ScrollView>
                      </View>
                  </ScrollView>
                </View>
            </SafeAreaView>
            <View style={styles.container_list}>
                <Button
                  title="Xem công nợ"
                  onPress={() => this.GoToView()}
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
    paddingLeft:30
  },
  container_list:{
    marginLeft:10,
    marginBottom:10,
    marginRight:10,
    marginTop:10
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
}

export default PhiThanhToanScreen;
