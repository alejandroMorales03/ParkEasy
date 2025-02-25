import { Animated, Dimensions, Image, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import GlobalStyle from "../../Styles/GlobalStyle";
import {COLORS, SIZES, WEIGHT} from "../../Constants/Constants";
import React, { useState, useRef } from "react";
import EyeIconFieldUnmarked from "../../assets/icons/input_pass_visible.svg"
import EyeIconFieldMarked from "../../assets/icons/input_pass_hidden.svg"

import ErrorDialog from "../BasicComponents/ErrorDialog"

const { width } = Dimensions.get('window'); // Collects the dimensions of the current window

/**
 * InputField Component
 * A customizable text input component with optional icons and animations.
 *
 * @param {string} placeholder - The placeholder text displayed in the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - Function to handle text changes in the input.
 * @param {boolean} hasIcon - Determines whether to show an icon next to the input field.
 * @param {object} iconPath - The source for the icon image displayed if hasIcon is true.
 * @param {string} keyboardType - The type of keyboard to display (e.g., "default", "numeric").
 * @param {string} autoCap - Sets capitalization behavior ("none", "sentences", "words", "characters").
 * @param {boolean} secureTextEntry - If true, hides the input for password fields.
 * @param {string} errorTray - Brings the error message if existent
 */



const InputField = ({
                        placeholder,
                        value,
                        onChange,
                        SideIcon = null,
                        hasIcon = false,
                        keyboardType = "default",
                        autoCap = "none",
                        secureTextEntry = false,
                        errorTray,
                        password_input = false
                    }) => {
                        
    // State to manage visibility of the password
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const [isHiddenIcon, setIsHiddenIcon] = useState(true);
    

    // Animated value for border color
    const borderAnim = useRef(new Animated.Value(0)).current;

    // Toggle the visibility of the password
    const togglePasswordVision = () => {
        setIsSecure(!isSecure);
        setIsHiddenIcon(!isHiddenIcon);
    };

    //TODO trigger a clear in the function

    // Function to start the animation on focus
    const handleFocus = () => {
        Animated.timing(borderAnim, {
            toValue: 1, // Animate to the "focused" state
            duration: 200, // Duration of the animation
            useNativeDriver: false, // Needed for color animations
        }).start();
    };

    // Function to reverse the animation on blur
    const handleBlur = () => {
        Animated.timing(borderAnim, {
            toValue: 0, // Animate to the "unfocused" state
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    // Interpolate the border color based on focus
    // Condition if erroTray exist omit the animation of color and leave it on red until error non existent
    const borderColor = !errorTray ? borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.Gray1, COLORS.Black] // Colors for unfocused and focused states
    }) : COLORS.Error;

    const borderThickness = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [WEIGHT.SmallThin, WEIGHT.MidThin]
    });

    return (
      
        <View style= {styles.fieldContainer}>
            <View style={styles.fieldCredential}>
                {/*TODO figure out a way to add the path of the icon into the function*/}

                {/* Conditionally render the icon based on hasIcon*/}

                {hasIcon && SideIcon && ( // condition of Icon
                    <SideIcon style = {GlobalStyle.icons} />

                )}
                <Animated.View style={[styles.animatedInputContainer, {borderBottomColor: borderColor, borderBottomWidth: borderThickness }]}>

                    <TextInput
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                        placeholderTextColor={COLORS.Gray1}
                        autoCapitalize={autoCap}
                        secureTextEntry={isSecure}
                        onFocus={handleFocus}   // Start animation on focus
                        onBlur={handleBlur}     // Reverse animation on blur
                    />
                    
                

                {/* Conditionally render the eye icon only if secureTextEntry is true */}
                {secureTextEntry && (
                    <TouchableOpacity 
                    onPress={togglePasswordVision} // execusion in touch
                    style={[styles.eyeIcon,{paddingTop: 8}]} // aligment
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 } // touchable area expansion
                    }>  

                        {isHiddenIcon ? (
                            <EyeIconFieldUnmarked  style={styles.eyeIcon} />
                        ) : (
                            <EyeIconFieldMarked style={styles.eyeIcon}/>
                        )}
                    </TouchableOpacity>
                    
                )}

            </Animated.View>

            </View>
                {// condition if error exist display message below
                    errorTray && (
                        <View style= {{alignItems: 'flex-end', marginEnd: 10}}>
                            <ErrorDialog error = {errorTray} size = {SIZES.superExtraSmall}/>
                        </View>
                    )}
        </View>    
    );
};

const styles = StyleSheet.create({
    animatedInputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        flex: 1,
        height: 20,
        paddingHorizontal: width * 0.04, // 8% of screen width
        marginVertical: 10,
        color: COLORS.Black,
    },
    fieldCredential: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center', // Aligns input and icon vertically centered
        marginVertical: 3, // Adds spacing between input fields
    },

    fieldContainer : {
        flexDirection: 'column'

    },

    eyeIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',

    }
});

export default InputField;
