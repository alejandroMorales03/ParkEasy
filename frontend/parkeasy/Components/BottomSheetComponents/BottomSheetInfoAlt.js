import React, { useCallback, useRef } from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {COLORS, SIZES} from "../../Constants/Constants";
import BottomSheetInfo from "./BottomSheetInfo";
import ActionSheet from "react-native-actions-sheet";
import {ActionSheetRef} from "react-native-actions-sheet";

const App = () => {

 return(
     <View style={styles.container}>
         <BottomSheetInfoAlt/>
     </View>
 )
};

const BottomSheetInfoAlt = ({ navigation }) => {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    return(
        <ActionSheet ref={actionSheetRef}>
            <Text>Hi, I am here.</Text>
        </ActionSheet>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
        width: '100%',
        backgroundColor: COLORS.Black
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.Gray1,
        backgroundColor: COLORS.GreenHighlight1,
    },

    header: {
        flexDirection: "row",
        justifyContent: "left",
        backgroundColor: COLORS.White,
        paddingLeft: "5%",

    },

    headerFont:{
        fontSize: SIZES.medium,
        color: COLORS.Black,
        fontWeight: "bold",
        marginVertical: 10

    }
});

export default App;