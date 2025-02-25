import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'
const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window

const userPagesStyle= StyleSheet.create({

    //CONTAINERS
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: COLORS.White,
        paddingHorizontal: 20, // 8% of screen width
        paddingTop: 70,
        paddingBottom: 30,
        flexDirection: 'column',  // Ensure vertical stacking
        justifyContent: 'space-between',  // Start items from the top
    },
    mainPageContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    googleMapView:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',


    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        backgroundColor: COLORS.DarkGreen,
        paddingHorizontal: width * 0.08, // 8% of screen width
        borderRadius: 37,
    },
    contentContainer: {
        fontSize: SIZES.medium,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 60,  // Set a fixed height for the search bar
        backgroundColor: COLORS.White,  // Set a background color to differentiate it
        borderRadius: 27,
        paddingHorizontal: width * 0.05, // 8% of screen width
        paddingVertical: width * 0.05,
        color: COLORS.Black,
        shadowOpacity: 1,
        shadowColor: COLORS.Grey,
        shadowRadius: 2,
        shadowOffset: 2,

    },

    // MAP STYLE

    map: {
        ...StyleSheet.absoluteFillObject,

    },

    // ICON STYLE
    mediumMenuIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    largeMenuIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    smallMenuIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        alignItems: 'center',
    },

    //SEARCH STYLE
    searchInput: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        backgroundColor: COLORS.White,

    },

    //PILL MENU STYLE

})

export default userPagesStyle;