import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, StatusBar, TextInput, Dimensions, TouchableHighlight,
RefreshControl } from 'react-native';

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
      };
      this.handlePress = this.handlePress.bind(this);
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
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(1)}  underlayColor="transparent">
                        <DuAnRow width={width} id={1}
                            name="Chung cư Newcity Quận 2"
                            imageUri={require('../images/mb3.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(2)}  underlayColor="transparent">
                        <DuAnRow width={width} id={2}
                            name="Khu đô thị Quận 9"
                            imageUri={require('../images/mb1.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(3)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="The Cozy Place"
                            imageUri={require('../images/mb5.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(4)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="Khu đô thị quận 10"
                            imageUri={require('../images/mb5.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(5)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="Khu đô thị quận 10"
                            imageUri={require('../images/mb5.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(1)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="Khu đô thị quận 10"
                            imageUri={require('../images/mb5.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(1)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="Khu đô thị quận 10"
                            imageUri={require('../images/mb5.jpg')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.wapper_duan} onPress={() => this.handlePress(1)}  underlayColor="transparent">
                        <DuAnRow width={width} id={3}
                            name="Khu đô thị quận 10"
                            imageUri={require('../images/mb5.jpg')}
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
