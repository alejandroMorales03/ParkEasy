// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function MapTest() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>This is the Map Test Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5', // Light background for visibility
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333', // Dark text color for contrast
//   },
// });
// ^^^^^^^^^^^^^^^^^ MAP TEST PLACEHOLDER ^^^^^^^^^^^^^^^^^

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

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

export default () => (
   <View style={styles.container}>
     <MapView
       provider={MapView.PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 25.756188,
         longitude: -80.375563,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
);