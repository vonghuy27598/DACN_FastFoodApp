import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import { Icon } from 'react-native-elements';
import mainColor from '../Service/Color.js';
import { BottomSheet } from 'react-native-btr';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Modal } from 'react-native';

const Order = ({ route, navigation }) => {
    const [dataList, setDataList] = useState([]);
    const { dataCart } = route.params;
    const [shipToDoor, setShipToDoor] = useState(false);
    const toggleSwitchShipToDoor = () => { setShipToDoor(previousState => !previousState); !shipToDoor ? setTotal(total + 5000) : setTotal(total - 5000) };
    const [getTools, setGetTools] = useState(true);
    const toggleSwitchGetTools = () => setGetTools(previousState => !previousState);
    const [noteText, setNoteText] = useState('');
    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState();
    const [userAddress, setUserAddress] = useState();
    const [userPhone, setUserPhone] = useState();
    const [total, setTotal] = useState(0);
    const [totalFood, setTotalFood] = useState(0);
    const [listCart, setListCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingSubmitCart, setLoadingSubmitCart] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);

    };

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    useEffect(() => {
        getInforUser();
        getCart();
    }, [loadingSubmitCart]);
    const getInforUser = async () => {

        let userID = await AsyncStorage.getItem("userID");
        await firebaseApp.database().ref().child("Users").on('value', (data) => {
            var listData = [];
            listData.push(data.child(`${userID}`).val());

            listData.map((item) => {
                setUserAddress(item.Address);
                setUserPhone(item.Phone);
                setUserName(item.Name);
            });
            setDataList(listData);
        });

        setIsLoading(false);
    }
    const getCart = () => {

        if (total === 0) {
            let tongTien = 0;
            let tongFood = 0;
            dataCart.map((item) => {
                tongTien += (item.DONGIA * item.AMOUNT);
                tongFood += (item.AMOUNT);
            });
            setTotalFood(tongFood);
            setTotal(tongTien);
        }
    }
    const submitOrder = async () => {
        setLoadingSubmitCart(true);
        if (userName.length > 0 && userAddress.length > 0 && userPhone.length > 0) {
            let userID = await AsyncStorage.getItem("userID");
            const nowDate = new Date().toISOString();
            const ref_IdOrder = firebaseApp.database().ref('/Order/').child(`${userID}`).push();
            console.log("idOder", ref_IdOrder.key);
            ref_IdOrder.set({
                ADDRESS: `${userAddress}`,
                PHONE: `${userPhone}`,
                ORDERDATE: `${nowDate}`,
                SHIPTODOOR: `${shipToDoor}`,
                GETTOOLS: `${getTools}`,
                NOTE: `${noteText}`,
                TOTALMONEY: `${total + 3000}`
            }).then(() => {
                dataCart.map((item) => {
                    firebaseApp.database().ref('/OrderDetail').child(`${ref_IdOrder.key}`).push().set({
                        ID_DM: `${item.ID_DM}`,
                        ID_SP: `${item.ID}`,
                        TENSP: `${item.TENSP}`,
                        DONGIA: `${item.DONGIA}`,
                        SOLUONG: `${item.AMOUNT}`
                    });
                });
                setLoadingSubmitCart(false);
                ToastAndroid.show('?????t h??ng th??nh c??ng', ToastAndroid.LONG);
            });
        } else {
            setLoadingSubmitCart(false);
            ToastAndroid.show('Vui l??ng c???p nh???t ?????y ????? th??ng tin', ToastAndroid.LONG);
        }


    }
    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', height: '80%' }} removeClippedSubviews={true}>
                {isLoading ? <ActivityIndicator color="#000" /> : dataList.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.group} key={`${index}`} onPress={() => { navigation.navigate('User') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.title}>Th??ng tin c?? nh??n</Text>
                                <Icon type='MaterialIcons' name='drive-file-rename-outline' />
                            </View>
                            <View style={styles.groupTextInfor}>
                                <Icon type='MaterialIcons' name='account-circle' />
                                <Text style={styles.textInfor}>
                                    {item.Name ? item.Name : "Ch??a c???p nh???t"}
                                </Text>
                            </View>
                            <View style={styles.groupTextInfor}>
                                <Icon type='MaterialIcons' name='phone-android' />
                                <Text style={styles.textInfor}>
                                    {item.Phone ? item.Phone : "Ch??a c???p nh???t"}
                                </Text>
                            </View>
                            <View style={styles.groupTextInfor}>
                                <Icon type='MaterialIcons' name='location-on' />
                                <Text style={styles.textInfor}>
                                    {item.Address ? item.Address : "Ch??a c???p nh???t"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View style={styles.group}>
                    <View style={{ borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#c5c5c5' }}>
                        {dataCart.map((item, index) => {
                            return (
                                <View style={{ flexDirection: 'row', flex: 1, paddingVertical: 5, justifyContent: 'space-between' }} key={index}>
                                    <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                                        <Image source={{ uri: 'https://th.bing.com/th/id/Re3eea138f835647bbc15767ecac57326?rik=6oZsHLOB89RoZA&pid=ImgRaw' }} style={{ width: 50, height: 40, borderRadius: 30 }} resizeMode={'stretch'} />
                                        <Text style={{ paddingLeft: 10, flex: 1, flexWrap: 'wrap', fontWeight: 'bold', fontSize: 13 }}>
                                            {item.AMOUNT}  x  {item.TENSP}
                                        </Text>
                                    </View>
                                    <View style={{ width: '20%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 13 }}> {currencyFormat(item.AMOUNT * item.DONGIA)}??</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>
                            <Text>T???ng ({totalFood} ph???n)</Text>
                            <Text>{currencyFormat(total - (shipToDoor ? 5000 : 0))}??</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
                            <View style={{ flex: 1 }}>
                                <Text>Ph?? d???ch v??? </Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, paddingLeft: 15, justifyContent: 'space-between' }}>
                                    <Text>- D???ch v??? c???a H-Food </Text>
                                    <Text>3,000??</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, paddingLeft: 15, justifyContent: 'space-between' }}>
                                    <Text>- Giao t???n c???a </Text>
                                    <Text>{shipToDoor ? "5,000??" : "0??"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>T???ng c???ng </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{currencyFormat(total + 3000)}??</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.group}>
                    <TouchableOpacity style={styles.groupService} onPress={() => { ToastAndroid.show('Xin l???i! Hi???n t???i ch??a c?? m?? gi???m gi?? n??o', ToastAndroid.LONG) }}>
                        <View style={styles.groupService_Left}>
                            <Icon type="MaterialIcons" name="local-offer" color={"#000"} size={15} />
                            <Text style={styles.textInfor}>Khuy???n m??i</Text>
                        </View>
                        <View style={styles.groupService_Right}>
                            <Text style={{ color: '#C8C8C8' }}>??ang c???p nh???t </Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.groupService}>
                        <View style={styles.groupService_Left}>
                            <Icon type="MaterialIcons" name="sensor-door" color={"#000"} size={15} />
                            <Text style={styles.textInfor}>Giao t???n c???a</Text>
                        </View>
                        <View style={styles.groupService_Right}>
                            <Text style={shipToDoor ? { color: 'red' } : { color: '#c8c8c8' }}>[5,000??] </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#f5dd4b" }}
                                thumbColor={shipToDoor ? `${mainColor.mainColor}` : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchShipToDoor}
                                value={shipToDoor}
                            />

                        </View>
                    </View>
                    <View style={styles.groupService}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start'
                        }}>
                            <Icon type="MaterialIcons" name="local-restaurant" color={"#000"} size={15} style={{ justifyContent: 'center' }} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textInfor}>{getTools ? "L???y d???ng c??? ??n u???ng" : "Kh??ng l???y d???ng c??? ??n u???ng"}</Text>
                                <Text style={styles.textSubInfor}>{getTools ? "D???ng c??? ??n u???ng s??? ???????c cung c???p. H??y chung tay b???o v??? m??i tr?????ng v??o l???n sau nh??" : "Mu???ng, ????a, n??a, ???ng h??t KH??NG ???????c cung c???p. C???m ??n b???n ???? chung tay gi???m thi???u r??c th???i c??ng H-Food"}</Text>
                            </View>
                        </View>
                        <View style={{}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#f5dd4b" }}
                                thumbColor={getTools ? `${mainColor.mainColor}` : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchGetTools}
                                value={getTools}
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={toggleBottomNavigationView} style={styles.groupService}>
                        <View style={styles.groupService_Left}>
                            <Icon type="MaterialIcons" name="event-note" color={"#000"} size={15} />
                            <Text style={styles.textInfor}>Ghi ch??</Text>
                        </View>
                        <View style={styles.groupService_Right}>
                            <Text style={{ color: '#C8C8C8' }}>Th??m ghi ch?? </Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ width: '100%', height: '10%', backgroundColor: '#fff', elevation: 2, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: mainColor.mainColor, width: '80%', alignSelf: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 10 }} onPress={() => { submitOrder() }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>?????t h??ng - {currencyFormat(total + 3000)}??</Text>
                </TouchableOpacity>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
                    <BottomSheet
                        visible={visible}
                        //setting the visibility state of the bottom shee
                        onBackButtonPress={toggleBottomNavigationView}
                        //Toggling the visibility state on the click of the back botton
                        onBackdropPress={toggleBottomNavigationView}

                    //Toggling the visibility state on the clicking out side of the sheet
                    >
                        {/*Bottom Sheet inner View*/}

                        <View style={{ backgroundColor: '#fff', flex: 0.6, paddingHorizontal: 10 }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',

                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { toggleBottomNavigationView() }}>
                                        <Text >
                                            H???y
                                     </Text>
                                    </TouchableOpacity>

                                    <Text >
                                        Th??m ghi ch??
                                     </Text>
                                    <TouchableOpacity onPress={() => { toggleBottomNavigationView() }}>
                                        <Text >
                                            Xong
                                     </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
                                    <TextInput autoFocus={true} placeholder="Nh???p ghi ch??" maxLength={200} multiline={true} onChangeText={(value) => setNoteText(value)} value={noteText} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5 }}>
                                    <Text>{noteText.length}/200</Text>
                                </View>
                            </View>
                        </View>
                    </BottomSheet>
                </KeyboardAvoidingView>
            </View>
            <Modal visible={loadingSubmitCart} transparent={true} >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <ActivityIndicator size={"large"} color={"#fff"} />
                        <Text style={{ color: '#fff', marginTop: 10 }}>????n h??ng ??ang ???????c x??? l??...</Text>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        flexDirection: 'column'
    },
    group: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20,
        elevation: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17
    },
    groupTextInfor: {
        flexDirection: 'row',
        marginVertical: 3,
        alignItems: 'center'
    },
    textInfor: {
        marginLeft: 5,
    },
    textSubInfor: {
        marginLeft: 5,
        fontSize: 13,
        color: '#c8c8c8'
    },
    groupService: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 0.6,
        borderBottomColor: '#c8c8c8'
    },
    groupService_Left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupService_Right: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default Order;