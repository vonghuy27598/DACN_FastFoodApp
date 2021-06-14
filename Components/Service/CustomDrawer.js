import React, { useState, useEffect } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,

} from '@react-navigation/drawer';
import { View, Text, FlatList } from 'react-native';
import CategoryListItem from '../Main/CategoryFood/CategoryListItem.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import Color from './Color.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import mainFont from './Font.js';
import { ImageBackground } from 'react-native';



const CustomDrawer = ({ navigation }) => {
    const [dataCategory, setDataCategory] = useState([{

    }]);
    const insets = useSafeAreaInsets();
    const font = mainFont;
    useEffect(() => {
        function getCategoryList() {
            const rootRef = firebaseApp.database().ref()
                .on('value', (snapshot) => {
                    const data = Object.keys(snapshot.child('Category').val());
                    const listData = [];
                    data.map((item) => {
                        firebaseApp.database().ref().on('value', (category) => {
                            // // console.log("img", category.child('Category').child(`${item}`).child("images").val());
                            // // console.log("name", Object.keys(category.child('Category').child(`${item}`).child("DM_NAME").val()));
                            var img = category.child('Category').child(`${item}`).child("images").val();
                            var name = Object.keys(category.child('Category').child(`${item}`).child("DM_NAME").val());
                            listData.push({ "id": item, "name": name[0], "img": img });
                            setDataCategory(listData);
                            // setDataCategory([...dataCategory, { "id": i, "name": name[0], "img": img }]);                           
                        })
                    });
                });
            return rootRef;
        }
        getCategoryList();
        
    }, []);

    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                paddingTop: insets.bottom,
            }}>
            <View >
                <ImageBackground source={require('../../assets/imagesApp/bg_header.jpg')}
                    style={{
                        flex: 1,
                        height: 100,
                        backgroundColor: Color.mainColor,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        ...font,
                        fontSize: 30,
                        color: '#fff',
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 10,
                        textShadowColor: 'rgba(0, 0, 0, 0.9)',
                    }}>
                        H-Food
                </Text>
                </ImageBackground>

            </View>
            <View style={{
                flex: 3,

            }}>
                <FlatList
                    style={{
                        width: '95%',

                        backgroundColor: '#fff',
                        alignSelf: 'center',
                       
                    }}
                    scrollEnabled={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={dataCategory}
                    renderItem={({ item }) => <CategoryListItem id={item.id} name={item.name} img={item.img} border={true} route={navigation} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
            {/* <DrawerItem label='Đăng xuất' /> */}
        </DrawerContentScrollView>
    );
}

export default CustomDrawer;