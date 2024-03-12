import { View, Text, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import Green_Marker from '../../assets/Green_Marker.png';
import GetLocation from 'react-native-get-location';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function GoogleMapsScreen() {
  const [permission, setPermission] = useState(false);
  const [marker, setMarker] = useState({
    key: 1,
    latitude: 25.429720,
    longitude: 81.771385,
    name: "Kush",
    description: "All good"
  });



  const _getLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Please allow location permission to continue...',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
      
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermission(true);
          _getCurrentLocation();
          console.log('You can use the app');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    _getLocationPermission();
  }, []);

  const _getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log("My current location =>", location);
        setMarker({
          ...marker,
          latitude: location.latitude,
          longitude: location.longitude
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Please allow location permission to continue...</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.name}
          description={marker.description}>
          <Image style={{ width: 60, height: 60, opacity: 0.7 }} source={Green_Marker} />
        </Marker>
        <Circle
          center={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          radius={100}
          strokeColor='black'
          fillColor='#EBF5FB'
        />
      </MapView>
    </View>
  );
}

export default GoogleMapsScreen;
