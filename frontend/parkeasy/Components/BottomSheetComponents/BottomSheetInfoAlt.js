import React, {useRef, useEffect, useCallback, useMemo} from "react";
import {StyleSheet, View, Text, Button} from "react-native";
import { COLORS, SIZES } from "../../Constants/Constants";
import ActionSheet, {SheetManager} from "react-native-actions-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const App = () => {
    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text>Outside the BottomSheet</Text>
                <MyBottomSheet />

            </View>
        </GestureHandlerRootView>
    );
};

const MyBottomSheet = () => {
    // Reference for Bottom Sheet
    const bottomSheetRef = useRef(null);

    // Define snap points
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    // Handle sheet changes
    const handleSheetChanges = useCallback((index) => {
        console.log('Bottom Sheet position:', index);
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Open Bottom Sheet" onPress={() => bottomSheetRef.current?.expand()} />
            <BottomSheet
                ref={bottomSheetRef}
                index={1} // Default position
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>Bottom Sheet Content</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default App;
