import React from 'react';
import { Text, View } from 'react-native';
import i18n from '../i18n';

import SettingsListItem from './SettingsListItem';

const settings = [
  {
    name: 'settings.information',
    screen: 'Information',
    icon:'ios-information-circle-outline',
    item_last:'',
    color:'#AA2829'
  },

  {
    name: 'settings.about',
    screen: 'About',
    icon:'ios-phone-portrait',
    item_last:'',
    color:'green'
  },
  {
    name: 'settings.form_mau',
    screen: 'Forms',
    icon:'ios-document',
    item_last:'',
    color:'orange'
  },
  {
    name: 'settings.display_language',
    screen: 'LanguageSelector',
    icon:'ios-globe',
    item_last:'1',
    color:'#357edd'
  },

];

class SettingsList extends React.Component {

  render() {
    return (
      <View>
        {
          settings.map((item) => (
            <SettingsListItem
              key={item.name}
              title={item.name}
              icon={item.icon}
              itemlast = {item.item_last}
              color={item.color}
              onPress={() => this.props.onPressItem(item.screen)}
            />
          ))
        }
      </View>
    );
  }
};

export default SettingsList;
