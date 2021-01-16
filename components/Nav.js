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
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsisH,
  faHome,
  faThermometerThreeQuarters,
} from '@fortawesome/free-solid-svg-icons';

export default function Nav({navigationRef}) {
  const renderBottomNav = () => {
    const arr = [
      {link: 'Home', icon: faHome},
      {link: 'Temperature', icon: faThermometerThreeQuarters},
      {link: 'Settings', icon: faEllipsisH},
    ];
    return arr.map((e, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={styles.footerEl}
          onPress={() => navigationRef.current?.navigate(e.link)}>
          <FontAwesomeIcon icon={e.icon} size={36} color={'white'} />
        </TouchableOpacity>
      );
    });
  };

  return <View style={styles.footer}>{renderBottomNav()}</View>;
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
    height: '10%',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  footerEl: {
    paddingTop: 18,
    alignItems: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: '#1d242b',
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
