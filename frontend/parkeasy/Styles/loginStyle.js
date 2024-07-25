import { StyleSheet } from "react-native"
import {COLORS, SIZES} from "../Constants/constants"
const loginStyle = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    form:{
        borderRadius: 10,
        backgroundColor: COLORS.FORM_BACKGROUND_COLOR,
        alignItems: 'center',
        width: SIZES.FORM_WIDTH,
    },

    inputConatiner:{
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 20, 
        
    },

    input:{
        flex: 2, 
        height: 40,
        borderBottomWidth: 0,
        color: COLORS.INPUT_FONT_COLOR,
        fontSize: 16,
        paddingHorizontal: 10,
        borderBottomWidth: 1, 
        borderBottomColor: COLORS.INPUT_FONT_COLOR, 
        marginHorizontal: 20,
        marginTop:10,
        textAlign:'center',
    },

    button:{
        backgroundColor: COLORS.BUTTON_COLOR_UNPRESSED,
        fontSize: 16,
        marginTop: 50, 
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        fontStyle: 'sans-serif'
    },


})

export default loginStyle;