import {NavigationContainer} from '@react-navigation/native';

import React, {Component} from 'react';

import Router from './src/router/Router';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}
