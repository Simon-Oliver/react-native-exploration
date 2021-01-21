import React from 'react';
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

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the home screen</Text>
    </SafeAreaView>
  );
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
  text: {
    color: 'white',
    fontSize: 20,
  },
  message: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100,
    width: Dimensions.get('window').width,
  },
  textMsg: {
    textAlign: 'center',
    color: 'white',
  },
  footer: {
    height: '8%',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: 'red',
  },
  footerEl: {
    paddingTop: 10,
    alignItems: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: 'green',
  },
  footerElr: {
    paddingTop: 10,
    alignItems: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: 'red',
  },
  grey: {
    backgroundColor: 'grey',
    width: 40,
    height: 40,
  },
});
