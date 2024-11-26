import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback, Keyboard, SafeAreaViewBase
} from 'react-native';
import Style from '../../Styles/UserPagesStyle'
import {COLORS} from "../../Constants/Constants";
import {ImageBackground} from "react-native-web";
import {ICONS} from "../../Constants/icons";
import globalStyles from "../../Styles/GlobalStyle";
import userPagesStyle from "../../Styles/UserPagesStyle";
import GlobalStyle from "../../Styles/GlobalStyle";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

//////////////////////////////////// API Configuration ////////////////////////////////////

const API = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

/////////////////////////////////// COMPONENTS ////////////////////////////////////

const SearchBar = () => {
    return (
        <View style = {Style.contentContainer}>

            <Image source={ICONS.searchIcon} style={GlobalStyle.icons}></Image>

            <TextInput style = {userPagesStyle.searchInput}
                       placeholderStyle = {GlobalStyle.placeHolderText}
                       placeholder = "Search here"
            ></TextInput>

        </View>
    )
}

const GoogleMap =  () => {
    return (
            <MapView
                provider={MapView.PROVIDER_GOOGLE} // remove if not using Google Maps
                style={userPagesStyle.map}
                region={{
                    latitude: 25.756188,
                    longitude: -80.375563,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
            </MapView>
    );
}

const NavBar = () => {
    return(
        <View style = {Style.navigationContainer}>
            {/*Menu Button*/}
            <TouchableOpacity
                activeOpacity={0.25}>
                <Image source={ICONS.home} style={Style.mediumMenuIcon}></Image>
            </TouchableOpacity>

            {/*Plus Button*/}

            <TouchableOpacity
                activeOpacity={0.25}>
                <Image source={ICONS.plusIcon} style={Style.largeMenuIcon}></Image>
            </TouchableOpacity>

            {/*Gear Button*/}

            <TouchableOpacity
                activeOpacity={0.25}>
                <Image source={ICONS.gearIcon} style={Style.smallMenuIcon}></Image>
            </TouchableOpacity>

            {/*Profile Button*/}

            <TouchableOpacity
                activeOpacity={0.25}>
                <Image source={ICONS.profileSmall} style={Style.smallMenuIcon}></Image>
            </TouchableOpacity>

        </View>
    )
}

const LocationProfile = () => {
    return (
        <View>
            <Image>
            {/*    Parking Lot Image*/}
            </Image>

            <Text>
                {/*Parking Lot Name*/}
            </Text>

            <Text>
            {/*  Parking Lot Address*/}
            </Text>

            <View>


            </View>

        </View>
    )
}

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const mainPage = () => {
    return (
        <SafeAreaView style={Style.mainPageContainer}>
            <View style = {Style.mapContainer}>
                <GoogleMap />
                < SearchBar style={{position: "absolute"}}/>
                <NavBar style={{position: "absolute"}}/>
                {/*<SearchBar />*/}
                {/*<NavBar/>*/}
                {/*<MapView />*/}
            </View>
        </SafeAreaView>
    )
}

export default mainPage;

//////////////////////////////////// COMPONENTS ////////////////////////////////////


