import React, { Component, useEffect } from 'react';
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
import { firebase } from '../utils/firebaseConfig'

const entityRef = firebase.firestore().collection('test')
const inventoryRef = firebase.firestore().collection('inventory')

const List = () => {

    useEffect(async () => {
        const events = await firebase.firestore().collection('inventory')
        events.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            console.log(tempDoc)
        })

        // inventoryRef.onSnapshot(querySnapshot => {
        //     console.log(`Received query snapshot of size ${querySnapshot.size}`, querySnapshot);
        //     querySnapshot.docChanges().forEach(change => {

        //         console.log('New city: ', change.doc.data());
        //     })
        //     // ...
        // }, err => {
        //     console.log(`Encountered error: ${err}`);
        // });
    }, [])

    const onAddButtonPress = () => {
        console.log("Button Pressed", entityRef)
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            text: "Test 1234",
            authorID: "1234",
            createdAt: timestamp,
        };
        entityRef
            .add(data)
            .then(_doc => {
                console.log(_doc)
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            });

    }

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.text}>List </Text>
                <Button onPress={() => onAddButtonPress()} title="Add to Database"></Button>
            </View>
        </View>
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

export default List