import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window

const CredentialsStyle= StyleSheet.create({


    ///CONTAINERS

    topContainer: {
        height: 110,
        textAlign: "left",
        justifyContent: 'space-between',
    },

    textContainerFB:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: height * 0.03, // 3% of screen height

    },

    fullPageContainer: {
        flex: 1,
        backgroundColor: COLORS.White
    },

    loginPageContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 30,
        height: '100%',
        width: '100%',

    },

    credentialsContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginHorizontal: 3
    },

    linksContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ///TEXT FORMATS

    mainTitle:{
        fontSize: SIZES.extraLarge,
        fontWeight:'bold',
    },

    mainTitleAlter: {
        fontSize: SIZES.medium,
        fontWeight:'bold',
    },

    mainTitleFont: {
        fontSize: SIZES.medium * (width / 375),
        fontWeight: 'bold',
        color: COLORS.White
    },

    bottomLinks: {
        color: COLORS.GreenMain,
        marginVertical: 10, // Adjust this value for closer spacing
    },

    imageLogo: {
        width: 180, // Adjust size as needed
        height: 180, // Adjust size as needed
        resizeMode: 'contain', // Keeps aspect ratio
        alignSelf: 'center',
    },




})

export default CredentialsStyle;