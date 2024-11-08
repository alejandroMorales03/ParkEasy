import { Animated, Dimensions, Image, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Style from "../../Styles/CredentialsStyle";
import { ICONS } from "../../Constants/icons";
import GlobalStyle from "../../Styles/GlobalStyle";
import { COLORS, WEIGHT } from "../../Constants/Constants";
import React, { useState, useRef } from "react";

const { width } = Dimensions.get('window'); // Collects the dimensions of the current window

/**
 * InputField Component
 * A customizable text input component with optional icons and animations.
 *
 * @param {string} placeholder - The placeholder text displayed in the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - Function to handle text changes in the input.
 * @param {boolean} hasIcon - Determines whether to show an icon next to the input field.
 * @param {object} icon - The source for the icon image displayed if hasIcon is true.
 * @param {string} keyboardType - The type of keyboard to display (e.g., "default", "numeric").
 * @param {string} autoCap - Sets capitalization behavior ("none", "sentences", "words", "characters").
 * @param {boolean} secureTextEntry - If true, hides the input for password fields.
 */


const InputField = ({
                        placeholder,
                        value,
                        onChange,
                        hasIcon = false,
                        icon,
                        keyboardType = "default",
                        autoCap = "none",
                        secureTextEntry = false
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
    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.Gray1, COLORS.Black] // Colors for unfocused and focused states
    });

    const borderThickness = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [WEIGHT.SmallThin, WEIGHT.MidThin]
    });

    return (
        <View style={styles.fieldCredential}>

            {/* Conditionally render the icon based on hasIcon */}
            {hasIcon && (
                <Image source={icon} style={GlobalStyle.icons} />
            )}

            <Animated.View style={[styles.animatedInputContainer, { borderBottomColor: borderColor, borderBottomWidth: borderThickness }]}>
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
            </Animated.View>

            {/* Conditionally render the eye icon only if secureTextEntry is true */}
            {secureTextEntry && (
                <TouchableOpacity onPress={togglePasswordVision} style={styles.eyeIcon}>
                    <Image
                        source={isHiddenIcon ? ICONS.eyeCrossed : ICONS.eyeUncrossed}
                        style={GlobalStyle.icons}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    animatedInputContainer: {
        flex: 1,
        borderBottomWidth: 1,
    },
    input: {
        height: 20,
        paddingHorizontal: width * 0.04, // 8% of screen width
        marginVertical: 10,
        color: COLORS.Black,
    },
    fieldCredential: {
        flexDirection: 'row',
        alignItems: 'center', // Aligns input and icon vertically centered
        marginVertical: 2, // Adds spacing between input fields
    },
    eyeIcon: {
        paddingHorizontal: 8, // Adds padding around the icon
    },
});

export default InputField;
