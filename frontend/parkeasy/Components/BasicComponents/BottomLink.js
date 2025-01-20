import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../Constants/Constants";

const BottomLink = ({ navigation, text, navigateTo = null, resetField, fontWeight = "normal" }) => {
    const handlePress = () => {
        resetField(); // clear fields
        navigation.navigate(navigateTo) // navigate to specified route
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.bottomLink, {fontWeight: fontWeight}]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bottomLink: {
        color: COLORS.GreenMain,
        marginVertical: 10, // Adjust this value for closer spacing
    },
});

export default BottomLink;
