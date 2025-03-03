import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, SIZES } from "../../Constants/Constants";
import ActionSheet, {SheetManager} from "react-native-actions-sheet";

const App = () => {
    return (
        <View style={styles.container}>
            {/*<BottomSheet />*/}
        </View>
    );
};

const BottomSheet = () => {
    const actionSheetRef = useRef(null);

    useEffect(() => {
        if (actionSheetRef.current) {
            actionSheetRef.current.show();
        }
    }, []);

    return (
        <ActionSheet ref={actionSheetRef}>
            <View>
                <Text>Hi, I am inside the BottomSheet.</Text>
            </View>
        </ActionSheet>
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
        backgroundColor: COLORS.Black,
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
