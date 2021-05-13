import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import validateForm from '../../Validate/ValidateForm.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import ShowLoading from '../Service/Loading.js';
import Color from '../Service/Color.js';
import mainFont from '../Service/Font.js';
import { DrawerActions } from '@react-navigation/routers';



export default function SignIn({ navigation }) {

    const [hidePass, setHidePass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [text_email, setText_email] = useState('');
    const [text_password, setText_passWord] = useState('');
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const togglePass = () => {
        setHidePass(!hidePass);

    }

    async function setData(email, pass, userID) {
        try {
            const dataList = [{ "login": true, "email": email, "password": pass }];
            await AsyncStorage.setItem("dataUser", JSON.stringify(dataList));
            await AsyncStorage.setItem("userID", userID);
        } catch (error) {
            console.log("errorSetData: ", error);
        }
    }

    async function getData() {
        try {
            let dataUser = await AsyncStorage.getItem("dataUser");
            if (dataUser != null) {
                let data = JSON.parse(dataUser);

                data.map((item) => {
                    setText_email(item.email);
                    setText_passWord(item.password);
                    if (item.login)
                        Login(item.email, item.password);

                })
            }

        } catch (eroor) {
            console.log("errorGetData: ", error);
        }
    }

    useEffect(() => {
        getData();
        return () => {

        }
    }, []);

    function Login(email, pass) {

        if (validateForm.isEmpty(email)) {
            Alert.alert("Thông báo", "Email không được rỗng");
            emailInput.current.focus();
        } else if (validateForm.isEmpty(pass)) {
            Alert.alert("Thông báo", "Mật khẩu không được rỗng");
            passwordInput.current.focus();
        } else if (validateForm.isEmail(email)) {
            Alert.alert("Thông báo", "Email không hợp lệ");
            emailInput.current.focus();
        } else {
            firebaseApp.auth().signInWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    // Signed in
                    setIsLoading(true);
                    setTimeout(() => {
                        var user = userCredential.user;
                        setData(email, pass,user.uid);
                        navigation.navigate('Main');
                        setIsLoading(false);
                    }, 3000)

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
                        autoCapitalize="none"
                        
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
                <TouchableOpacity style={styles.buttonSignIn} onPress={() => Login(text_email, text_password)}>
                    <Text style={styles.nameButton}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.nameButton}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? <ShowLoading /> : null}
        </SafeAreaView>
    );
}
const font = mainFont;


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
        borderWidth: 0,
        borderBottomColor: 'transparent'
    },
    nameButton: {
        ...font,
    },
    buttonSignIn: {

        width: '90%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: Color.mainColor,
        borderRadius: 30,
        marginVertical: 10,
    },
    buttonSignUp: {
        width: '90%',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: Color.mainColor,
        borderWidth: 2,
        borderRadius: 30,
        marginVertical: 10,
    }
});

