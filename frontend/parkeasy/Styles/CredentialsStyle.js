import {Dimensions, StyleSheet} from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const { width, height } = Dimensions.get('window'); // collects the dimensions of the current window

const CredentialsStyle= StyleSheet.create({

    fullPageContainer: {
        flex: 1,
        backgroundColor: COLORS.White
    },

    textContainerFB:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: height * 0.03, // 3% of screen height

    },

    mainTitle:{
        fontSize: SIZES.extraLarge,
        fontWeight:'bold',
    },

    mainTitleAlter: {
        fontSize: SIZES.medium,
        fontWeight:'bold',
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
        // borderColor: COLORS.Grey,
        // borderWidth: 1,
    },

    mainTitleFont: {
        fontSize: SIZES.medium * (width / 375),
        fontWeight: 'bold',
        color: COLORS.White
    },

    button: {
        backgroundColor: BUTTON.ButtonPrimaryBackgroundColor,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },

    buttonText: {
        color: COLORS.White,
        fontSize: SIZES.small,
    },

    linksContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomLinks: {
        color: COLORS.PersianGreen,
        marginVertical: 10, // Adjust this value for closer spacing
    },

    imageLogo: {
        width: 180, // Adjust size as needed
        height: 180, // Adjust size as needed
        resizeMode: 'contain', // Keeps aspect ratio
        alignSelf: 'center',
    },

    fieldCredential: {
        flexDirection: 'row',
        alignItems: 'center', // Aligns input and icon vertically centered
        marginVertical: 2, // Adds spacing between input fields
    },

})

export default CredentialsStyle;