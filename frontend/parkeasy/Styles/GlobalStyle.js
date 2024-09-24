import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window
// style={GlobalStyle.icons}
const GlobalStyle = StyleSheet.create({
    icons: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignItems: 'center',
        marginLeft: 5,
    },

    placeHolderText: {
        color: COLORS.Grey,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },

    input: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: COLORS.Transparent,
        borderBottomColor: COLORS.Grey,
        borderWidth: 1,
        paddingHorizontal: width * 0.04, // 8% of screen width
        marginVertical: 10,
        color: COLORS.Black,

    },

    Text: {
        fontSize: SIZES.small,
        fontWeight: "normal",
        color: COLORS.Grey
    },

    errorText: {
        fontSize: SIZES.extraSmall,
        color: COLORS.Red,
        fontWeight: "normal",
    }
})

export default GlobalStyle;