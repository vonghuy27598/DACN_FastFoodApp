import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import { firebaseApp } from '../../Service/FirebaseConfig.js';
import mainFont from '../../Service/Font.js';
import Color from '../../Service/Color.js';
const CategoryListItem = (props) => {
    const [urlImages, setUrlImages] = useState();
    const [loadding, setLoadding] = useState(true);
    useEffect(() => {
        async function getImages() {
            const ref = firebaseApp.storage().ref('images/icon/' + `${props.img}`);
            const url = await ref.getDownloadURL();

            setUrlImages(url);
            setLoadding(false);
        }
        getImages();
        return () =>{
            setLoadding(false);
        }
    }, [])


    return (
        !props.border ?
            <TouchableOpacity style={style.container}
                onPress={() => props.route.navigate('CategoryDetail', {
                    DM_ID: props.id,
                    DM_NAME: props.name
                })}>
                {
                    loadding ? <ActivityIndicator size='large' color={'#000'} /> :
                        <View>
                            <Image source={{ uri: `${urlImages}` }} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                            <Text style={style.categoryName}> {props.name} </Text>
                        </View>
                }
            </TouchableOpacity >
            :
            <TouchableHighlight style={style.singleContainer}
                activeOpacity={0.8}
                
                underlayColor={Color.mainColor}
                onPress={() => props.route.navigate('CategoryDetail', {
                    DM_ID: props.id,
                    DM_NAME: props.name
                })}>

                {
                    loadding ? <ActivityIndicator size='large' color={'#000'} /> :
                        <View>
                            <Image source={{ uri: `${urlImages}` }} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                            <Text style={style.categoryName}> {props.name} </Text>
                        </View>
                }
            </TouchableHighlight >

    );
}

const font = mainFont;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    categoryName: {
        ...font,
        marginTop: 5,
        fontSize: 12,
        alignSelf: 'center'
    },
    singleContainer: {
        flex: 1,
        backgroundColor:'#fff',
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderStyle: "dotted",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },


});

export default CategoryListItem;