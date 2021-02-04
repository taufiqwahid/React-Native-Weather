import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import ForecastCard from '../components/card/ForecastCard';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
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
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState, props) => ({
          forecast: data,
        }));
      });
  }

  componentDidMount() {
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
      (error) => this.setState({forecast: error.message}),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.forecast.list}
        style={{marginTop: 20}}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({item}) => (
          <ForecastCard
            idnya={item.dt}
            detail={item}
            location={this.state.forecast.city.name}
          />
        )}
      />
    );
  }
}