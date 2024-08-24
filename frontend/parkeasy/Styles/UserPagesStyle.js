import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'
const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window

const userPagesStyle= StyleSheet.create({
     mainPageContainer: {
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'space-evenly',
     },

    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        height: '10%',
        borderColor: COLORS.Black,
        borderWidth: 1,
        backgroundColor: COLORS.LightSeaGreen,
    },

    menuIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        alignItems: 'center',
    },

    profileIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        alignItems: 'center',
    },

    searchContainer: {
        fontSize: SIZES.medium,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '15%',
        padding: 10,

    },

    searchInput: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.White,
        borderColor: COLORS.Grey,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: width * 0.08, // 8% of screen width
        color: COLORS.Black,
        shadowOpacity: 1,
        shadowColor: COLORS.Grey,
        shadowRadius: 2,
        shadowOffset: 2
    },

    mapContainer: {
        height: '80%',
        backgroundColor: COLORS.White,
    }
})

export default userPagesStyle;