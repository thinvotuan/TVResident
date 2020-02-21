import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, StatusBar, TextInput, Dimensions, TouchableHighlight, FlatList,
RefreshControl,ActivityIndicator,
AsyncStorage, } from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import i18n from '../i18n';
import { NavigationEvents } from "react-navigation";

import ViewThongBaoScreen from './ViewThongBaoScreen';
import NotificationRow from '../components/NotificationRow';
import ViewFilePDFScreen from './ViewFilePDFScreen'; 

import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const { height, width } = Dimensions.get('window')

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};


class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super();
      this.props = props;
      
      this.state = {
        searchInput: '',
        listThongBao:[],
        listDuAn:[],
        favSport1: '',
        userName:'',
        chooseSave:'0',
        isRefreshing: false,
        waiting: false,
        pageCurent:1,
        loading: false,
        refreshing : false,
        error: null,
      };
      this.handlePress = this.handlePress.bind(this);
      this.changeSave = this.changeSave.bind(this);
      this.inputRefs = {
          favSport1: '',
      };
      this.onRefreshList = this.onRefreshList.bind(this);
    }

      componentDidMount(){
      this.GetDuAn();
      this.findAll();
      this.initUserPassFromCache().done();      

    }

    async GetDuAn() {   
        const value = await AsyncStorage.getItem('username');
        var that = this;
        var urlDA = 'https://webapi.newcitythuthiem.com.vn/api/Users/ListDuAn' + "?userName=" + value;
        fetch(urlDA,{
            method: 'POST',
            }).then(function (response) { return response.json();
            }).then(function (result) {
              for(let i = 0; i < result.length ; i++)
              {
                that.state.listDuAn.push({
                    label: result[i].TenDuAn.toString(),
                    value: result[i].MaDuAn.toString()
                });
              }
              
            }).catch(function (error) {
                Alert.alert("Thông báo","Lỗi: "+error);
          });

          this.setState({
            listDuAn: this.state.listDuAn
         });
         
    }

    findAll = async () =>{
      this.setState({ loading: true });

      const value = await AsyncStorage.getItem('username');
      const qsearch = this.state.searchInput.replace(/ /gi, '+');
      const maDuAn = this.state.favSport1;
      const daLuu = this.state.chooseSave;
      let pageCurent = this.state.pageCurent ;

      var urlDA = 'https://webapi.newcitythuthiem.com.vn/api/Users/ListThongBao' + "?userName=" + value + "&qSearch=" + qsearch + "&chooseSave="+ daLuu +"&maDuAn=" + maDuAn + "&page=" + pageCurent;
      var that = this;

      
      fetch(urlDA,{
        method: 'POST',
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          listThongBao: pageCurent === 1 ? res : [...this.state.listThongBao, ...res],
          //pageCurent === 1 ? res : this.state.listThongBao.concat(res),
          //pageCurent === 1 ? res : [...this.state.listThongBao, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
      
    }

    handleLoadMore = () => {
      this.setState(
        {
          pageCurent: this.state.pageCurent + 1
        },
        () => {
          this.findAll();
        }
      );
    };

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
    this.setState({ listThongBao:[], loading: true,});
    setTimeout(() => {
      this.setState(
        {
          pageCurent: 1,
          
        },
        () => {
          this.findAll();
        }
      );
    }, 1000);
  };

  handlePress = (item, index) => {
    item.TrangThaiDaXem="1";
    this.state.listThongBao[index] = item;
    this.setState({
      listThongBao: this.state.listThongBao
    });

    const username = this.state.userName;
    var urlCapNhat = 'https://webapi.newcitythuthiem.com.vn/api/Users/CapNhatTrangThaiDaXem' + "?userName=" + username + "&maPhieu=" + item.MaPhieu;

    fetch(urlCapNhat,{
      method: 'POST',
      }).then(function (response) { return response.json();
      }).then(function (result) {
      }).catch(function (error) {
          Alert.alert("Thông báo","Lỗi: "+error);
    });


    const navigateAction = NavigationActions.navigate({
      routeName: 'ViewThongBao',
      params: {
        id: item.MaPhieu
      }
    });
    this.props.navigation.navigate(navigateAction);
    

  }
  onRefreshList(){
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.setState(
          {
            pageCurent: 1,
            listThongBao:[]
          },
          () => {
            this.findAll();
          }
        );
        this.setState({
          isRefreshing: false
        });
      }, 1000);
    }


  ChangeTimKiem(text)
  {
    this.setState({searchInput: text});
    this.setState(
      {
        pageCurent: 1,
        listThongBao:[]
      },
      () => {
        this.findAll();
      }
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  handleRefresh = () => {
    this.setState(
      {
        pageCurent: 1,
        refreshing: true
      },
      () => {
        this.findAll();
      }
    );
  };
  
  

  render() {
    const placeholder = {
          label: 'Chọn dự án...',
          value: '',
          color: '#ccc',
        };
    return (
      <ScrollView style={styles.container_scroll}
      refreshControl={
        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefreshList} />
      }
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            this.setState({refreshing: true});
            this.handleLoadMore();
          }
      }}
      scrollEventThrottle={400}
      >
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
                         this.setState(
                          {
                            pageCurent: 1,
                            listThongBao:[]
                          },
                          () => {
                            this.findAll();
                          }
                        );
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
                     onChangeText={(searchInput) => this.ChangeTimKiem(searchInput) }
                 />
             </View>
             <View style={styles.container_list}>
             {this.state.userName !== '' && <FlatList
               style={styles.container_TinTuc}
               data={this.state.listThongBao}           
               ListFooterComponent={this.renderFooter}
               keyExtractor={item => item.MaPhieu}
               refreshing = {this.state.refreshing}
               //onEndReached = {this.handleLoadMore}
               //onEndReachedThreshold = {50}
               //onRefresh={this.handleRefresh}
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
  ViewFilePDF:ViewFilePDFScreen,
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
    position:'relative',
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
    position:'relative',
  },
})
export default NotificationNavigator;
