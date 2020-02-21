import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,SafeAreaView,
RefreshControl } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('Settings')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('Settings')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>{i18n.t('settings.form_mau')}</Text>
    </TouchableHighlight>

  </View>
);

const ImageHeader = props => (
    <View style={styles.container_logo}>
        <View style={styles.wapper_img}>
            <Image
              style={styles.logo}
              source={require('../images/TVResident_color.png')}
            />
        </View>
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );
  class FormsScreen extends React.Component {
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
          listfile:[],
          isRefreshing: false,
        };
        this.init();
        this.onRefresh = this.onRefresh.bind(this)
      }

      init(){
        this.state = {
          listfile: [
            {
              id:1,
              title: "Biểu mẫu đăng ký nhân khẩu",
            }, {
              id:2,
              title: "Biểu mẫu đăng ký tập Gym",
            }, {
              id:3,
              title: "Biểu mẫu đăng ký Internet",
            },
          ],
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
          routeName: 'ViewForm',
          params: {
            id: id,
          }
        });
        this.props.navigation.navigate(navigateAction);
      }
      componentDidMount(){

      }

    render() {
      const { search } = this.state;
      const placeholder = {
            label: 'Chọn tầng',
            value: null,
            color: '#ccc',
          };
      return (
        <ScrollView style={styles.container_scroll}
        refreshControl={
          <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
        }>
            <View style={styles.container}>
                <View style={styles.container_list}>
                    <FlatList
                      style={styles.container_TinTuc}
                      data={this.state.listfile}
                      renderItem={({ item }) => (
                        <TouchableHighlight onPress={() => this.handlePress(item.id)}  underlayColor="transparent">
                          <View style={[styles.item]}>
                            <Icon style={[styles.icon_left,{color:'#AA2829'}]} name="ios-attach" size={28} />
                            <View style={styles.wapper_text}>
                                <Text style={styles.listItemText} numberOfLines={2}>{item.title}</Text>
                            </View>
                          </View>
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
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignItems: 'center',
      marginBottom:0,
      paddingTop:15,
      paddingBottom:15,
      borderBottomWidth:1,
      borderColor:'#ddd'
    },
    icon_left:{
      textAlign:'center',
      marginRight:15,
    },
    listItemText: {
      fontSize: 18,
      color: '#434343',
      fontFamily: "Nunito-Regular",
    },
  }
export default FormsScreen;
