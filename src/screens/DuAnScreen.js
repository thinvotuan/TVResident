import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, StatusBar, TextInput, Dimensions, TouchableHighlight,
RefreshControl,FlatList,AsyncStorage,ActivityIndicator } from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import i18n from '../i18n';
import DuAnRow from '../components/DuAnRow'

const { height, width } = Dimensions.get('window')


class DuAnScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super();
      this.props = props;
      this.state = {
        search: '',
        isRefreshing: false,
        listDuAn:[],
        loading: false,
        refreshing : false,
      };
      this.handlePress = this.handlePress.bind(this);
      this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount(){
      this.GetDuAn();
    }

    async GetDuAn() {   
      this.setState({ loading: true });
      const value = await AsyncStorage.getItem('username');
      var that = this;
      var urlDA = 'https://webapi.newcitythuthiem.com.vn/api/Users/ListDuAn' + "?userName=" + value;
      fetch(urlDA,{
        method: 'POST',
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          listDuAn: [...res],
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
       
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
    onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
          this.setState({
            isRefreshing: false
          },
          () => {
            this.GetDuAn();
          });
        }, 2000);
      }

  handlePress = (id) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Dashboard',
      params: {
        id: id,
      }
    });
    this._storeData(id);    
    this.props.navigation.navigate(navigateAction);
  }
  _storeData = async (text) => {
    try {
      await AsyncStorage.setItem('cacheDuAn', text);
    } catch (error) {}};

  updateSearch = search => {
    this.setState({ search });
  };

  SearchFilterFunction(text)
  {}

  render() {
    const { search } = this.state;

    return (
      <ScrollView style={styles.container_scroll}
      refreshControl={
        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
      } >
          <View style={styles.container}>
            <View style={styles.container_logo}>
                <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResident_white.png')} />
            </View>

             <View style={styles.container_list}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <FlatList
                      data={this.state.listDuAn}           
                      keyExtractor={item => item.MaDuAn}
                      refreshing = {this.state.refreshing}
                      renderItem={({ item, index }) => (
                            <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(item.MaDuAn)}  underlayColor="transparent">
                                <DuAnRow width={width} id={item.MaDuAn}
                                    name={item.TenDuAn}
                                    imageUri={{uri:item.HinhAnh}}
                                />
                            </TouchableHighlight>
                      )}
                />
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
  wapper_duan:{
    width: width / 2 - 15,
    height: width / 2 - 30,
    backgroundColor:'#fff',
    borderRadius:4
  },
  container_list:{
    marginTop:10
  }
}
export default DuAnScreen;
