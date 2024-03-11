import {View,Text,StyleSheet} from 'react-native'
import React from 'react'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';


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

let latitude =37.78825;
let longitude=-122.4324;

function GoogleMapsScreen()
{
  currloc = Geoloaction.
    return(
        <View style={styles.container}>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          title={"I am here"}
          description={"Current Location"}
        />
        
        </MapView>

      </View>
    )
}

export default GoogleMapsScreen
