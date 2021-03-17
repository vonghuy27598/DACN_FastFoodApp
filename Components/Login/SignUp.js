import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
    return Font.loadAsync({
        'cornish': require('../../assets/fonts/SVN-Cornish.ttf')

    });
};

export default function SignUp() {
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (


            <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} />
        );
    }
    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.headerArea}>
                <ImageBackground source={require('../../assets/imagesApp/bg_header.jpg')} style={styles.bg_header}>
                    <Text style={styles.titleTextHeader}>H-Food</Text>
                    <Image source={require('../../assets/imagesApp/shipper.png')} style={styles.imageHeader} />
                </ImageBackground>
            </View>
            <View style={styles.bodyArea}>
                <Text style={styles.titleText}>ĐĂNG NHẬP</Text>
                <View style={styles.formArea}>
                    <Text style={styles.nameButton}>Email</Text>
                    <TextInput style={styles.textInput} />
                    <Text style={styles.nameButton}>Mật khẩu</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true}/>
                </View>
                <TouchableOpacity style={styles.buttonSignIn}>
                    <Text style={styles.nameButton}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUp}>
                    <Text style={styles.nameButton}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
const font = {
    fontFamily:'cornish'
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
        marginHorizontal:60

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
    nameButton:{
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

