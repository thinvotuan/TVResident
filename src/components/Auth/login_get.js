import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'username';

export const username_login = async () => {
  try {
    const  userName = await AsyncStorage.getItem(STORAGE_KEY);
    if(JSON.stringify(userName)==='' || userName===null || userName.length <=0 || userName === undefined || userName === '')
    {
      userName = 'none_0';
    }
    return userName;
  } catch (error) {
    console.log('Error loading get user', error);
  }
}
