import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ToastAndroid, Modal, TouchableOpacity, FlatList } from 'react-native';
import firebaseApp from '../Service/FirebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "react-native-elements";
import mainColor from '../Service/Color.js';
import ListCartItem from './CategoryFood/ListCartItem.js';
import { Alert } from 'react-native';
import { LogBox } from 'react-native';
import { ImageBackground } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
const FoodDetail = ({ route, navigation }) => {
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    const { id, tensp, dongia, thoigian, danhgia, anh, dm } = route.params;
    const [amount, setAmount] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [listData, setListData] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getCart();
        setUpRightHeader();
    }, [listData, , openModal, total]);
    const setUpRightHeader = () => {
        navigation.setOptions({
            headerRight: (props) => (
                <View>
                    <TouchableOpacity
                        style={{ paddingRight: 10, flexDirection: 'row' }}
                        onPress={() => { setOpenModal(true) }}
                    >
                        <Icon name='shopping-cart' color="#fff"></Icon>
                    </TouchableOpacity>
                </View>
            ),
        })
    }
    const handleChangeAmount = (event) => {
        switch (event) {
            case 1:
                setAmount(amount + 1);
                break;
            case 2:
                if (amount > 1)
                    setAmount(amount - 1);
                else
                    ToastAndroid.show("Số lượng phải lớn hơn 0", ToastAndroid.SHORT);
                break;
        }
    }

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
    const addCart = async () => {
        setOpenModal(true);
        // await AsyncStorage.removeItem('listCart');
        const listAdd = listData;
        let existAmount = amount;
        const food = [{ ID: id, TENSP: tensp, DONGIA: dongia, AMOUNT: amount, ID_DM: dm }];
        let existFood = false;
        if (listData.length > 0) {
            const newList = listData.map((item) => {
                if (item.ID === id && item.ID_DM === dm) {
                    console.log(true);
                    existFood = true;
                    return { ...item, AMOUNT: item.AMOUNT + existAmount };
                } else {
                    console.log(false);
                    return { ...item };
                }
            });
            let List;
            if (existFood == true) {
                List = newList;
            } else {
                List = newList.concat(food);
            }
            // console.log(List);
            setListData(List);
            await AsyncStorage.setItem('listCart', JSON.stringify(List));
        } else {
            listAdd.push(...food);
            setListData(listAdd);
            await AsyncStorage.setItem('listCart', JSON.stringify(listAdd));
        }
    }
    const deleteCart = async () => {
        await AsyncStorage.removeItem('listCart');

        Alert.alert(
            'Thông báo',
            'Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Đồng ý', onPress: () => { setListData([]); setTotal(0) } }
            ],
            { cancelable: false }
        );
    }
    const goToAcceptOrder = () => {
        navigation.navigate('AcceptOrder', { dataCart: listData }); setOpenModal(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.propFood}>
                <View>
                    <Image source={{ uri: 'https://th.bing.com/th/id/Re3eea138f835647bbc15767ecac57326?rik=6oZsHLOB89RoZA&pid=ImgRaw' }} style={{ width: '100%', height: 300, borderRadius: 30 }} resizeMode={'stretch'} />
                </View>
                <Text style={styles.foodName}>
                    {tensp}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 15 }}>
                    <Text style={styles.foodPrice}>
                        Giá: {currencyFormat(dongia)}
                    </Text>
                    <Text style={{ fontSize: 10, alignSelf: 'flex-start' }}>đ</Text>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon type='ionicon' name='time-outline' color='#000' size={15} />
                        <Text style={{ fontSize: 15 }}>
                            {thoigian} phút
                    </Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, marginRight: 3 }}>{danhgia}</Text>
                        <Image source={require('../../assets/imagesApp/icon/icon_star.png')} style={{ width: 15, height: 15 }} resizeMode={'stretch'} />
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                    <Text style={{}}>Số lượng</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonUpDown} onPress={() => handleChangeAmount(2)}>
                            <Text style={styles.textButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ paddingHorizontal: 20 }}>
                            {amount}
                        </Text>
                        <TouchableOpacity style={styles.buttonUpDown} onPress={() => handleChangeAmount(1)}>
                            <Text style={styles.textButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View >
                <TouchableOpacity style={{ width: '100%', backgroundColor: mainColor.mainColor, alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 10 }} onPress={() => addCart()}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={openModal} animationType={'slide'} onRequestClose={() => setOpenModal(false)} transparent={true}>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', alignContent: 'flex-end' }} onPress={() => setOpenModal(false)}>
                    <TouchableOpacity style={styles.areaModal} activeOpacity={1}>
                        <View style={styles.headerModal} >
                            <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                                <TouchableOpacity onPress={() => setOpenModal(false)}>
                                    <Icon type='Ionicons' name='close' />
                                </TouchableOpacity>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Giỏ hàng</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                                {listData.length > 0 ? <TouchableOpacity onPress={() => { deleteCart() }}>
                                    <Text>Xóa hết</Text>
                                </TouchableOpacity> : null}

                            </View>
                        </View>
                        <View style={styles.bodyModal}>
                            {listData.length > 0 ? <FlatList
                                style={{ flex: 1 }}
                                data={listData}
                                extraData={listData}
                                renderItem={({ item, index }) => <ListCartItem tensp={item.TENSP} sl={item.AMOUNT} dongia={item.DONGIA} id={item.ID} id_dm={item.ID_DM} index={index} />}
                                keyExtractor={(item, index) => `${index}`}
                            /> :
                                <ImageBackground source={require('../../assets/imagesApp/empty-cart.png')} resizeMode={'contain'} style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }} >
                                    <Text style={{ alignSelf: 'center', marginBottom: 100, fontWeight: 'bold', fontSize: 25, color: 'red' }}>Giỏ hàng rỗng ☹️ </Text>
                                </ImageBackground>}
                        </View>
                        {listData.length > 0 ? <View style={styles.footerModal}>

                            <View style={{
                                flexDirection: 'row', width: '100%',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Tổng tiền : </Text>
                                    <Text>{currencyFormat(total)}đ</Text>
                                </View>
                                <TouchableOpacity style={styles.buttonFooterRight}
                                    onPress={() => { goToAcceptOrder() }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đặt hàng</Text>
                                </TouchableOpacity>
                            </View>

                        </View> : null}

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    foodName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10
    },
    foodPrice: {
        alignSelf: 'flex-end',
        fontSize: 18
    },
    buttonUpDown: {
        width: 30,
        height: 30,
        borderWidth: 0.1,
        borderColor: '#000',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor.mainColor

    },
    textButton: {
        fontWeight: 'bold',
        color: '#000'
    },
    areaModal: {
        flex: 0.85,
        backgroundColor: '#fff',
        zIndex: 1000
    },
    headerModal: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: '#cacaca',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
        justifyContent: 'space-between',
    },
    bodyModal: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    footerModal: {
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 10,

    },
    buttonFooterLeft: {
        width: '47%',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: mainColor.mainColor,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonFooterRight: {
        // width: '47%',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#eb8b7e',

        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
});
export default FoodDetail;