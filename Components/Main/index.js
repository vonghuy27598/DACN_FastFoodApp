import React, { useEffect } from 'react';
import Home from './Home.js';
import Location from './Location.js';
import Information from './Information.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from '../Service/Color.js';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,

} from 'react-native-popup-menu';
import { DrawerActions } from '@react-navigation/native';

// "permissions": [ "ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION", "ACCESS_BACKGROUND_LOCATION" ],

const Tab = createBottomTabNavigator();


const Main = ({navigation }) => {
    
    useEffect(() => {
        // custom header left navigation
        navigation.setOptions({

            headerLeft: (props) => (
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} >
                    <Icon
                        containerStyle={styles.icon}
                        type="ionicon"
                        name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                        color='black'
                    />
                </TouchableOpacity>
            ),
            headerRight: (props) => (
                <View style={styles.areaRight}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginHorizontal: 20 }}>
                        <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "search"} color='black' />

                    </TouchableOpacity>
                    <TouchableOpacity >
                        {/* <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "search"} color='black' /> */}

                    </TouchableOpacity>
                    <Menu>
                        <MenuTrigger>
                            <Image source={require('../../assets/imagesApp/icon/icon_user.png')} style={{ width: 25, height: 25 }} resizeMode='cover' />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ marginTop: 40, width: 150, position: "relative" }}>
                            <View style={styles.triangle}></View>
                            <MenuOption onSelect={() => navigation.navigate('User')} text='Thông tin cá nhân' />
                            <MenuOption onSelect={() => Logout()} text='Đăng xuất' />
                        </MenuOptions>
                    </Menu>
                </View>
            ),
            headerBackground: (
                <Image
                    style={StyleSheet.absoluteFill}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
                />
            ),
        })
    },[])

    async function Logout() {
        let dataUser = await AsyncStorage.getItem("dataUser");
        let data = JSON.parse(dataUser);
        data.map(async (item) => {
            const dataList = [{ "login": false, "email": item.email, "password": item.pass }];
            await AsyncStorage.setItem("dataUser", JSON.stringify(dataList));
        });
        navigation.navigate('SignIn');
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: Color.mainColor,
                inactiveTintColor: '#dfdede',
                style: {
                    backgroundColor: '#fff'
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }} />
            <Tab.Screen
                name="Location"
                component={Location}
                options={{
                    tabBarLabel: 'Địa điểm',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="map-marker"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Infor"
                component={Information}
                
                options={{
                    tabBarLabel: 'Cá nhân',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="information"
                            color={color}
                            size={size}
                        />
                    ),
                    
                }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        paddingLeft: 10
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 120
    },
    areaRight: {
        flexDirection: 'row',
        paddingHorizontal: 10,

    },
    triangle: {
        width: 10,
        height: 10,
        position: "absolute",
        top: -10,
        right: 3,
        borderLeftWidth: 10,
        borderLeftColor: "transparent",
        borderRightWidth: 10,
        borderRightColor: "transparent",
        borderBottomWidth: 10,
        borderBottomColor: "#fff"
    }
});

export default Main;