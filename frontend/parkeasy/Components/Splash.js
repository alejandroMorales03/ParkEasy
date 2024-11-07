import React from 'react';
import { View, StyleSheet } from 'react-native';
import {COLORS} from "../Constants/Constants";
import {
  Text,
  SafeAreaView
} from 'react-native';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GreenMain // Set your desired color here
  },
});

export default Splash;