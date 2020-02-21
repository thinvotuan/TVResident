import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Không tìm thấy kết nối mạng. Xin thử lại sau.</Text>
    </View>
  );
}

class ConnectionNotice extends PureComponent {
  constructor(props){
    super(props);
    this.state = { testConnected: true};
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({testConnected: isConnected}); }
    );
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  // componentWillUnmount() {  //   NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  // }

  handleFirstConnectivityChange = isConnected => {
    console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
    this.setState({ testConnected: isConnected });
  }

  render() {
    if (!this.state.testConnected) {
      return (<MiniOfflineSign />);
    }

    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});

export default ConnectionNotice;
