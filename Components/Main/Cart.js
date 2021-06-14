import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListCartItem from './CategoryFood/ListCartItem.js';
const Cart = () => {
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    const [listData, setListData] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getCart();

    }, [listData, total]);
    const getCart = async () => {
        // await AsyncStorage.removeItem('listCart');
        let listCart = await AsyncStorage.getItem('listCart');
        if (listCart != null) {
            setListData(JSON.parse(listCart));

            let tongTien = 0;
            JSON.parse(listCart).map((item) => {
                tongTien += (item.DONGIA * item.AMOUNT);
            });
            setTotal(tongTien);
        }

    }
    return (
        <View style={{flex:1}}>
            {listData.length > 0 ? <FlatList
                style={{ flex: 1 }}
                data={listData}
                extraData={listData}
                renderItem={({ item, index }) => <ListCartItem tensp={item.TENSP} sl={item.AMOUNT} dongia={item.DONGIA} id={item.ID} id_dm={item.ID_DM} index={index} />}
                keyExtractor={(item, index) => `${index}`}
            /> : <View>
                <Image source={require('../../assets/imagesApp/empty-cart.png')} resizeMode={'cover'} style={{ width: '100%', height: 100 }} />
                <Text>Giỏ hàng rỗng</Text>
            </View>}
        </View>
    );
}

export default Cart;