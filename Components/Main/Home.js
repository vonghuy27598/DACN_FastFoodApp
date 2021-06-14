import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import CategoryListItem from './CategoryFood/CategoryListItem.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';


const Home = ({ navigation }) => {
    const [imagesSlider, setImagesSlider] = useState([
        require('../../assets/imagesApp/banner1.jpg'),
        require('../../assets/imagesApp/banner2.jpg'),
        require('../../assets/imagesApp/banner3.jpg'),
        require('../../assets/imagesApp/banner4.jpg'),
    ]);
    const [dataCategory, setDataCategory] = useState([]);
    useEffect(() => {
        if (dataCategory.length === 0) {
            getCategoryList();
        }
    }, []);
    const getCategoryList = async () => {
        console.log('getdata');
        const rootRef = await firebaseApp.database().ref()
            .once('value', (snapshot) => {
                const data = Object.keys(snapshot.child('Category').val());
                const listData = [];
                data.map((item) => {
                    firebaseApp.database().ref().on('value', (category) => {
                        var img = category.child('Category').child(`${item}`).child("images").val();
                        var name = Object.keys(category.child('Category').child(`${item}`).child("DM_NAME").val());
                        listData.push({ "id": item, "name": name[0], "img": img });
                        setDataCategory(listData);            
                    })
                });
            });
    }
    return (
        <View>
            <SliderBox
                images={imagesSlider}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                paginationBoxStyle={{
                    position: "absolute",
                    bottom: 0,
                    padding: 0,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingVertical: 10
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.92)"
                }}
                ImageComponentStyle={{ borderRadius: 15, width: '95%', marginTop: 5, backgroundColor: 'transparent' }}
                width={'95%'}
                imageLoadingColor="#2196F3"
            />
            <FlatList
                style={{
                    width: '95%',
                    marginTop: 25,
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#f0f0f0',
                    borderStyle: "dotted",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}
                scrollEnabled={false}
                numColumns={4}
                data={dataCategory}
                renderItem={({ item }) => <CategoryListItem id={item.id} name={item.name} img={item.img} border={false} route={navigation} />}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    );
}

export default Home;