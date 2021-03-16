import React, { Component } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {
    useFonts,
   
  } from '@expo-google-fonts/inter';
export default class SignIn extends Component {
    // constructor (props){
    //     super(props);
    //     this.state={
    //         email:'',
    //         password:'',
    //     };
    // }
    render() {
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
                        <Text>Email</Text>
                        <TextInput style={styles.textInput} ref="TextInput" />
                        <Text>Mật khẩu</Text>
                        <TextInput style={styles.textInput} />
                    </View>
                    <TouchableOpacity style={styles.buttonSignIn}>
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignUp}>
                        <Text>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },  
    imageHeader: {
        width: '20%',
        height: null,
        aspectRatio: 180 / 186,

    },
    titleTextHeader: {
      
        fontSize: 30,
        position:'absolute',
        top:50,
        left:0,
        textShadowColor:'#000',
        fontFamily:'SVN-Cornish'

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
        fontWeight: 'bold',
        fontSize: 20
    },
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
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