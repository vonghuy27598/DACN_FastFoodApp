import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, Alert, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import { Icon } from "react-native-elements";
import { FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from 'moment';
import Color from '../Service/Color.js';
import LoadingInBG from '../Service/LoadingInBG.js';
const User = ({ navigation }) => {
    const [idUser, setIdUser] = useState();
    const [showModalSex, setShowModalSex] = useState(false);
    const [valueRadio, setValueRadio] = useState(0);
    const [valueSex, setValueSex] = useState();
    const [dataList, setDataList] = useState([]);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    useEffect(() => {
        _getUserData();
    }, [date, valueSex]);

    const _getUserData = async () => {
        Moment.locale('en');
        let userID = await AsyncStorage.getItem("userID");
        setIdUser(userID);
        await firebaseApp.database().ref().child("Users").on('value', (data) => {
            var listData = [];
            listData.push(data.child(`${userID}`).val());
            listData.map((item) =>{
                setValueRadio(item.Sex);
                setDate(item.Birthday);
            })
            setDataList(listData);
            setIsLoadingUpdate(false);
        })
    }
    //Function Sex
    const openModalSex = () => {
        return (
            <Modal
                visible={showModalSex}
                animationType='fade'
                transparent={true}
            >
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'

                }} onPressIn={() => { setShowModalSex(false) }}>
                    <TouchableOpacity style={{
                        width: 300,
                        height: 230,
                        backgroundColor: '#fff',
                        zIndex: 1000
                    }} activeOpacity={1}>

                        <View style={styles.modalTitle}>
                            <Text style={{ fontSize: 17, }}>Giới tính</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <RadioButton.Group onValueChange={value => setValueRadio(value)} value={valueRadio} style={{ justifyContent: 'space-between', alignItems: 'center', fontSize: 10, }} >
                                <RadioButton.Item label="Nam" value={'Nam'} color={Color.mainColor} style={{ paddingVertical: 5 }} />
                                <RadioButton.Item label="Nữ" value={'Nữ'} color={Color.mainColor} style={{ paddingVertical: 5 }} />
                                <RadioButton.Item label="Khác" value={'Khác'} color={Color.mainColor} style={{ paddingVertical: 5 }} />
                            </RadioButton.Group>
                        </View>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity onPress={() => { setShowModalSex(false) }} style={styles.optionModal} >
                                <Text>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { updateSex() }} style={styles.optionModal}>
                                <Text>Hoàn tất</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }
    const updateSex = () => {
        setIsLoadingUpdate(true);

        switch (valueRadio) {
            case 0:
                Alert.alert("", 'Vui lòng chọn giới tính');
                break;
            default:
                firebaseApp.database().ref('/Users/' + `${idUser}`).update({
                    Sex: valueRadio
                }).then(() => {
                    setValueSex(valueRadio);
                    setIsLoadingUpdate(false);
                    Alert.alert("", 'Cập nhật giới tính thành công');
                    setShowModalSex(false);
                });
                break;
        }

    }
    //Function DatePicker
    const acceptDate = (date) => {
        setIsLoadingUpdate(true);
        setShow(false);
        // setDate(date);
        firebaseApp.database().ref('/Users/' + `${idUser}`).update({
            Birthday: date,
        }).then(() => {
            setIsLoadingUpdate(false);
            setDate(date);
            // Alert.alert("", 'Cập nhật Ngày sinh thành công');

        });



    };

    const openDatePicker = () => {

        return (
            <DateTimePickerModal
                isVisible={show}
                mode={'date'}
                onCancel={() => { setShow(false) }}
                onConfirm={(date) => { acceptDate(date) }}
                is24Hour={true}
                date={new Date(`${date}`)}

            />
        );
    }
    const changeScreen = (type, data) => {
        if (type === "Birthday") {
            setShow(true);
            // setDate(data);
        } else if (type === 'Sex') {
            setShowModalSex(true);
        } else {
            navigation.navigate("UpdateInfor", {
                type: type,
                data: data
            });
        }

    }
    const listInfor = ({ item }) => {
        return (
            <View >
                {/* Name */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Name", item.Name)}>
                    <View style={styles.row}>
                        <Text>Họ tên</Text>
                        <View style={styles.status}>
                            <Text style={styles.title}>{item.Name ? item.Name : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Email */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Email", item.Email)}>
                    <View style={styles.row}>
                        <Text>Email</Text>
                        <View style={styles.status}>
                            <Text style={styles.title}>{item.Email ? item.Email : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Phone */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Phone", item.Phone)}>
                    <View style={styles.row}>
                        <Text>Số điện thoại</Text>
                        <View style={styles.status}>
                            <Text style={styles.title}>{item.Phone ? item.Phone : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ paddingVertical: 5 }}>

                </View>
                {/* Address */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Address", item.Address)}>
                    <View style={styles.row}>
                        <Text>Địa chỉ</Text>
                        <View style={styles.status}>
                            <Text style={styles.title}>{item.Address ? item.Address : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Sex */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Sex", item.Sex)}>
                    <View style={styles.row}>
                        <Text>Giới tính</Text>
                        <View style={styles.status}>
                            <Text style={styles.title}>{item.Sex ? item.Sex : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Birthday */}
                <TouchableOpacity style={styles.itemList} onPress={() => changeScreen("Birthday", item.Birthday)}>
                    <View style={styles.row}>
                        <Text>Ngày sinh</Text>
                        <View style={styles.status}>
                            {/* Moment(item.Birthday).format('DD/MM/yyyy')  */}
                            <Text style={styles.title}>{item.Birthday ? Moment(item.Birthday).format('DD/MM/yyyy') : "Chưa cập nhật"}</Text>
                            <Icon type="MaterialIcons" name="arrow-forward-ios" color={"#C8C8C8"} size={10} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </TouchableOpacity>
                {openModalSex()}
                {openDatePicker()}
                <LoadingInBG loading={isLoadingUpdate} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.header} source={require('../../assets/imagesApp/bg_user_header.jpg')} imageStyle={{ opacity: 0.12 }} >
                <Image source={require('../../assets/imagesApp/icon/icon_user.png')} style={styles.avatarImage} />

            </ImageBackground>
            <View style={{ flex: 1, paddingVertical: 10 }}>
                <FlatList
                    data={dataList}
                    renderItem={listInfor}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    avatarImage: {
        width: 130, height: 130,

    },
    itemList: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderBottomColor: '#C8C8C8',
        borderBottomWidth: 0.5
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 13,
        color: '#b0b0b0'
    },
    modalTitle: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: '#C3C3C3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        flex: 4,
        justifyContent: 'center',

    },
    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#C3C3C3',

    },
    optionModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: '#C3C3C3',

    }
});

export default User;