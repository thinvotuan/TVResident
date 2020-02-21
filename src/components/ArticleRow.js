import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";

class ArticleRow extends Component {

  handlePress = (text) => {

  }

    render() {
        return (
          <TouchableHighlight onPress={() => this.handlePress(this.props.id)} underlayColor="transparent">
              <View style={styles.wapper}>
                    <View style={styles.container_image}>
                        <Image source={this.props.imageUri} style={styles.image} />
                    </View>
                    <View style={styles.title_name}>
                        <Text style={styles.name} numberOfLines={2}>{this.props.name}</Text>
                    </View>
              </View>
          </TouchableHighlight>
        );
    }
}
export default ArticleRow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wapper:{
      width: 230,
      marginRight: 15
    },
    container_image:{
      flex: 2,
      height: 150,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'black', shadowOpacity: 0.2,
      elevation: 1,
      borderRadius:5,
      borderColor:'#ddd',
      borderWidth:0.3,
    },
    image:{
      flex: 1,
      width: null,
       height: null,
       resizeMode: 'cover',
       borderRadius:5
    },
    title_name:{
       flex: 1,
       paddingTop: 5,
    },
    name:{
       fontSize:15,
       fontFamily: "Nunito-Regular",
    }

});
