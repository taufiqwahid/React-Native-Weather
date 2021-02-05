import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {StyleSheet, View, Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  });
  return (
    <View style={styles.page}>
      <Image
        source={require('../assets/IconLogo.png')}
        style={{width: 200, height: 200}}
      />
      <Text style={styles.text}>Weather App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#47BFDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: 500, height: 200},
  text: {color: 'white', fontSize: 30},
});
