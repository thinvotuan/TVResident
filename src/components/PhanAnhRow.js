import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Dimensions } from 'react-native';

const dimensions = Dimensions.get("window").width;

const PhanAnhRow = (props) => (
  <View  style={styles.container}>
    <View style={styles.infor_image}>
      <Image source={{ uri: props.thumbnail}} style={styles.photo} />
    </View>
    <View style={styles.infortintuc}>
      <View>
        <Text style={styles.text} numberOfLines={2}>
          {`${props.title}`}
        </Text>
      </View>
      <View  style={styles.wapper_bottom}>
        <Text style={styles.datetime} >
          {`${props.datetime}`}
        </Text>
        <View style={{backgroundColor:props.statusInt=='1' ? '#AA2829' : (props.statusInt=='2' ? '#ed7d31' : '#00b050'), marginLeft:'auto', paddingLeft:5, paddingRight:5, borderRadius:5, paddingBottom:4, paddingTop:3}} >
          <Text style={styles.status} >
            {`${props.status}`}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default PhanAnhRow;

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
    width:'20%',
    marginRight:'3%'
  },
  text: {
    fontSize: 16,
    fontWeight:'600',
    fontFamily: "Nunito-Regular",
  },
  datetime: {
    fontSize: 14,
    color:'#999',
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
    width: '77%'
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
