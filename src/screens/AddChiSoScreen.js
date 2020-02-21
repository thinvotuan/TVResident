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
      onPress={() => props.navigation.navigate('ChooseTang')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('ChooseTang')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Nhập chỉ số</Text>
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
class AddChiSoScreen extends React.Component {
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
        idDuAn: this.props.navigation.getParam('idDuAn'),
        idBlock: this.props.navigation.getParam('idBlock'),
        idDuAn: this.props.navigation.getParam('idTang'),
        idCanHo: this.props.navigation.getParam('idCanHo'),
        chonNam: undefined,
        chonThang: '',
        listThang:[],
        listNam:[],
        listDongHoDien:[],
        listDongHoNuoc:[]
      };
      this.inputRefs = {
          chonNam: null,
          chonThang:null
      };
    }

    componentDidMount(){
      const data = {
        listThang:[
        {
          label:"Tháng 1",
          value: "1",
        },
        {
          label:"Tháng 2",
          value: "2",
        },
        {
          label:"Tháng 3",
          value: "3",
        },
        {
          label:"Tháng 4",
          value: "4",
        },
        {
          label:"Tháng 5",
          value: "5",
        },
        {
          label:"Tháng 6",
          value: "6",
        },
        {
          label:"Tháng 7",
          value: "7",
        },
        {
          label:"Tháng 8",
          value: "8",
        },
        {
          label:"Tháng 9",
          value: "9",
        },
        {
          label:"Tháng 10",
          value: "10",
        },
        {
          label:"Tháng 11",
          value: "11",
        },
        {
          label:"Tháng 12",
          value: "12",
        }
      ],
      listDHDien:[
        {
          maDongHo:"VE01.01.DIEN.01",
          chiSoCu:"135"
        },
        {
          maDongHo:"VE01.01.DIEN.02",
          chiSoCu:"140"
        }
      ],
      listDHNuoc:[
        {
          maDongHo:"VE01.01.NUOC.02",
          chiSoCu:"89"
        },
      ]
      };
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      for(let i = year; i >= year - 1 ; i--)
      {
        this.state.listNam.push({
            label: i.toString(),
            value: i.toString()
        });
      }
      this.setState({
         chonNam:year
      });

      this.setState({
         listThang: data.listThang
      });

      this.setState({
         listDongHoDien: data.listDHDien
      });

      this.setState({
         listDongHoNuoc: data.listDHNuoc
      });
    }

    changeThang(value)
    {
      this.setState({
        chonThang: value,
      });
    }

    changeNam(value)
    {
      this.setState({
        chonNam: value,
      });
    }

    SaveChiSo(){
      
    }

      render() {
        const placeholderThang = {
              label: 'Chọn tháng',
              value: null,
              color: '#000',
            };
        const placeholderNam = {
              label: 'Chọn năm',
              value: null,
              color: '#000',
            };
          return (
            <View style={{flex: 1}}>
            <ScrollView style={styles.container_scroll}>
                <View style={styles.container}>
                  <View style={styles.wapper_item}>
                    <Text style={styles.title_input}>
                      Kỳ tính phí
                    </Text>
                      <View style={styles.wapper_search}>
                          <View style={styles.input_left}>
                              <RNPickerSelect
                                 placeholder={placeholderThang}
                                 items={this.state.listThang}
                                 onValueChange={value => {
                                   this.changeThang(value);
                                 }}
                                 Icon={() => {
                                  return <Icon name="ios-arrow-down" style={styles.icon_dropdown} size={30} color="#fff" />;
                                }}
                                 style={pickerSelectStyles}
                                 value={this.state.chonThang}
                                 useNativeAndroidPickerStyle={false}
                               />
                           </View>
                           <View style={[styles.input_left, styles.input_right]}>
                               <RNPickerSelect
                                  placeholder={placeholderNam}
                                  items={this.state.listNam}
                                  onValueChange={value => {
                                    this.changeNam(value);
                                  }}
                                  Icon={() => {
                                   return <Icon name="ios-arrow-down" style={styles.icon_dropdown} size={30} color="#fff" />;
                                 }}
                                  style={pickerSelectStyles}
                                  value={this.state.chonNam}
                                  useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.line_title}>
                      <View style={styles.wapper_title}>
                          <Text style={styles.title_head}>
                              Đồng hồ điện
                          </Text>
                      </View>
                    </View>
                    <View style={styles.list_item_dong_ho}>
                        <FlatList
                          data={this.state.listDongHoDien}
                          renderItem={({ item }) => (
                              <View style={[styles.item_dong_ho_wapper]}>
                                  <Text style={styles.title_dong_ho} numberOfLines={2}>Mã số: {item.maDongHo}</Text>
                                  <View style={[styles.item_dong_ho]}>
                                      <View style={styles.input_left}>
                                          <Text style={[styles.title_input, styles.title_input_chi_so]}>
                                            Chỉ số cũ
                                          </Text>
                                          <TextInput style = {[styles.input_chi_so, {backgroundColor:'#bbc2cc'}]}
                                              autoCapitalize="none"
                                              autoCorrect={false}
                                              placeholderTextColor='#595959'
                                              underlineColorAndroid="transparent"
                                              editable = {false}
                                              value={item.chiSoCu}
                                          />
                                      </View>
                                      <View style={[styles.input_left, styles.input_right]}>
                                          <Text style={[styles.title_input, styles.title_input_chi_so]}>
                                            Chỉ số mới
                                          </Text>
                                          <TextInput style = {[styles.input_chi_so]}
                                              autoCapitalize="none"
                                              autoCorrect={false}
                                              placeholderTextColor='#595959'
                                              underlineColorAndroid="transparent"
                                              keyboardType={'number-pad'}
                                              returnKeyType="next"
                                          />
                                      </View>
                                  </View>
                              </View>
                          )}
                        />
                    </View>
                    <View style={styles.line_title}>
                      <View style={styles.wapper_title}>
                          <Text style={styles.title_head}>
                              Đồng hồ nước
                          </Text>
                      </View>
                    </View>
                    <View style={styles.list_item_dong_ho}>
                        <FlatList
                          data={this.state.listDongHoNuoc}
                          renderItem={({ item }) => (
                              <View style={[styles.item_dong_ho_wapper]}>
                                  <Text style={styles.title_dong_ho} numberOfLines={2}>Mã số: {item.maDongHo}</Text>
                                  <View style={[styles.item_dong_ho]}>
                                      <View style={styles.input_left}>
                                          <Text style={[styles.title_input, styles.title_input_chi_so]}>
                                            Chỉ số cũ
                                          </Text>
                                          <TextInput style = {[styles.input_chi_so, {backgroundColor:'#bbc2cc'}]}
                                              autoCapitalize="none"
                                              autoCorrect={false}
                                              placeholderTextColor='#595959'
                                              underlineColorAndroid="transparent"
                                              editable = {false}
                                              value={item.chiSoCu}
                                          />
                                      </View>
                                      <View style={[styles.input_left, styles.input_right]}>
                                          <Text style={[styles.title_input, styles.title_input_chi_so]}>
                                            Chỉ số mới
                                          </Text>
                                          <TextInput style = {[styles.input_chi_so]}
                                              autoCapitalize="none"
                                              autoCorrect={false}
                                              placeholderTextColor='#595959'
                                              underlineColorAndroid="transparent"
                                              keyboardType={'number-pad'}
                                              returnKeyType="next"
                                          />
                                      </View>
                                  </View>
                              </View>
                          )}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.btn_wapper}>
                <TouchableHighlight
                  style={styles.btn_gui}
                  onPress={() => this.SaveChiSo()} underlayColor="transparent">
                    <Text style={styles.text_send}>Lưu chỉ số</Text>
                </TouchableHighlight>
            </View>
            </View>
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

  icon_dropdown:{
      position: 'absolute',
      top:20,
      right:10
  },
  wapper_item:{
    marginBottom:15,
    paddingHorizontal:10,
    marginTop:10
  },
  title_input:{
    fontFamily: "Nunito-Bold",
    fontSize:16,
  },
  title_input_chi_so:{
    marginBottom:10
  },
  wapper_search:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex:1
  },
  input_left:{
      width: width / 2 - 10,
      marginRight:10
  },
  input_right:{
    width: width / 2 - 20,
  },
  line_title:{
    borderBottomWidth:1,
    borderColor:'#AA2829',
    position:'relative',
    paddingBottom:20,
    marginBottom:20,
    marginHorizontal:10
  },
  title_head:{
    fontFamily: "Nunito-Bold",
    fontSize:16,
    color:'#AA2829',
    textAlign:'center',
  },
  wapper_title:{
    borderWidth:1,
    borderColor:'#AA2829',
    backgroundColor:'#fff',
    paddingVertical:5,
    paddingHorizontal:15,
    borderRadius:5,
    position: 'absolute',
    top: 3,
    left: (Dimensions.get('window').width / 2) - 80,
    justifyContent: 'center',
    alignItems: 'center',
    width:140,
    margin: 'auto',
  },
  list_item_dong_ho:{
    padding:10,
  },
  item_dong_ho:{
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex:1
  },
  title_dong_ho:{
    color:'#AA2829',
    fontFamily: "Nunito-Bold",
    fontSize:16,
  },

  input_chi_so:{
      backgroundColor:'#d6dce5',
      borderRadius:5,
      fontSize:16,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:10,
      paddingRight:10,
      fontFamily: "Nunito-Regular",
      width:'100%',
      textAlign:'right',
      color:'#000'
  },
  btn_wapper:{
    padding:10,
  },
  btn_gui:{
    backgroundColor:'#aa2829',
    padding:15,
    borderRadius:50,
    textAlign:'center',
    marginLeft:'auto',
    width: '100%'
  },
  text_send:{
    fontFamily: "Nunito-Bold",
    fontSize:16,
    color:'#fff',
    textAlign:'center'
  },
  item_dong_ho_wapper:{
    marginBottom:20
  }
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000',
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
export default  AddChiSoScreen;
