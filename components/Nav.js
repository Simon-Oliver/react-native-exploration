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
import { useNavigation } from '@react-navigation/native';


export default function Nav({ navigationRef }) {

    const renderBottomNav = () => {
        const arr = ["Home", "Temperature", "Nothing"]
        return arr.map((e, i) => {
            return (
                <View key={i} style={styles.footerEl}>
                    <Button color="white" title={e} onPress={() => navigationRef.current?.navigate(e)} style={styles.grey}></Button>
                </View>
            )
        })
    }


    return (
        <View style={styles.footer} >
            {renderBottomNav()}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: '#0D0D0D',
        width: window.width,
        height: window.height
    },

    text: {
        color: "white",
        fontSize: 100
    },
    message: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 100,
        width: Dimensions.get('window').width,
    },
    textMsg: {
        textAlign: 'center',
        color: "white",
    },
    footer: {
        height: "8%",
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        backgroundColor: "red"
    },
    footerEl: {
        paddingTop: 10,
        alignItems: "center",
        height: "100%",
        flex: 1,
        backgroundColor: "green"
    },
    footerElr: {
        paddingTop: 10,
        alignItems: "center",
        height: "100%",
        flex: 1,
        backgroundColor: "red"
    },
    grey: {
        backgroundColor: "grey",
        width: 40,
        height: 40
    }
});

