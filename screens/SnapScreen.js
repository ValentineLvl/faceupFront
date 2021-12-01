import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Button, Overlay } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

// import {connect} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SnapScreen() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [torch, setTorch] = useState(Camera.Constants.FlashMode.off);
    const [visible, setVisible] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
      if (hasPermission && isFocused) {
        return <View style={{flex:1}}>
            <Camera style={{flex:1}} type={type} flashMode={torch} ref={ref => (cameraRef = ref)}> 
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.touchableOpacity}
            onPress={() => {
            setType(
             type == Camera.Constants.Type.back
               ? Camera.Constants.Type.front
               : Camera.Constants.Type.back
           );
         }}
       >
            <Ionicons
                name="camera-reverse"
                size={23}
                color="#ffffff"
            />
            <Text style={{color:"#ffffff"}}>Flip</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}

            onPress={() => {
                setTorch(
                    torch === Camera.Constants.FlashMode.torch
                      ? Camera.Constants.FlashMode.off
                      : Camera.Constants.FlashMode.torch
                  );
         }}
       >
            <Ionicons
                name="ios-flash"
                size={23}
                color="#ffffff"
            />
            <Text style={{color:"#ffffff"}}>Flash</Text>
        </TouchableOpacity>
        </View>
        </Camera>
            <Button
            icon={
                <FontAwesome
                name="save"
                size={23}
                color="#ffffff"
            />
        } 
                title=" Snap"
                buttonStyle={{backgroundColor: "#009788"}}
                type="solid"
                onPress={async () => {
                    if (cameraRef) {
                        setVisible(!visible);
                      let photo = await cameraRef.takePictureAsync({
                        quality : 0.7,
                        base64: true,
                        exif: true
                       });
                       console.log(photo.uri);  
                       if (photo.uri) {
                        setVisible(false);}  
                    } 
                    }
                   }
            />
            <Overlay isVisible={visible}>
                <Text>Loading...</Text>
            </Overlay>
            </View>;
        
      }
      else {
        return <View style={{flex:1}}><Text>No access to camera</Text></View>;
      }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center',
        
    },
    buttonContainer:{
        flex: 1, 
        alignItems: 'flex-end', 
        //justifyContent:'flex-end',
        alignSelf : 'flex-start',
        flexDirection: 'row',
    },
    touchableOpacity:{
        margin: 10,
        
    },
  });