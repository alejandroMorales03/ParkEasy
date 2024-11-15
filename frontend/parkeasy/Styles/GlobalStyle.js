import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window
// style={GlobalStyle.icons}
const GlobalStyle = StyleSheet.create({
    icons: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignItems: 'center',
        marginLeft: 5,
    },

    placeHolderText: {
        color: COLORS.Gray1,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },



    Text: {
        fontSize: SIZES.small,
        fontWeight: "normal",
        color: COLORS.Gray1
    },


    input: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: COLORS.Transparent,
        borderBottomColor: COLORS.Gray1,
        borderWidth: 1,
        paddingHorizontal: width * 0.04, // 8% of screen width
        marginVertical: 10,
        color: COLORS.Black,
    }
})

export default GlobalStyle;