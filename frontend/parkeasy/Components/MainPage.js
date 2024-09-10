import React from 'react';
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
import Style from '../Styles/UserPagesStyle'
import {COLORS} from "../Constants/Constants";
import {ImageBackground} from "react-native-web";
import {ICONS} from "../Constants/icons";
import globalStyles from "../Styles/GlobalStyle";
import userPagesStyle from "../Styles/UserPagesStyle";
import GlobalStyle from "../Styles/GlobalStyle";

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const mainPage = () => {
    return (
        <SafeAreaView style={Style.mainPageContainer}>

                <View style = {Style.mapContainer}>
                    <View style = {Style.searchContainer}>

                        <TextInput style = {userPagesStyle.searchInput}
                                   placeholderTextColor={COLORS.Grey}
                                   placeholderStyle = {GlobalStyle.input}
                                   placeholder = "Address"
                        ></TextInput>

                    </View>
                    <Text>Map View</Text>
                </View>

                <View style = {Style.navigationContainer}>
                    {/*Menu Button*/}
                    <TouchableOpacity
                        activeOpacity={0.25}>
                        <Image source={ICONS.menuLarge} style={Style.menuIcon}></Image>
                    </TouchableOpacity>

                    {/*Profile Button*/}

                    <TouchableOpacity
                        activeOpacity={0.25}>
                        <Image source={ICONS.profileMedium} style={Style.menuIcon}></Image>
                    </TouchableOpacity>

                </View>

        </SafeAreaView>
    )
}

export default mainPage;