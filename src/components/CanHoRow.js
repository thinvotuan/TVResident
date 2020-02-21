import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage
} from "react-native";

class CanHoRow extends Component {
  constructor(props){
    super();
    this.props = props;
    this.state = {
      chonCanho: this.props.activeTab,
      cacheCanHo:''
    };

  }

  handlePress = (text) => {
    this.setState({ chonCanho : text });
    this._storeData(text);
    this._retrieveData();
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

    render() {
        return (
          /*<TouchableHighlight onPress={() => this.handlePress(this.props.id)} underlayColor="transparent" style={[styles.container_canho, {backgroundColor: (`${this.state.chonCanho}` === `${this.props.id}`)  ? "#AA2829" :'#fff'}]} >*/
              <View style={styles.wapper}>
                  <Text style={[styles.name,{color: `${this.props.activeTab}` === `${this.props.id}` ? "#fff" :'#AA2829'}]}>{this.props.ten_can_ho}</Text>
              </View>
          /*</TouchableHighlight>*/
        );
    }
}
export default CanHoRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name:{
       fontSize:16,
       fontFamily: "Nunito-Regular",
       textAlign:'center',
       alignItems: 'center',
       justifyContent: 'center'
    },
    container_canho:{
      borderWidth:1,
      borderRadius:5,
      marginRight:10,
      padding:15,
      borderColor:'#AA2829'
    }

});
