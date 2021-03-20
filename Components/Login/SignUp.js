import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground,Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import auth from '@react-native-firebase/app';
import validateForm from '../../Validate/ValidateForm.js';

const fetchFonts = () => {
    return Font.loadAsync({
        'cornish': require('../../assets/fonts/SVN-Cornish.ttf')

    });
};

export default function SignUp({ navigation }) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [text_email, setText_email] = useState('');
    const [text_password, setText_passWord] = useState('');
    const [reText_password, setReText_passWord] = useState('');
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const rePasswordInpnut = useRef(null);
    
    const togglePass = () => {
        setHidePass(!hidePass);
    }
    const toggleRePass = () => {
        setHideRePass(!hideRePass);
    }
    const signUpEmail = () => {
        if (validateForm.isEmpty(text_email)) {
            Alert.alert("Thông báo", "Email không được rỗng");
            emailInput.current.focus();
        } else if (validateForm.isEmpty(text_password)) {
            Alert.alert("Thông báo", "Mật khẩu không được rỗng");
            passwordInput.current.focus();
        }
        else if (text_password != reText_password) {
            Alert.alert("Thông báo", "Nhập lại mật khẩu không đúng");
            rePasswordInpnut.current.focus();
        }else if(text_password.length<6){
            Alert.alert("Thông báo", "Vui lòng nhập mật khẩu trên 6 ký tự");
            passwordInput.current.focus();
        }else if(validateForm.isEmail(text_email)){
            Alert.alert("Thông báo", "Email không hợp lệ");
            emailInput.current.focus();          
        }
        else{
            auth()
            .createUserWithEmailAndPassword(text_email,text_password)
            .then(() => {
                Alert.alert("Thông báo","Đăng ký thành công");
                navigation.navigate("SignIn");
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }
                console.error(error);
            });
        }
       
    }
    useEffect(() => {
        // custom header left navigation
        navigation.setOptions({
            headerLeft: (props) => (

                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', borderRadius: 30, marginLeft: 10, padding: 5 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name='chevron-left' color='#fff'></Icon>
                    </TouchableOpacity>
                </View>
            ),
        })
    })


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
                <Text style={styles.titleText}>ĐĂNG KÝ</Text>
                <View style={styles.formArea}>
                    <Text style={styles.nameButton}>Email</Text>
                    <TextInput style={styles.textInput}
                        ref={emailInput}
                        keyboardType='email-address'
                        autoFocus={true}
                        value={text_email}
                        onChangeText={(val) => { setText_email(val) }} />
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
                    <Text style={styles.nameButton}>Nhập lại mật khẩu</Text>
                    <View style={[styles.textInput, styles.areaPassword]}>
                        <TextInput secureTextEntry={hideRePass}
                            value={reText_password}
                            ref={rePasswordInpnut}
                            onChangeText={(val) => setReText_passWord(val)}
                            style={styles.inputPassword} />
                        <TouchableOpacity style={styles.hidePassword}
                            onPress={() => { toggleRePass() }}>
                            <Icon name={hideRePass ? "visibility-off" : "visibility"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSignIn}
                    onPress={() => signUpEmail()}>
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

