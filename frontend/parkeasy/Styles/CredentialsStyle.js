import { StyleSheet } from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const CredentialsStyle= StyleSheet.create({

    mainTitle:{
        fontSize: SIZES.extraLarge,
        fontWeight:'bold',
    },

    loginPageContainer: {
        justifyContent: 'space-evenly',
        padding: 10,
        height: '100%',
        width: '100%',
    },

    credentialsContainer: {
        borderRadius: 30,
        padding: 20,
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        // backgroundColor: CONTAINERS.PrimaryColorContainer,
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
        // borderRadius: 10,
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