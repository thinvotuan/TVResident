import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput,
RefreshControl } from 'react-native';
import i18n from '../i18n';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons'


import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import TienIchRow from '../components/TienIchRow'

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
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Tiện ích cư dân</Text>
    </TouchableHighlight>

  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Tiện ích cư dân</Text>
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

class TienIchScreen extends React.Component {
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
        isRefreshing: false,
        idDuAn: this.props.navigation.getParam('id'),
      };
      this.onRefresh = this.onRefresh.bind(this)
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
                    placeholder="Tìm kiếm tiện ích ..."
                    placeholderTextColor="#ccc2c2"
                />
            </View>
            <View style={styles.container_list}>
               <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(1)}  underlayColor="transparent">
                       <TienIchRow width={width} id={1}
                           name="Sân Tennis"
                           imageUri={require('../images/tienich/tennis.jpg')}
                       />
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(2)}  underlayColor="transparent">
                       <TienIchRow width={width} id={2}
                           name="BBQ Ngoài trời"
                           imageUri={require('../images/tienich/bbq.jpg')}
                       />
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(3)}  underlayColor="transparent">
                       <TienIchRow width={width} id={3}
                           name="Khu vui chơi trẻ em"
                           imageUri={require('../images/tienich/vui-choi.jpg')}
                       />
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(4)}  underlayColor="transparent">
                       <TienIchRow width={width} id={3}
                           name="Gym và Dịch vụ"
                           imageUri={require('../images/tienich/gym.jpg')}
                       />
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(5)}  underlayColor="transparent">
                       <TienIchRow width={width} id={3}
                           name="Hồ bơi Trung tâm"
                           imageUri={require('../images/tienich/Ho-boi.jpg')}
                       />
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.wapper_tienich} onPress={() => this.handlePress(5)}  underlayColor="transparent">
                       <TienIchRow width={width} id={3}
                           name="Công viên Trung tâm"
                           imageUri={require('../images/tienich/cv.jpg')}
                       />
                   </TouchableHighlight>
               </View>
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
  }
}

export default TienIchScreen;
