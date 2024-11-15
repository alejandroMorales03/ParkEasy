import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { BUTTON, COLORS, SIZES } from "../../Constants/Constants";
import Style from "../../Styles/CredentialsStyle";

const PrimaryButton = ({ onPressButton, InsideText, hasIcon = "false", SideIcon = null }) => {
    return (
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>{InsideText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: BUTTON.ButtonPrimaryBackgroundColor,
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.White,
        fontSize: SIZES.small,
    },
});

export default PrimaryButton;
