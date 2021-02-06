import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, Image} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {IconHumidity, IconLocation, IconWind} from '../assets/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PermissionsAndroid} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      weather: [],
      city: [],
      temp: [],
      wind: [],
      dt: [],
      error: '',
    };
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    let apiKey = 'e5ca57175c2aa3ce883d9cf01eb8445a';
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=${apiKey}`;
    // Call the API, and set the state of the weather forecast

    axios.get(url).then((response) => {
      this.setState({
        city: response.data.name,
        weather: response.data.weather[0],
        temp: response.data.main,
        wind: response.data.wind,
        dt: response.data.dt,
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
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            this.setState(
              () => ({
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
      city: [],
      weather: [],
      temp: [],
      wind: [],
      dt: [],
    });
  }

  render() {
    var data = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <IconLocation style={styles.iconLocation} />
          <Text style={styles.location}>{data.city}</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://openweathermap.org/img/wn/' +
              data.weather.icon +
              '@4x.png',
          }}
        />
        <View style={styles.card}>
          <Text style={styles.temp}>
            {Math.round(data.temp.temp * 10) / 10}&#8451;
          </Text>
          <Text style={styles.weather}>{data.weather.main}</Text>
          <View style={styles.details}>
            <View style={styles.icon}>
              <IconHumidity style={styles.Text} />
              <IconWind style={styles.Text} />
            </View>
            <View>
              <Text style={styles.Text}>Wind</Text>
              <Text style={styles.Text}>Hum</Text>
            </View>
            <View>
              <Text style={styles.Text}>|</Text>
              <Text style={styles.Text}>|</Text>
            </View>
            <View>
              <Text style={styles.Text}>{data.wind.speed} Km/h</Text>
              <Text style={styles.Text}>{data.temp.humidity} %</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Forecast')}>
          <Text style={styles.textButton}>Show Forecast {data.city}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    color: 'white',
    textShadowColor: '1px 5px 8px rgba(209,198,195,0.88)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  page: {
    backgroundColor: '#47BFDF',
    flex: 1,
    padding: 22,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  iconLocation: {width: 30, height: 30, marginRight: 5},
  location: {fontSize: 20, color: 'white', marginLeft: 5},
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    width: 247,
    height: 235,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  temp: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    textShadowColor: '1px 5px 8px rgba(76,72,71,0.88)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  weather: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
  details: {
    marginTop: 45,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: '#F5B41A',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textButton: {
    color: 'white',
  },
});
