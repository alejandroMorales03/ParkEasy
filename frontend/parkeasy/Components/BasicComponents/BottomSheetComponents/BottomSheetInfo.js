import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {COLORS, SIZES} from "../../../Constants/Constants";

const App = () => {
    // hooks
    const sheetRef = useRef(null);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    // render
    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheet 
                ref={sheetRef}
                onChange={handleSheetChange}
            >
                    <View style={styles.header}>
                        <Text style={styles.headerFont}>This is the Title</Text>
                    </View>
                <BottomSheetView style={styles.contentContainer}>
                    {/*This is where the c*/}

                    <View>
                        <Text>Awesome 🔥</Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },

    header: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: COLORS.GreenMainShadow1,

    },

    headerFont:{
        fontSize: SIZES.medium,
        color: COLORS.White,
        fontWeight: "bold",
        marginVertical: 10

    }
});

export default App;