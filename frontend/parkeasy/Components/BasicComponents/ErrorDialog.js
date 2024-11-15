import globalStyles from "../../Styles/GlobalStyle";
import {Text, StyleSheet} from "react-native";
import React from "react";
import {COLORS, SIZES} from "../../Constants/Constants";

const ErrorDialog = ({error}) => {
    return(
       <>
            {error ? (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                ) : null}
       </>

    )
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: SIZES.extraSmall,
        color: COLORS.Error,
        fontWeight: "normal",
    },

})

export default ErrorDialog;