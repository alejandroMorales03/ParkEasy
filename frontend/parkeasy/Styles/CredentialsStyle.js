import { StyleSheet } from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const CredentialsStyle= StyleSheet.create({

    fullPageContainer: {
        flex: 1,
        backgroundColor: COLORS.White
    },

    textContainerFB:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 20,

    },

    normalText: {
        fontSize: SIZES.small,
        fontWeight: "normal",
        color: COLORS.Grey
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
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.White
    },

    input: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: COLORS.Transparent,
        borderBottomColor: COLORS.Grey,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: COLORS.Black,

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
        alignItems: 'center'
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

    icons: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignItems: 'center',
        marginLeft: 5,
    }

})

export default CredentialsStyle;