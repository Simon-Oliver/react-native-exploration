import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  FlatList,
  Dimensions,
  Button,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'; //@react-navigation/native
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

import Temperature from './pages/Temperature';
import Home from './pages/Home';
import Nav from './components/Nav';
import Settings from './pages/Settings';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Temperature"
            component={Temperature}
            options={{title: 'Temperature', animationEnabled: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home', animationEnabled: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{title: 'Settings', animationEnabled: false}}
          />
        </Stack.Navigator>
        <Nav navigationRef={navigationRef}></Nav>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: '#0D0D0D',
    width: window.width,
    height: window.height,
  },
});
