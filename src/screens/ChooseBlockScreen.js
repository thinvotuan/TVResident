import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button, FlatList,SafeAreaView,
RefreshControl } from 'react-native';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatGrid } from 'react-native-super-grid';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';

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
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Chọn Block {props.navigation.getParam('id')}</Text>
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

  class ChooseBlockScreen extends React.Component {
    constructor(props){
        super();
        this.props = props;
        this.state = {
          listBlocks:[],
          isRefreshing: false,
          idDuAn: this.props.navigation.getParam('idDuAn'),
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
          const data_block = {
            Block: [
            {
              maBlock:"VE",
              tenBlock: "01.Venice",
            },
            {
              maBlock:"BB",
              tenBlock: "02.Babylon",
            },
            {
              maBlock:"HA",
              tenBlock: "03.Hawaii",
            },
            {
              maBlock:"BA",
              tenBlock: "04.Bali",
            }
          ]};


          this.setState({
             listBlocks: data_block.Block
          });

        }

        ChooseBlock(idBlock){
          const navigateAction = NavigationActions.navigate({
            routeName: 'ChooseTang',
            params: {
              idBlock: idBlock,
              idDuAn:this.state.idDuAn,
            }
          });
          this.props.navigation.navigate(navigateAction);
        }
        render() {
          return (
            <ScrollView style={styles.container_scroll}
            refreshControl={
              <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
            }>
            <View style={styles.container}>
                <View style={styles.wapper_img_block}>
                    <Image
                      style={styles.logo_block}
                      source={require('../images/img_block.jpg')}
                    />
                </View>
                <View style={styles.container_list}>
                    <View style={styles.container_block}>
                          <FlatList
                            data={this.state.listBlocks}
                            numColumns={2}
                            renderItem={({ item }) => (
                              <TouchableHighlight style={styles.wapper_block} onPress={() => this.ChooseBlock(item.maBlock)}  underlayColor="transparent">
                                <View style={[styles.item,{backgroundColor:'#ccc'}]}>
                                  <View style={[styles.wapper_text]}>
                                      <Text style={[styles.listItemText,{color: '#000'}]} numberOfLines={1}>{item.tenBlock}</Text>
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
      borderRadius:50,
      marginBottom:20,
      margin:10,
    },
    listItemText: {
      fontSize: 20,
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
      width: width / 2 - 10,
      backgroundColor:'#fff',
    },
    wapper_img_block:{
      width:'100%',
      height: height / 2 - 75,
      marginBottom:15
    },
    logo_block:{
      width:'100%',
      height:'100%',
      resizeMode: 'contain',
    }

  }
export default ChooseBlockScreen;
