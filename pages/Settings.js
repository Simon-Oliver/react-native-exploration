import React, {useState} from 'react';
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
  Switch,
} from 'react-native';

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Settings</Text>
        <Switch
          style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
          trackColor={{false: '#767577', true: '#E83E1D'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Settings</Text>
        <Switch
          style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
          trackColor={{false: '#767577', true: '#E83E1D'}}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
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
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  row: {
    marginTop: '5%',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  box: {
    width: 10,
    height: 10,
  },
});
