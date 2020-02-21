import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import i18n from '../i18n';
import { loadSettings } from '../storage/settingsStorage';
import { fetchHighScores } from '../storage/highScoreStorage';
import { updateHighScores } from '../actions';

class SplashScreen extends React.Component {
  async componentDidMount() {
    const settings = await loadSettings();
    const highScores = await fetchHighScores();

    if (settings !== null) {
      i18n.locale = settings.locale;
      setTimeout(() => {
            this.props.navigation.navigate('App', {id:1});
       }, 1000)

    }

    if (highScores !== null) {
      this.props.updateHighScores(highScores);
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image resizeMode="contain" style={styles.logo} source={require('../images/TVResidentSplash.png')} />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(170, 40, 41, 1)',
  },
  logo: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
}

const mapDispatchToProps = ({ updateHighScores });

export default connect(null, mapDispatchToProps)(SplashScreen);
