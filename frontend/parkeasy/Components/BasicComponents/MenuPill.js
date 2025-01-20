import React, {useRef, useState} from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';
import { COLORS } from '../../Constants/Constants';
import PillNavigate from '../../assets/icons/pill-navigate.svg';
import PillCompass from '../../assets/icons/pill_compass.svg';
import PillProfile from '../../assets/icons/pill_person.svg';

const { width } = Dimensions.get('window');

const MenuPill = () => {
    const animationScaling = useRef(new Animated.Value(1)).current; // Default scale is 1
    const animationHeight = useRef(new Animated.Value(75)).current;
    const [isScaled, setScaled] = useState(false);


    // Function to handle scaling on press
    const handleIconPress = (iconName) => {
        Animated.timing(animationScaling, {
            toValue: isScaled ? 1 : 1.5, // Scale up to 1.5x and go back
            duration: 300, // Duration of animation
            useNativeDriver: true, // Use native driver for performance
        }).start(() => {
            setScaled(!isScaled);
        })
            console.log("Button " + iconName + " Pressed!");
            return null;
    };

    return (
        <View style={GlobalStyle.containerCreator}>

            {/* Animated pill container */}
            <Animated.View
                style={[
                    pillStyle.PillContainer, // adds animation to container
                    { transform: [{ scale: animationScaling }]},
                ]}
            >
                {/* Compass Icon   handleIconPress is to scale the pill when you press any icon*/}
                <TouchableOpacity onPress={() => handleIconPress("Navigate")}>
                    <PillNavigate style={GlobalStyle.icons} />
                </TouchableOpacity>

                {/* Navigation Icon */}
                <TouchableOpacity onPress={() => handleIconPress("Compass")}>
                    <PillCompass style={GlobalStyle.icons} />
                </TouchableOpacity>

                {/* Profile Icon */}
                <TouchableOpacity onPress={() => handleIconPress("Profile")}>
                    <PillProfile style={GlobalStyle.icons} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default MenuPill;

const pillStyle = StyleSheet.create({
    PillContainer: {
        height: 75,
        width: width * 0.85,
        borderRadius: 90,
        backgroundColor: COLORS.GreenMainShadow2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.15,
        shadowOpacity: 2,
        shadowRadius: 4,
        shadowColor: COLORS.Black,
        shadowOffset: 0.9,
    },
});
