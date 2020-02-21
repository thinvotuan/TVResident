import React , { Component }  from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight, Dimensions, TouchableOpacity, TextInput, Button,Alert,
Modal,ActivityIndicator } from 'react-native';
import i18n from '../i18n';
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker';

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { NavigationActions, DrawerActions } from 'react-navigation';
const { height, width } = Dimensions.get('window')

const Header = props => (
  <View style={{justifyContent: 'flex-start',flexDirection: 'row',
  alignItems: 'flex-end', flex:1}}>
    <TouchableHighlight
      style={{ paddingLeft: 10, paddingRight: 15, paddingBottom:15 }}
      onPress={() => props.navigation.navigate('PhanAnh')} underlayColor="transparent">
        <Icon name="md-arrow-round-back" size={25}  style={styles.back_icon}/>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => props.navigation.navigate('PhanAnh')} underlayColor="transparent">
        <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Thêm phản ánh</Text>
    </TouchableHighlight>

  </View>
);
/*<View style={styles.wapper_title_main}>
  <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 20, paddingBottom:15}}>Thêm phản ánh</Text>
</View>*/
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

class AddPhanAnhScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { color: '#fff' },
    header: (props) => <ImageHeader {...props} />,
    headerRight: null,
    headerLeft: null,
  };

  constructor(props){
      super(props);
      this.state = {
        tieuDe:'',
        noiDung:'',
        isLoading: false,
        pickedImage:null,
        width_Img:0,
        height_Img:0,
      };
  }



  ChonHinh = () => {
    ImagePicker.showImagePicker({title: "Chọn hình ảnh", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("Bạn đã hủy chọnc");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri },
          width_Img:135,
          height_Img:135,
        });

      }
    });
  }
  ResetHinh = () =>{
      this.setState({
       pickedImage: null,
       width_Img:0,
       height_Img:0,
     });
  }

  SendPhanAnh = (tieuDe, noiDung) => {
   if((tieuDe === undefined || tieuDe == null || tieuDe.length <= 0)
     ||(noiDung === undefined || noiDung == null || noiDung.length <= 0)){
        Alert.alert('Thông báo','Vui lòng điền thông tin phản ánh');
   }
   else{
     const params = {
       tieuDe : tieuDe,
       noiDung : noiDung,
     };
     this.setState({isLoading: true});
     this.setState({isLoading: false});
   }
  }

  render(){
    return (
      <ScrollView style={styles.container_scroll} >
          <View style={styles.container}>
            <View style={styles.wapper_form}>
                <Text style={styles.title_form}>Tiêu đề</Text>
                <View style={styles.input_wapper}>
                  <TextInput style = {[styles.input, styles.tieu_de]}
                              autoCapitalize="none"
                              autoCorrect={false}
                              returnKeyType="next"
                              placeholder='Vui lòng nhập tiêu đề'
                              placeholderTextColor='#595959'
                              underlineColorAndroid="transparent"
                              onChangeText={(tieuDe) => this.setState({tieuDe})}
                  />
                </View>
                <Text style={styles.title_form}>Nội dung phản ánh</Text>
                <View style={styles.input_wapper}>
                    <TextInput style = {[styles.input, styles.noi_dung]}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                placeholder='Vui lòng nhập nội dung'
                                placeholderTextColor='#595959'
                                multiline={true}
                                numberOfLines={10}
                                underlineColorAndroid="transparent"
                                onChangeText={(noiDung) => this.setState({noiDung})}
                    />
                  </View>
              </View>
              <View style={styles.wapper_button}>
                  <View style={styles.ImageSections}>
                    <Image source={this.state.pickedImage} style={{width: this.state.width_Img,
                    height:  this.state.height_Img,
                    borderRadius:5,
                    borderWidth:1,
                    borderColor:'#ccc'}} />
                    <View style={{width: this.state.width_Img,
                    height:  30,
                    backgroundColor:'#AA2829',
                    bottom:0,
                    position:'absolute',
                  }}>
                      <TouchableHighlight
                        style={styles.btn_xoa_hinh}
                        onPress={() => this.ResetHinh()} underlayColor="transparent">
                          <Icon name="ios-remove-circle" size={25}  style={styles.img_icon_de}/>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <View style={styles.wapper_button_img}>
                      <TouchableHighlight
                        style={styles.btn_chon_hinh}
                        onPress={() => this.ChonHinh()} underlayColor="transparent">
                          <Icon name="ios-image" size={25}  style={styles.img_icon}/>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={styles.btn_gui}
                        onPress={() => this.SendPhanAnh(this.state.tieuDe, this.state.noiDung)} underlayColor="transparent">
                          <Text style={styles.text_send}>Gửi phản ánh</Text>
                      </TouchableHighlight>
                  </View>
              </View>
              <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
                  <Modal transparent={true} animationType={'none'}
                      visible={this.state.isLoading}>
                      <View style={styles.modalBackground}>
                        <View style={styles.activityIndicatorWrapper}>
                          <ActivityIndicator
                            animating={this.state.isLoading} size="large" />
                        </View>
                      </View>
                    </Modal>
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
    padding:10,
    position:'relative'
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
    paddingLeft:40
  },
  container_list:{
    margin:10
  },
  input:{
      backgroundColor:'#d6dce5',
      borderRadius:5,
      fontSize:16,
      padding:10,
      fontFamily: "Nunito-Regular",
  },
  input_wapper:{
    marginBottom:10
  },
  title_form:{
    marginBottom:5,
    fontFamily: "Nunito-Bold",
    fontSize:16,
  },
  noi_dung:{
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  },
  wapper_form:{
  },
  wapper_button:{
  },
  wapper_button_img:{
    flexDirection: 'row',
    flex:1
  },
  img_icon:{
    color:'#fff',
    textAlign:'center'
  },
  btn_chup_hinh:{
    backgroundColor:'#00b050',
    width:100,
    padding:10,
    textAlign:'center',
    justifyContent: 'center',
    borderRadius:50
  },
  btn_chon_hinh:{
    backgroundColor:'#4472c4',
    width:100,
    padding:10,
    textAlign:'center',
    justifyContent: 'center',
    borderRadius:50
  },
  btn_gui:{
    backgroundColor:'#aa2829',
    padding:15,
    borderRadius:50,
    textAlign:'center',
    marginLeft:'auto',
    width: width - 130
  },
  text_send:{
    fontFamily: "Nunito-Regular",
    fontSize:16,
    color:'#fff',
    textAlign:'center'
  },
    modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  images:{
    width:100,
    height:100,
    resizeMode: 'contain',
    margin:5
  },
  ImageSections:{
    flex:1,
    flexDirection: 'row',
    marginBottom:10,
    position:'relative'
  },
  img_icon_de:{
    color:'#fff',
    textAlign:'center'

  }
}
export default AddPhanAnhScreen;
