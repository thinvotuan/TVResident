import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,SafeAreaView,
RefreshControl } from 'react-native';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatGrid } from 'react-native-super-grid';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('ChooseBlock')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('ChooseBlock')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chọn căn hộ</Text>
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
class ChooseTangScreen extends React.Component {
  constructor(props){
      super();
      this.props = props;
      this.state = {
        listCanHos:[],
        listTang:[],
        isRefreshing: false,
        idDuAn: this.props.navigation.getParam('idDuAn'),
        idBlock: this.props.navigation.getParam('idBlock'),
        chonTang: undefined,
      };
      this.inputRefs = {
          chonTang: null,
      };

      this.onRefresh = this.onRefresh.bind(this)
    }
    static navigationOptions = {
      headerTitleStyle: { color: '#fff' },
      header: (props) => <ImageHeader {...props} />,
      headerRight: null,
      headerLeft: null,
    };

    onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
          this.setState({
            isRefreshing: false
          });
        }, 2000);
      }

      componentDidMount(){
        const data_duLieu = {
          Tang: [
          {
            label:"Tầng 1",
            value: "1",
          },
          {
            label:"Tầng 2",
            value: "2",
          },
          {
            label:"Tầng 3",
            value: "3",
          },
          {
            label:"Tầng 4",
            value: "4",
          },
          {
            label:"Tầng 5",
            value: "5",
          }
        ],
        CanHo:[
          {
            maCH:"VE01.01",
            tenCH: "VE01.01",
          },
          {
            maCH:"VE01.02",
            tenCH: "VE01.02",
          },
          {
            maCH:"VE01.03",
            tenCH: "VE01.03",
          },
          {
            maCH:"VE01.04",
            tenCH: "VE01.04",
          },
          {
            maCH:"VE01.05",
            tenCH: "VE01.05",
          },
          {
            maCH:"VE01.06",
            tenCH: "VE01.06",
          },
          {
            maCH:"VE01.07",
            tenCH: "VE01.07",
          },
          {
            maCH:"VE01.08",
            tenCH: "VE01.08",
          },
          {
            maCH:"VE01.09",
            tenCH: "VE01.09",
          },
          {
            maCH:"VE01.10",
            tenCH: "VE01.10",
          },
          {
            maCH:"VE01.11",
            tenCH: "VE01.11",
          },
          {
            maCH:"VE01.12",
            tenCH: "VE01.12",
          },
          {
            maCH:"VE01.12A",
            tenCH: "VE01.12A",
          },
          {
            maCH:"VE01.14",
            tenCH: "VE01.14",
          },
          {
            maCH:"VE01.15",
            tenCH: "VE01.15",
          },
          {
            maCH:"VE01.16",
            tenCH: "VE01.16",
          },
          {
            maCH:"VE01.17",
            tenCH: "VE01.17",
          },
          {
            maCH:"VE01.18",
            tenCH: "VE01.18",
          },
          {
            maCH:"VE01.19",
            tenCH: "VE01.19",
          },
          {
            maCH:"VE01.20",
            tenCH: "VE01.20",
          }
        ]
      };

        let newData = [...data_duLieu.Tang];
        this.setState({ chonTang : newData[0].value });

        this.setState({
           listTang: data_duLieu.Tang
        });

        this.setState({
           listCanHos: data_duLieu.CanHo
        });
      }

      ChooseCanHo(idCanHo){
        const navigateAction = NavigationActions.navigate({
          routeName: 'AddChiSo',
          params: {
            idBlock: this.state.idBlock,
            idDuAn:this.state.idDuAn,
            idTang:this.state.chonTang,
            idCanHo:idCanHo,
          }
        });
        this.props.navigation.navigate(navigateAction);
      }
      changeTang(value)
      {
        this.setState({
          chonTang: value,
        });
        this.onRefresh();
      }
      render() {
        const placeholder = {
              label: 'Chọn tầng',
              value: null,
              color: '#000',
            };
        return (
          <ScrollView style={styles.container_scroll}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
          }>
          <View style={styles.container}>
              <View style={styles.wapper_search}>
                  <View style={styles.wapper_droplist_duan}>
                    <RNPickerSelect
                       placeholder={placeholder}
                       items={this.state.listTang}
                       onValueChange={value => {
                         this.changeTang(value);
                       }}
                       Icon={() => {
                        return <Icon name="ios-arrow-down" style={styles.icon_dropdown} size={30} color="#fff" />;
                      }}
                       onUpArrow={() => {
                        this.inputRefs.firstTextInput.focus();
                      }}
                      onDownArrow={() => {
                        this.inputRefs.chonTang.togglePicker();
                      }}
                       style={pickerSelectStyles}
                       value={this.state.chonTang}
                       useNativeAndroidPickerStyle={false}
                       ref={el => {
                         this.inputRefs.chonTang = el;
                       }}
                     />
                  </View>
              </View>
              <View style={styles.container_list}>
                  <View style={styles.container_block}>
                        <FlatList
                          data={this.state.listCanHos}
                          numColumns={3}
                          renderItem={({ item }) => (
                            <TouchableHighlight style={styles.wapper_block} onPress={() => this.ChooseCanHo(item.maCH)}  underlayColor="transparent">
                              <View style={[styles.item,{backgroundColor:'#ccc'}]}>
                                <View style={[styles.wapper_text]}>
                                    <Text style={[styles.listItemText,{color: '#000'}]} numberOfLines={1}>{item.tenCH}</Text>
                                </View>
                              </View>
                            </TouchableHighlight>
                          )}
                        />
                    </View>
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
  item: {
    padding:10,
    paddingTop:15,
    paddingBottom:20,
    borderRadius:5,
    marginBottom:20,
    marginLeft:10,
    marginRight:10,
  },
  listItemText: {
    fontSize: 17,
    color: '#434343',
    fontFamily: "Nunito-Bold",
    textAlign:'center'
  },
  container_block:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop:10
  },
  wapper_block:{
    width: width / 3 - 10,
    backgroundColor:'#fff',
  },
  wapper_search:{
    padding:10
  },
  icon_dropdown:{
      position: 'absolute',
      top:20,
      right:10
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    backgroundColor:'#AA2829',
    marginTop:10,
    fontFamily: "Nunito-Regular",
    height:50,
    position:'relative'
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 5,
    color: '#fff',
    paddingRight: 10,
    backgroundColor:'#AA2829',
    marginTop:10,
    fontFamily: "Nunito-Regular",
    height:50,
    position:'relative'
  },
})
export default ChooseTangScreen;
