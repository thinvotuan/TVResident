import React , { Component }  from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight, Dimensions,StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import i18n from '../i18n';

import HTMLView from 'react-native-htmlview';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')


const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Notification')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết thông báo</Text>
    </TouchableHighlight>

  </View>
);
//<View style={styles.wapper_title_main}>
  //<Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chi tiết</Text>
//</View>
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


class ViewThongBaoScreen extends React.Component {
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
        MaThongBao: this.props.navigation.getParam('id'),
        listFile:[],
        tieuDe:'',
        noiDung:'',
        tieuDeFile:'', 
        isLoading:true
      };
    }

    componentDidMount(){
      this.Information();
    }
    Information() {   
      var that = this;
      
      var urlDA = 'https://webapi.newcitythuthiem.com.vn/api/Users/ChiTietThongBao' + "?maPhieu=" + this.state.MaThongBao;
      fetch(urlDA,{
          method: 'POST',
          }).then(function (response) { return response.json();
          }).then(res => {
            this.setState({
              tieuDe: res.TieuDe,
              noiDung:res.NoiDung,
              isLoading:false,
              listFile:res.FileThongBao,
              tieuDeFile:'Danh sách file đính kèm:'
            });
            
          }).catch(function (error) {
              Alert.alert("Thông báo","Lỗi: "+error);
      });
  }

  handleViewFile(item){
    const navigateAction = NavigationActions.navigate({
      routeName: 'ViewFilePDF',
      params: {
        tenFile: item.TenDomain,
        tieuDeFile: item.TenFileDinhKem
      }
    });
    this.props.navigation.navigate(navigateAction);
  }

  render(){
    return (
      <ScrollView style={styles.container_scroll} >
          <View style={styles.container}>
                <Text style={styles.title}>{this.state.tieuDe}</Text>
                <View style={styles.wapper_description}>
                  <HTMLView
                      value={"<newCustomElement>"+this.state.noiDung+"</newCustomElement>"}
                      stylesheet={webViewStyle}
                  />
                  
                  <View styles={styles.wapper_file}>
                      <Text style={styles.wapper_title}>{this.state.tieuDeFile}</Text>
                      <FlatList
                          style={styles.list_file}
                          data={this.state.listFile}           
                          renderItem={({ item, index }) => (
                            <TouchableHighlight onPress={() => this.handleViewFile(item)}  underlayColor="transparent">
                              <View>
                                  <Text style={styles.title_file} numberOfLines={2}>{item.TenFileDinhKem}</Text>
                                  <Text style={styles.title_click}>(Xem chi tiết)</Text>                                  
                              </View>
                            </TouchableHighlight>
                          )}
                        />
                    </View>
                </View>
                <ActivityIndicator animating={this.state.isLoading} size="large" />
          </View>
      </ScrollView>
    )
  }
}

const webViewStyle = StyleSheet.create({ 
  a: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  p: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  li: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  em: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  strong: {
    fontFamily: "Nunito-Bold",
    lineHeight:23,
    fontSize: 16,
  },
  u: {
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
 });

const styles = {
  container_scroll:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    fontFamily: "Nunito-Regular",
    backgroundColor:'#fff',
    padding:10
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
    paddingLeft:50,
  },
  wapper_description:{
    paddingLeft:20,
    marginTop:10
  },
  title:{
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    fontWeight:'600',
    lineHeight:23,
  },
  description:{
    fontFamily: "Nunito-Regular",
    lineHeight:23,
    fontSize: 16,
    fontWeight:'600'
  },
  wapper_title:{
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    marginBottom:5,
  },
  title_file:{
    fontFamily: "Nunito-Regular",
    fontSize: 16,
  }
  ,wapper_file:{
    marginTop:10
  },
  title_click:{
    color:'navy',
    fontSize:13
  }
}

export default ViewThongBaoScreen;
