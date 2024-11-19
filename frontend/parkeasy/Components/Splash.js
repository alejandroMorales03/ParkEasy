import React, {useCallback, useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import {COLORS} from "../Constants/Constants";
import {
  Text,
  SafeAreaView
} from 'react-native';


import PinLogo from "../assets/logos/logo_pin_white.svg"

import GlobalStyle from "../Styles/GlobalStyle";
import CredentialsStyle from "../Styles/CredentialsStyle";
import BottomSheetInfo from "./BasicComponents/BottomSheetComponents/BottomSheetInfo";

const Splash = () => {

  return (
    <SafeAreaView style={styles.container}>

        <PinLogo style = {CredentialsStyle.imageLogo}/>

      <BottomSheetInfo />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.GreenMain, // Set your desired color here
    alignItems: "center"
  },


});

export default Splash;