import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
const dimensions = Dimensions.get("window").width;

/*const NotificationRow = (props) => (
  <View  style={styles.container}>
    <View style={styles.infor_image}>
      <TouchableHighlight style={styles.wapper_button} underlayColor="transparent"  onPress={() => this.handlerButtonOnClick(`${props.id}`)} >
        <Icon name = {`${props.statusSave}`==='0' ? "ios-star-outline" :'ios-star'} size={30}  style={{ color: `${props.statusSave}`==='0' ? "#ccc" :'#fdbc45', textAlign:'center'}}/>
      </TouchableHighlight>
    </View>
    <View style={styles.infortintuc}>
      <View>
        <Text style={[styles.text, {fontFamily: `${props.status}` =='1' ? 'Nunito-Bold' : 'Nunito-Regular' }]} numberOfLines={2}>
          {`${props.title}`}
        </Text>
      </View>
      <View  style={styles.wapper_bottom}>
        <Text style={[styles.datetime , {fontFamily: `${props.status}` =='1' ? 'Nunito-Bold' : 'Nunito-Regular' }]} numberOfLines={2}>
          {`${props.datetime}`} - {`${props.tenDuAn}`}
        </Text>
      </View>
    </View>
  </View>
);*/

class Notification extends React.Component {
    constructor(props){
      super();
      this.props = props;
      this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this);
      this.state = {
        saveRow: this.props.statusSave,
      };
    }

    handlerButtonOnClick = (id) => {
      if(this.state.saveRow==='0')
      {
        this.setState({ saveRow : '1' });
      }
      else {
        this.setState({ saveRow : '0' });
      }
  }
    render() {
      return (
        /*<NotificationRow {...this.props}/>*/
        <View  style={styles.container}>
          <View style={styles.infor_image}>
            <TouchableHighlight style={styles.wapper_button} underlayColor="transparent"  onPress={() => this.handlerButtonOnClick(`${this.props.id}`)} >
              <Icon name = {`${this.state.saveRow}`==='0' ? "ios-star-outline" :'ios-star'} size={30}  style={{ color: `${this.state.saveRow}`==='0' ? "#ccc" :'#fdbc45', textAlign:'center'}}/>
            </TouchableHighlight>
          </View>
          <View style={styles.infortintuc}>
            <View>
              <Text style={[styles.text, {fontFamily: `${this.props.status}` =='1' ? 'Nunito-Bold' : 'Nunito-Regular' }]} numberOfLines={2}>
                {`${this.props.title}`}
              </Text>
            </View>
            <View  style={styles.wapper_bottom}>
              <Text style={[styles.datetime , {fontFamily: `${this.props.status}` =='1' ? 'Nunito-Bold' : 'Nunito-Regular' }]} numberOfLines={1}>
                {`${this.props.datetime}`} - {`${this.props.tenDuAn}`}
              </Text>
            </View>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    marginBottom:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderColor:'#ddd'
  },
  infor_image:{
    width:'12%',
    marginRight:'3%',
  },
  wapper_button:{
    width:'100%',
    height:'100%',
    justifyContent: 'center',flexDirection: 'row',flex:1,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight:'600',
    fontFamily: "Nunito-Regular",
  },
  datetime: {
    fontSize: 13,
    color:'#000',
    fontFamily: "Nunito-Regular",
  },
  photo: {
    height: '100%',
    minHeight:70,
    width: '100%',
    borderColor:'#ccc',
    borderWidth:0.5,
    borderRadius:5
  },
  infortintuc:{
    width: '85%'
  },
  status:{
    color:'#fff',
    fontFamily: "Nunito-Regular",
  },
  wapper_bottom:{
    marginTop:5,
    justifyContent: 'flex-start',flexDirection: 'row',
    alignItems: 'flex-end', flex:1
  }
});
export default Notification;
