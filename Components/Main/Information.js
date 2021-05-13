import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Information = ({navigation }) => {
    
    const [listShow, setListShow] = useState([
        { title: "Thông tin cá nhân", icon: "supervised-user-circle", route: 'information' },
        { title: "Lịch sử đặt hàng", icon: "history", route: "history" },
        { title: "Giới thiệu ứng dụng", icon: "list-alt", route: "introduce" },
        { title: "Đăng xuất", icon: "logout", route: "logout" }


    ]);

    const getList = ({ item }) => {
        return (
            <TouchableOpacity style={styles.container} onPress={() => changeScreen(item.route)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon type="FontAwesome" name={item.icon} style={{ marginRight: 10 }} />
                    <Text>{item.title}</Text>
                </View>

                <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} />
            </TouchableOpacity>
        );
    }
    async function Logout() {
        let dataUser = await AsyncStorage.getItem("dataUser");
        let data = JSON.parse(dataUser);
        data.map(async (item) => {
            const dataList = [{ "login": false, "email": item.email, "password": item.pass }];
            await AsyncStorage.setItem("dataUser", JSON.stringify(dataList));
        });
        navigation.navigate('SignIn');
    }
    
    const changeScreen = (route) => {
        switch (route) {
            case "information":
                // Infor();
                navigation.navigate("User");
                break;
            case "history":
                navigation.navigate("Home");
                break;
            case "introduce":
                navigation.navigate("Home");
                break;
            case "logout":
                Logout();
                break;

        }
    }
    const ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#C8C8C8'
                }}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                data={listShow}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={getList}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',



    }
});

export default Information;