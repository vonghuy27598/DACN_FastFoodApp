import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";
import mainColor from '../../Service/Color.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListCartItem = (props) => {
    const [amount, setAmount] = useState(props.sl);
    useEffect(() => {
        updateAmount();
    }, [props.sl]);

    const updateAmount = async () => {
        setAmount(props.sl);
    }

    const updateList = async (event) => {
        let listCart = await AsyncStorage.getItem('listCart');
        const newList = JSON.parse(listCart).map((item) => {
            if (item.ID === props.id && item.ID_DM === props.id_dm) {
                switch (event) {
                    case 1:
                        return { ...item, AMOUNT: item.AMOUNT + 1 };
                    case 2:
                        return { ...item, AMOUNT: item.AMOUNT - 1 };
                }
            } else {

                // console.log('testList', ...item);
                return { ...item };
            }
        });
        // console.log('updateList', newList);
        await AsyncStorage.setItem('listCart', JSON.stringify(newList));
    }
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    const handleChangeAmount = (event) => {
        switch (event) {
            case 1:
                updateList(1);
                setAmount(props.sl + 1);
                break;
            case 2:
                if (amount > 1) {
                    updateList(2);
                    setAmount(props.sl - 1);
                }
                else
                    ToastAndroid.show("Số lượng phải lớn hơn 0", ToastAndroid.SHORT);
                break;
        }
    }
    const deleteItem = async () => {
        let listCart = await AsyncStorage.getItem('listCart');
        const listDelete = JSON.parse(listCart).filter((item, index) => index !== props.index);
        console.log('listDelete', listDelete);
        await AsyncStorage.setItem('listCart', JSON.stringify(listDelete));
      
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', height: 100, padding: 10 }}>
                <View style={{ width: 100 }}>
                    <Image source={{ uri: 'https://th.bing.com/th/id/Re3eea138f835647bbc15767ecac57326?rik=6oZsHLOB89RoZA&pid=ImgRaw' }} style={{ width: 90, height: 80, borderRadius: 30 }} resizeMode={'stretch'} />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>

                    <Text>
                        {props.tensp}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.buttonDown} onPress={() => handleChangeAmount(2)}>
                                <Text >-</Text>
                            </TouchableOpacity>
                            <Text style={{ paddingHorizontal: 20 }}>
                                {amount}
                            </Text>
                            <TouchableOpacity style={styles.buttonUp} onPress={() => handleChangeAmount(1)}>
                                <Text >+</Text>
                            </TouchableOpacity>
                        </View>

                        <Text>
                            {currencyFormat(props.dongia)}đ
                        </Text>
                    </View>

                </View>
                <View style={{ width: 30, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { deleteItem() }}>
                        <Icon type='Fontisto' name='close' containerStyle={{ borderWidth: 1, borderRadius: 30, borderColor: '#a5a5a5' }} size={15} color={'#a5a5a5'} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 5

    },
    buttonUp: {
        width: 30,
        height: 30,
        borderWidth: 0.1,
        borderColor: '#000',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor.mainColor

    },
    buttonDown: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#d5d5d5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',


    },
});
export default ListCartItem;