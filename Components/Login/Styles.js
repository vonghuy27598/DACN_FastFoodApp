import React from 'react';
import {StyleSheet} from 'react-native';

const font = {
    fontFamily: 'cornish'
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    headerArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',


    },
    bg_header: {
        flex: 1,
        width: '100%',
        height: '150%',
        resizeMode: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',

        alignItems: 'flex-end',

    },
    imageHeader: {
        width: '20%',
        height: null,
        aspectRatio: 180 / 186,
        marginHorizontal: 60

    },
    titleTextHeader: {
        ...font,
        fontSize: 45,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 10,
        position: 'absolute',
        top: 35,
        left: 65,
        alignItems: 'center',
        fontFamily: 'cornish',
        color: '#fff',


    },
    bodyArea: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingTop: 30,
        paddingHorizontal: 15,
        alignContent: 'center',
        alignItems: 'center'

    },
    formArea: {
        width: '90%',
        alignItems: 'flex-start',
        marginHorizontal: 'auto',
        marginVertical: 15

    },
    titleText: {
        ...font,

        fontSize: 20
    },
    textInput: {
        ...font,
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    nameButton: {
        ...font,
    },
    buttonSignIn: {

        width: '90%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f5bf2b',
        borderRadius: 30,
        marginVertical: 10,
    },
    buttonSignUp: {
        width: '90%',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: '#f5bf2b',
        borderWidth: 2,
        borderRadius: 30,
        marginVertical: 10,
    }
}); 

export default styles;