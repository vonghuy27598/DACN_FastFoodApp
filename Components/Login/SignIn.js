import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import validateForm from '../../Validate/ValidateForm.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';
const fetchFonts = () => {
    return Font.loadAsync({
        'cornish': require('../../assets/fonts/SVN-Cornish.ttf')

    });
};
export default function SignIn({ navigation }) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [text_email, setText_email] = useState('');
    const [text_password, setText_passWord] = useState('');
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const togglePass = () => {
        setHidePass(!hidePass);
    }

    const Login = () => {
        if (validateForm.isEmpty(text_email)) {
            Alert.alert("Thông báo", "Email không được rỗng");
            emailInput.current.focus();
        } else if (validateForm.isEmpty(text_password)) {
            Alert.alert("Thông báo", "Mật khẩu không được rỗng");
            passwordInput.current.focus();
        } else if (validateForm.isEmail(text_email)) {
            Alert.alert("Thông báo", "Email không hợp lệ");
            emailInput.current.focus();
        } else {
            firebaseApp.auth().signInWithEmailAndPassword(text_email, text_password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    navigation.navigate('Main');

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    // var errorMessage = error.message;
                    if (errorCode === "auth/wrong-password")
                        Alert.alert("Mật khẩu không đúng");
                    if (errorCode === "auth/user-not-found")
                        Alert.alert("Email không tồn tại");
                   
                });
        }
    }

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
                    <TextInput
                        style={styles.textInput}
                        ref={emailInput}
                        keyboardType='email-address'
                        autoFocus={true}
                        value={text_email}
                        onChangeText={(val) => { setText_email(val) }}
                    />
                    <Text style={styles.nameButton}>Mật khẩu</Text>
                    <View style={[styles.textInput, styles.areaPassword]}>
                        <TextInput secureTextEntry={hidePass}
                            value={text_password}
                            ref={passwordInput}
                            onChangeText={(val) => setText_passWord(val)} style={styles.inputPassword} />
                        <TouchableOpacity style={styles.hidePassword}
                            onPress={() => { togglePass() }}>
                            <Icon name={hidePass ? "visibility-off" : "visibility"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSignIn} onPress={() => Login()}>
                    <Text style={styles.nameButton}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.nameButton}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
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
        paddingVertical: 5,
        flexDirection: 'row',

    },
    areaPassword: {
        paddingRight: 38,
    },
    hidePassword: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    inputPassword: {
        width: '100%',
        height: '100%',
        ...font,
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

