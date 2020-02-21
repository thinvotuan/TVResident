import React, {Component} from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';

async function loginApi(params){
  try {
    let apiLogin = 'https://webapi.newcitythuthiem.com.vn/api/Users/Login' + "?userName=" + params.userName + "&userPass=" + params.userPass + "&token="; ;
    let response = await fetch(apiLogin, {
      method : 'POST',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (e) {
    console.error('Error is: ${e}');
  }
}
export {loginApi};
