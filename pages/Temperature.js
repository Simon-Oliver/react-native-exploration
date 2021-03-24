import React, { Component } from 'react';
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
import { BleManager } from 'react-native-ble-plx';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
const Buffer = require('buffer').Buffer;

import data from "../config.json"

export default class App extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      value: 0,
      err: 'NA',
      data: '',
      message: 'Sensor not connected',
    };
  }

  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);

    this.checkMessage();
  }

  componentDidUpdate() {
    this.checkMessage();
  }

  componentWillUnmount() {
    this.manager.stopDeviceScan();
  }

  scanAndConnect() {
    console.log('Scanning Started');
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log('Error in scanning devices:', error);
        return;
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      //console.log('Detected Device Details:', device.id, device.name);
      // ||device.localName === 'BLEPeripheralApp')
      if (device.name === 'ESP32') {
        //
        // Stop scanning as it's not necessary if you are scanning for one device.
        console.log('Device Found, Stopping the Scan.');
        console.log('Connecting to:', device.name);
        this.manager.stopDeviceScan();
        device.onDisconnected((error) => {
          console.log(typeof error); // 'object'
          console.log(error === null); // 'true'
          device.cancelConnection();
        });
        device.cancelConnection();

        try {
          device
            .connect()
            .then((device) => {
              try {
                // this.info("Discovering services and characteristics")
                console.log(
                  'Connected...Discovering services and characteristics',
                );
                return device.discoverAllServicesAndCharacteristics();
              } catch (error) {
                device.cancelConnection();
                this.scanAndConnect();
                this.setState({ message: 'Sensor disconnected' });
              }
            })
            .then((device) => {
              console.log('Services and characteristics discovered');
              //return this.testChar(device)

              try {
                const services = device.services();
                console.log('----------------->', services);
                // return device.readCharacteristicForService(services)
                return device.monitorCharacteristicForService(
                  '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
                  'beb5483e-36e1-4688-b7f5-ea07361b26a8',
                  (err, val) => {
                    if (val !== null) {
                      console.log(
                        Buffer.from(val.value, 'base64').toString('ascii'),
                      );
                      hideMessage();
                      this.setState({
                        value: Buffer.from(val.value, 'base64').toString(
                          'ascii',
                        ),
                        message: null,
                      });
                    } else if (val == null) {
                      device.cancelConnection();
                      this.scanAndConnect();
                      this.setState({ message: 'Sensor disconnected' });
                    }
                  },
                );
              } catch (error) {
                device.cancelConnection();
                this.scanAndConnect();
                this.setState({ message: 'Sensor disconnected' });
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  checkMessage() {
    if (this.state.message != null) {
      showMessage({
        message: this.state.message,
        type: 'warning',
        autoHide: false,
      });
    }
  }

  // renderBottomNav() {
  //     const arr = [[], [], []]
  //     return arr.map((e, i) => {
  //         return (
  //             <View key={i} style={styles.footerEl}>
  //                 <Button title="Test" onPress={() => this.props.navigation.navigate('Home')} style={styles.grey}></Button>
  //             </View>
  //         )
  //     })
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.message}>
          <Text
            onPress={() => this.props.navigation.navigate('Home')}
            style={styles.text}>{`${Number(this.state.value)}°C`}</Text>
        </View>
        <FlashMessage position="top" />
      </View>
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

  text: {
    color: 'white',
    fontSize: 100,
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
