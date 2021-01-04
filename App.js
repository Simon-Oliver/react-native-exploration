/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, [temp]);

  const checkTemp = (temp) => {
    if (temp < 20) {
      return 'low';
    } else if (temp > 40) {
      return 'high';
    } else {
      return 'medium';
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.body}>
        <Text style={styles[checkTemp(temp)]}>{`${temp}°C`}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.square}></View>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 72,
  },
  high: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 72,
  },
  medium: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 72,
  },
  low: {
    color: 'dodgerblue',
    fontWeight: 'bold',
    fontSize: 72,
  },
  img: {
    width: 500,
    height: 500,
  },
  footer: {
    height: 90,
    backgroundColor: "tomato",
  },
  square: {
    height: "100%",
    flexDirection: "row",
    width: "50%",
    backgroundColor: "dodgerblue"
  }
});

export default App;
