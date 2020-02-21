import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions,Switch } from 'react-native';

const dimensions = Dimensions.get("window").width;

/*const NhanKhauRow = (props) => (
  <View  style={styles.container}>
    <View style={styles.infor_image}>
      <Image   source={require('../images/us.png')} style={styles.photo} />
    </View>
    <View style={styles.infortintuc}>
        <View>
          <Text style={styles.text} numberOfLines={2}>
            {`${props.ho_va_ten}`}
          </Text>
        </View>
        <View  style={styles.wapper_bottom}>
          <Text style={styles.datetime} >
            {`${props.quan_he_chu_ho}`} - Ngày chuyển đến {`${props.datetime}`}
          </Text>
        </View>
    </View>
    <View style={styles.status}>
      <Switch  style={styles.status} />
    </View>
  </View>
);*/
class NhanKhauList extends React.Component {
    constructor(props){
      super();
      this.props = props;
      this.state = {
        switchValue: this.props.statusActive
      };
    }
    toggleSwitch = value => {
      this.setState({ switchValue: value });
    };

    render() {
      return (
        <View  style={styles.container}>
          <View style={styles.infor_image}>
            <Image   source={require('../images/src_images_us.png')} style={styles.photo} />
          </View>
          <View style={styles.infortintuc}>
              <View>
                <Text style={styles.text} numberOfLines={2}>
                  {`${this.props.ho_va_ten}`}
                </Text>
              </View>
              <View  style={styles.wapper_bottom}>
                <Text style={styles.datetime} >
                  {`${this.props.quan_he_chu_ho}`} - Ngày chuyển đến {`${this.props.datetime}`}
                </Text>
              </View>
          </View>
          <View style={styles.status_wapper}>
            <Switch  style={styles.status}
                     onValueChange={this.toggleSwitch}
                     value={this.state.switchValue}
            />
          </View>
        </View>
      )
    }
}
export default NhanKhauList;

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
  text: {
    fontSize: 16,
    fontWeight:'600',
    fontFamily: "Nunito-Bold",
    marginBottom:5
  },
  datetime: {
    fontSize: 14,
    color:'#999',
    fontFamily: "Nunito-Regular",
  },
  photo: {
    width:70,
    height:70,
    borderRadius:100
  },
  infortintuc:{
    justifyContent: 'center',
    paddingLeft:10,
    paddingRight:10,
  },
  status_wapper:{
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:10
  },
  status:{
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    width:'100%',
    height:'100%'
  },
});
