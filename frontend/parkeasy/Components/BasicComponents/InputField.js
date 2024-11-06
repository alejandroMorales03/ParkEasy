import {StyleSheet, TextInput, View} from "react-native";


const InputField = ({
                        placeholder,
                        // value,
                        // onChangeText,

                    }) => {
    // logic
    return(
        <View style={styles.container}>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor="grey"
                // onChangeText={onChangeText}
                // value={value}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "max-width",
        alignItems: "flex-start",



    },
    container: {
        display: "flex",
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 5,
        backgroundColor: "red"

    }


});

//this is the only way that when you call it displays
export default InputField;
