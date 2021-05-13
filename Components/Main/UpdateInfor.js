import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../Service/Color.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import LoadingInBG from '../Service/LoadingInBG.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateInfor = ({ route, navigation }) => {
    const { type, data } = route.params;
    const [idUser, setIdUser] = useState();
    const [text, setText] = useState(data);
    const [keyType, setKeyType] = useState('default');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    useEffect(() => {
        getData();
        setIsLoading(false);
        setIsLoadingUpdate(false);
    }, [text]);
    const getData = async () => {
        let userID = await AsyncStorage.getItem("userID");
        setIdUser(userID);
        switch (type) {
            case "Name":
                navigation.setOptions({
                    headerTitle: "Họ tên của bạn",
                });
                break;
            case "Email":
                navigation.setOptions({
                    headerTitle: "Email của bạn",
                });
                setKeyType('email-address');

                break;
            case "Phone":
                navigation.setOptions({
                    headerTitle: "Số điện thoại",
                });
                setKeyType('phone-pad');

                break;
            case "Address":
                navigation.setOptions({
                    headerTitle: "Địa chỉ",
                });

                break;
        }
    }
    const handleUpdate = () => {
        setIsLoadingUpdate(true);
        console.log('update', 'start');
        switch (type) {
            case "Name":
                firebaseApp.database().ref("/Users/" + `${idUser}`).update({
                    Name: text
                }).then(() => {
                    Alert.alert("", "Cập nhật họ tên thành công");
                    setIsLoadingUpdate(false);
                    navigation.navigate("User");
                })
                break;
            case "Email":
                firebaseApp.database().ref("/Users/" + `${idUser}`).update({
                    Email: text
                }).then(() => {
                    Alert.alert("", "Cập nhật email thành công");
                    setIsLoadingUpdate(false);
                    navigation.navigate("User");
                })
                break;
            case "Phone":
                firebaseApp.database().ref("/Users/" + `${idUser}`).update({
                    Phone: text
                }).then(() => {
                    Alert.alert("", "Cập nhật số điện thoại thành công");
                    setIsLoadingUpdate(false);
                    navigation.navigate("User");
                })
                break;
            case "Address":
                firebaseApp.database().ref("/Users/" + `${idUser}`).update({
                    Address: text
                }).then(() => {
                    Alert.alert("", "Cập nhật địa chỉ thành công");
                    setIsLoadingUpdate(false);
                    navigation.navigate("User");
                })
                break;
        }


    }
    return (
        <View style={{ paddingHorizontal: 10, marginTop: 20, flex: 1 }}>
            {isLoading ? <ActivityIndicator size='large' color={'#000'} /> : <View>
                <TextInput
                    style={styles.textInput}
                    // ref={emailInput}
                    keyboardType={keyType}
                    autoFocus={true}
                    value={text}
                    autoCapitalize="none"
                    onChangeText={(val) => { setText(val) }} />
                <TouchableOpacity style={styles.buttonUpdate} onPress={() => { handleUpdate() }}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>Cập nhật thông tin</Text>
                </TouchableOpacity>
            </View>}
            <LoadingInBG loading={isLoadingUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,

        backgroundColor: '#fff'
    },
    buttonUpdate: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: Color.mainColor,
        borderRadius: 30,
        marginVertical: 10,

    }
});

export default UpdateInfor;