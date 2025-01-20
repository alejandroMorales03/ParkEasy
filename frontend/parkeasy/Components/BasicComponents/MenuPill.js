import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform, Text, Dimensions, Button, Keyboard, Animated} from "react-native";
import GlobalStyle from '../../Styles/GlobalStyle';
import {COLORS} from "../../Constants/Constants";
const { width, height } = Dimensions.get('window');
import PillNavigate from "../../assets/icons/pill-navigate.svg"
import PillCompass from "../../assets/icons/pill_compass.svg"
import PillProfile from "../../assets/icons/pill_person.svg"
import * as rotation from "react-native-reanimated";

const MenuPill = ({ navigation }) => {


    // icons animations

    const animationDirection = useRef(new Animated.Value(0)).current;
    const animationRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        // Start the floating animation loop
        Animated.loop( // loop is to repeat animation

            Animated.sequence([
                // inside the sequence you can create many automations
                Animated.timing(animationDirection, {
                    toValue: 0,
                    duration: 2000, // 1 second
                    useNativeDriver: true,
                }),
                Animated.timing(animationRotation, {
                    toValue: 1,
                    duration: 2000, // 1 second
                    useNativeDriver: true,
                }),

                Animated.timing(animationDirection, {
                    toValue: 0, // Return to original position
                    duration: 1000, // 1 second
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animationDirection, animationRotation]);

    //rotation interpolation

    // const rotateInterpolate = rotation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '45deg']
    // })

    // onPress test

    function onPressTest() {
        console.log("pressed");
    }
    return (
        <View style={GlobalStyle.containerCreator}>

            <View style={pillStyle.PillContainer}>

                {/*I have to add the new stack in the index to manipulate the pages based on the menu*/}

                {/*compass*/}
                <Animated.View style={{transform: [
                    {translateY: animationDirection},
                    ]}}>
                    <PillNavigate style={GlobalStyle.icons} onPress={onPressTest} />
                </Animated.View>

                {/*/!*navigation*!/*/}
                <Animated.View style={{transform: [
                        {translateY: animationDirection},
                    ]}}>
                    <PillCompass style={GlobalStyle.icons} onPress={null}/>
                </Animated.View>

                {/*/!*profile*!/*/}
                <Animated.View style={{transform: [
                        {translateY: animationDirection},
                    ]}}>
                    <PillProfile style={GlobalStyle.icons} onPress={null}/>
                </Animated.View>
            </View>

        </View>
    )
}

export default MenuPill;

const pillStyle = StyleSheet.create({
    PillContainer: {
        height: 75,
        width: width * 0.85,
        borderCurve: "circular",
        borderRadius: 90,
        backgroundColor: COLORS.GreenMainShadow2,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.20,
    }

})