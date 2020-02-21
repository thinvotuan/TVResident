import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import {NavigationActions, DrawerActions} from 'react-navigation';
import PropTypes from 'prop-types';

class DuAnRow extends Component {

  constructor(props) {
    super(props);

    }

    render() {
        return (
              <View style={{ width: this.props.width / 2 - 15, height: this.props.width / 2 - 40,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black', shadowOpacity: 0.2,
                elevation: 1,
                borderRadius:4,
                borderColor:'#ddd',
                borderWidth:0.5,
                backgroundColor:'#fff'
                }}>
                  <View style={{height: this.props.width / 2 - 90}}>
                      <Image style={styles.image_duan}
                          source={this.props.imageUri} />
                  </View>
                  <View style={styles.title_wapper}>
                      <Text style={styles.title_duan} numberOfLines={2}>{this.props.name}</Text>
                  </View>
              </View>
        );
    }
}
export default DuAnRow;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    wapper_duan:{
        flex: 1,
    },
    image_duan:{
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
    title_wapper:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
       paddingLeft:10,
       paddingRight:10,
       backgroundColor:'#fff'
    },
    title_duan:{
      fontSize: 16,
      fontWeight: '600',
      fontFamily: "Nunito-Regular",
      textAlign:'center'
    }

});
