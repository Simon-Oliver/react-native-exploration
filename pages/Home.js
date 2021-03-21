import React, { Component } from 'react';
import { Button, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';

class Home extends Component {

  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      barcodeCodes: ["2384028424802840928409238490284082409823948028349082349082wlasfhashfkahsjdfjkhasdjkfhaskjdhflkashflkshflashflkasdhjf", "ABC123"]
    };
  }

  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.state.barcodeCodes.includes(scanResult.data)) {
        this.setState({
          barcodeCodes: [...this.state.barcodeCodes, scanResult.data]
        })
        //this.state.barcodeCodes.push(scanResult.data);
        console.warn('onBarCodeRead call');
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  handleDelete(data) {
    const letNew = this.state.barcodeCodes.filter(e => e != data)
    this.setState({ barcodeCodes: letNew }, () => console.log("New State", this.state.barcodeCodes))
    console.log("Delte Handler", letNew)
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  renderCodes() {
    return this.state.barcodeCodes.map(e => (<Text>{e}</Text>)
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={styles.listContainer}>
          {/* <ScrollView >
            {this.renderCodes()}
          </ScrollView> */}
          <FlatList
            data={this.state.barcodeCodes}
            renderItem={({ item }) => (
              <View style={styles.items}>
                <TouchableOpacity style={{ width: "80%", padding: 10, height: "100%", display: 'flex', justifyContent: "center" }} onPress={() => console.log("Show Data", item)}>
                  <Text numberOfLines={1} ellipsizeMode='tail'>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={(e) => this.handleDelete(item)}>
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </View>)}>

          </FlatList>

        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked', this.state.barcodeCodes); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
          />
        </View>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  listContainer: {
    height: "30%"
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  items: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    alignItems: "center",
    paddingRight: 8
  },
  deleteButton: {
    fontSize: 8,
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: "20%",
    borderRadius: 5
  },
};

export default Home;