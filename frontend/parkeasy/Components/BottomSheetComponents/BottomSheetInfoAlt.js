import React, {useRef, useEffect, useCallback, useMemo} from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, SIZES } from "../../Constants/Constants";
import ActionSheet, {SheetManager} from "react-native-actions-sheet";

const App = () => {
    return (
        <View style={styles.container}>
            <BottomSheet />

        </View>
    );
};

const BottomSheet = () => {

    //Reference for BottomSheet this will use for changing states
    const actionSheetRef = useRef(null);

    // Define snap points => represent the different point where the menu will go up or down
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    //Handle Sheet Changes
    const handleSheetChange = useCallback((index) => {
            console.log("Bottom Sheet Position", index);
        }, [],);

    //initiate the bottom sheet shown
    useEffect(() => {
        if (actionSheetRef.current) {
            actionSheetRef.current.show();
        }
    }, []);

    return (
        <BottomSheet ref={actionSheetRef}
            index={1} // default position
            snapPoints={snapPoints} // establish snap points
            onChange={handleSheetChange} // interaction state changes
        >
            <View>
                <Text>Hi, I am inside the BottomSheet.</Text>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    actionSheet: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLORS.White,
    },
    container: {
        flex: 1,
        paddingTop: 200,
        width: "100%",
        backgroundColor: COLORS.GreenMain,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.Gray1,
        backgroundColor: COLORS.GreenHighlight1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: COLORS.White,
        paddingLeft: "5%",
    },
    headerFont: {
        fontSize: SIZES.medium,
        color: COLORS.Black,
        fontWeight: "bold",
        marginVertical: 10,
    },
    regularTextFont: {
        fontSize: SIZES.small,
        color: COLORS.White,
    },
});

export default App;
