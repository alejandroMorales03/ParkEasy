import { StyleSheet } from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS, BUTTON } from '../Constants/Constants'

const LoginStyle= StyleSheet.create({

    mainTitle:{
        fontSize: SIZES.extraLarge,
    },

    loginPageContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    loginBoxContainer: {
        borderRadius: 30,
        padding: 20,
        width: '75%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: CONTAINERS.PrimaryColorContainer,
    },

    mainTitleFont: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.White
    },

    input: {
        height: 40,
        width: '100%',
        borderColor: COLORS.Black,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: COLORS.Black,
        backgroundColor: COLORS.White,

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
        marginVertical: 5, // Adjust this value for closer spacing
    },

    imageLogo: {
        width: 180, // Adjust size as needed
        height: 180, // Adjust size as needed
        resizeMode: 'contain', // Keeps aspect ratio
    },

})

export default LoginStyle;