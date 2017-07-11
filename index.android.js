/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

var SearchScreen = require('./SearchScreen');
var SearchResultsScreen = require('./SearchResultsScreen');
var PropertyDetailsScreen = require('./PropertyDetailsScreen');


// Property Finder App extends React.Component, the basic building block of the React UI.
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Property Finder',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.hello}>
          Hello World (Again)
        </Text>
      </View>
    );
  }
}

const PropertyFinderApp = StackNavigator({
  Home: { screen: /*HomeScreen*/SearchScreen },
  SearchResultsScreen: { screen: SearchResultsScreen },
  PropertyDetailsScreen: { screen: PropertyDetailsScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  hello: {
    fontSize: 30,
    textAlign: 'center',
  }
});

// AppRegistry defines the entry point to the application and provides the root component.
AppRegistry.registerComponent('react_native_property_finder', () => PropertyFinderApp);
