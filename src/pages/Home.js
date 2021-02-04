import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      weather: [],
      error: '',
    };
  }

  getWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=
      ${this.state.latitude} 
      &lon=
      ${this.state.longitude}
      &units=metric&appid=a4c53e3bfccfd232681f269492135c43`;
    // Call the API, and set the state of the weather forecast
    axios.get(url).then((response) => {
      this.setState({
        forecast: response.data,
      });
    });
  }
  componentDidMount() {
    Geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
        () => {
          this.getWeather();
        };
    });
  }
  render() {
    return (
      <View style={styles.page}>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Forecast')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
