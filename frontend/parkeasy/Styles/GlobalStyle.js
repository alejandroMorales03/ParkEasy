import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window

const GlobalStyle = StyleSheet.create({
    icons: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignItems: 'center',
        marginLeft: 5,
    },

    input: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: COLORS.Transparent,
        borderBottomColor: COLORS.Grey,
        borderWidth: 1,
        paddingHorizontal: width * 0.08, // 8% of screen width
        marginVertical: 10,
        color: COLORS.Black,

    },

    Text: {
        fontSize: SIZES.small * (width / 375),
        fontWeight: "normal",
        color: COLORS.Grey
    },
})

export default GlobalStyle;