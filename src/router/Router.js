import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Forecast from '../pages/Forecast';
import Home from '../pages/Home';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName={Forecast}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Forecast"
        component={Forecast}
        options={{
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
