import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../i18n';
class SettingsListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.listItem, (this.props.itemlast==='' ? styles.item_line : styles.not_item_line)]}
        onPress={this.props.onPress}
      >
        <Icon style={[styles.icon_left, {color:this.props.color}]} name={this.props.icon} size={28} />
        <Text style={styles.listItemText}>{i18n.t(this.props.title)}</Text>
        <Icon style={styles.icon} name="ios-arrow-forward" size={23} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom:15
  },
  listItemText: {
    fontSize: 18,
    color: '#434343',
    width: '90%',
    fontFamily: "Nunito-Regular",
  },
  icon: {
    color: '#CCCCCC',
  },
  item_line:{
    borderBottomWidth:1,
    borderColor:'#ddd'
  },
  icon_left:{
    width:23,
    textAlign:'center',
    marginRight:5
  },
});

export default SettingsListItem;
