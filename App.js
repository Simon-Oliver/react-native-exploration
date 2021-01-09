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
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
const Buffer = require("buffer").Buffer;


export default class App extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = { value: 0, err: "NA", data: "", message: "Sensor not connected" };
  }




  componentDidMount() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  componentWillUnmount() {

  }


  // scanAndConnect() {
  //   this.manager.startDeviceScan(null, null, (error, device) => {
  //     if (error) {
  //       // Handle error (scanning will be stopped automatically)
  //       console.log("error ", error)
  //       return
  //     }

  //     // Check if it is a device you are looking for based on advertisement data
  //     // or other criteria.
  //     if (device.name === 'ESP32' ||
  //       device.name === 'ESP 32') {

  //       // Stop scanning as it's not necessary if you are scanning for one device.
  //       this.manager.stopDeviceScan();

  //       // Proceed with connection.
  //       device.connect()
  //         .then((device) => {
  //           console.log(device.discoverAllServicesAndCharacteristics())
  //           return device.discoverAllServicesAndCharacteristics()
  //         })
  //         .then((device) => {
  //           // Do work on device with services and characteristics
  //           device.monitorCharacteristicForService("4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", (err, val) => this.listener(err, val))

  //         })
  //         .catch((error) => {
  //           // Handle errors
  //           console.log("Error: ", error)
  //         });
  //     }
  //   });
  // }

  scanAndConnect() {
    console.log("Scanning Started");
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log("Error in scanning devices:", error);
        return
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.log("Detected Device Details:", device.id, device.name);
      // ||device.localName === 'BLEPeripheralApp') 
      if (device.name === 'ESP32') { //
        // Stop scanning as it's not necessary if you are scanning for one device.
        console.log("Device Found, Stopping the Scan.");
        console.log("Connecting to:", device.name)
        this.manager.stopDeviceScan();
        device.onDisconnected((error) => {
          console.log(typeof error); // 'object'
          console.log(error === null); // 'true'
          device.cancelConnection()
        });
        device.cancelConnection()
        device.connect()
          .then((device) => {
            // this.info("Discovering services and characteristics")
            console.log("Connected...Discovering services and characteristics");
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device) => {
            console.log('Services and characteristics discovered');
            //return this.testChar(device)
            const services = device.services()
            console.log("----------------->", services);
            // return device.readCharacteristicForService(services)
            return device.monitorCharacteristicForService("4fafc201-1fb5-459e-8fcc-c5c9c331914b", "beb5483e-36e1-4688-b7f5-ea07361b26a8", (err, val) => {
              if (val !== null) {
                console.log(Buffer.from(val.value, 'base64').toString('ascii'))
                this.setState({ value: Buffer.from(val.value, 'base64').toString('ascii'), message: "" })
              } else if (val == null) {
                device.cancelConnection()
                this.scanAndConnect()
                this.setState({ message: "Sensor disconnected" })
              }
            })
            // device.readCharacteristicForService("abbaff00-e56a-484c-b832-8b17cf6cbfe8")
            // this.info("Setting notifications")
            //return this.setupNotifications(device)
          })
          .then(() => {
            // const characteristicsData = device.readCharacteristicForService();
            // console.log("------------>", characteristicsData);
            //this.info("Listening...")
          },
            (error) => {
              console.warn(error.message);
              // this.error(error.message)
            })
      }
    });
  }

  // listener(err, value) {
  //   if (err) {
  //     console.log("Error: ", err)
  //     this.setState({ err })
  //   }
  //   this.setState({ value })
  // }


  renderMessage() {
    return (
      <View style={styles.message}>
        <Text style={styles.textMsg}>{this.state.message}</Text>
      </View>
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <View >
          <Text style={styles.text}>{`${Number(this.state.value)}°C`}</Text>
        </View>
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0D0D0D',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 100
  },
  message: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
    fontSize: 20,
    height: 50,
    width: Dimensions.get('window').width,
    zIndex: 100,
  },
  textMsg: {
    textAlign: 'center',
    color: "white",
  }
});