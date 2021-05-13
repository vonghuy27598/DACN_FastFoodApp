import React, {useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const LocationView = () => {
    const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert("Oops, this will not work on Sketch in an Android emulator. Try it on your device!")
    } else {
      _getLocationAsync();
    }
  
  }, []);

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

    let Region = {
      "latitude": location.coords.latitude,
      "longitude": location.coords.longitude,
      "latitudeDelta": 0.045,
      "longitudeDelta": 0.045,
    };
    setLocation(Region);
    setIsLoading(false);
    console.log("test", Region);
  };


  const getLoading = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}> <ActivityIndicator size={'large'} color={'#000'} /></View>
    );
  }
  return (

    isLoading ? <ActivityIndicator size={'large'} color={'#000'} style={{ alignItems: 'center', justifyContent: 'center' }} />
      : 
      <MapView

        initialRegion={location}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        rotateEnabled={false}
        showsCompass={true}
        style={{ flex: 1 }}
      />

    

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LocationView;


