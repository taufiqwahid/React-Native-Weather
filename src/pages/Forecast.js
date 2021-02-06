import React, {Component} from 'react';
import {FlatList, View, PermissionsAndroid, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import ForecastCard from '../components/card/ForecastCard';
import axios from 'axios';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    // Construct the API url to call
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=a4c53e3bfccfd232681f269492135c43';

    // Call the API, and set the state of the weather forecast
    axios.get(url).then((response) => {
      this.setState({
        forecast: response.data,
      });
    });
  }

  componentDidMount = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission Location',
          message:
            'Wheater App needs access to your location ' +
            'so you can see Forecast.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            this.setState(
              (prevState) => ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }),
              () => {
                this.getWeather();
              },
            );
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            alert('If you want to use, please activate your Location');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        alert('If you want to use, please activate your Location');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentWillUnmount() {
    this.setState({
      forecast: [],
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.forecast.list}
        style={{marginTop: 20}}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({item}) => (
          <ForecastCard
            detail={item}
            location={this.state.forecast.city.name}
          />
        )}
      />
    );
  }
}
