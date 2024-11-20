import globalStyles from "../../Styles/GlobalStyle";
import {Text, StyleSheet} from "react-native";
import React from "react";
import {COLORS, SIZES} from "../../Constants/Constants";

const ErrorDialog = ({ error, size = SIZES.extraSmall, align}) => {
    return (
        <>
            {error ? (
                <Text style={[styles.errorText, {fontSize: size }]}>
                    {error}
                </Text>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    errorText: {
        padding: '20px',
        color: COLORS.Error,
        fontWeight: 'normal',
    },
});

export default ErrorDialog;