import React, { useEffect, useState } from 'react';
import { ScrollView, Modal, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, View, Text, Alert, Button, SafeAreaView } from 'react-native';
import mainFont from '../Service/Font.js';
import { firebaseApp } from '../Service/FirebaseConfig.js';
import FoodListItem from './CategoryFood/FoodListItem.js';
import { Icon } from "react-native-elements";
import { RadioButton } from 'react-native-paper';
import Color from '../Service/Color.js';
const CategoryDetail = ({ route, navigation }) => {
    const { DM_ID, DM_NAME } = route.params;
    const [listData, setListData] = useState([{}]);
    const [listTypeData, setListTypeData] = useState([{}]);
    const [displayData, setDisplayData] = useState([{}]);
    const [sizeItem, setSizeItem] = useState(10);
    const [loading, setLoading] = useState(false);
    const [emptyData, setEmptyData] = useState(false);
    const [modalSort, setModalSort] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [checkSort, setCheckSort] = useState(0);
    const [tempValueSort, setTempValuesort] = useState(0);
    const [checkType, setCheckType] = useState(-1);
    const [tempValueType, setTempValueType] = useState(-1);
    const [titleSort, setTitleSort] = useState("Sắp xếp");
    const [titleType, setTitleType] = useState("Danh mục");
    //get Data on firebase

    useEffect(() => {
        getData();
        return () => {

        }
    }, [sizeItem, tempValueSort, tempValueType])
    function getData() {
        navigation.setOptions({
            headerTitle: DM_NAME,
           
        });

        allData();
        typeData();
    }
    async function allData() {
        const getListData = await firebaseApp.database().ref('/Category/' + `${DM_ID}/DM_NAME/${DM_NAME}`).once('value', (data) => {
            const listIdFood = Object.keys(data.val());
            const list = [];
            listIdFood.map((id) => {
                const propFood = data.child(`${id}`).val();
                const dataFood = { "ID": id, ...propFood };
                list.push(dataFood);
            });

            if (list.length == displayData.length)
                setEmptyData(true);
            setListData(list);
            switch (tempValueSort) {
                case 0:
                    setTitleSort("Sắp xếp");
                    setDisplayData(list.slice(0, sizeItem));
                    break;
                case 1:
                    setTitleSort("Giá giảm dần");
                    list.sort(function (obj1, obj2) {
                        return obj2.DONGIA - obj1.DONGIA;
                    });
                    setDisplayData(list.slice(0, sizeItem));
                    console.log('size', sizeItem);
                    break;
                case 2:
                    setTitleSort("Giá tăng dần");
                    list.sort(function (obj1, obj2) {
                        return obj1.DONGIA - obj2.DONGIA;
                    });
                    setDisplayData(list.slice(0, sizeItem));
                    console.log('size', sizeItem);
                    setDisplayData(list.slice(0, sizeItem));
                    break;
                case 3:
                    setTitleSort("Đánh giá");

                    list.sort(function (obj1, obj2) {
                        return obj2.DANHGIA - obj1.DANHGIA;
                    })
                    setDisplayData(list.slice(0, sizeItem));
                    console.log('size', sizeItem);
                    setDisplayData(list.slice(0, sizeItem));
                    break;
            }
        });
    }
    async function typeData() {
        const getListTypeData = await firebaseApp.database().ref('/Category/' + `${DM_ID}/DM_TYPE/`).once('value', (data) => {
            const listIdFood = Object.keys(data.val());
            const list = [];

            listIdFood.map((id) => {
                const propFood = data.child(`${id}`).val();
                const dataFood = { "ID": id, ...propFood };
                list.push(dataFood);

            });
            setListTypeData(list);
            switch (tempValueType) {
                case -1:
                    setTitleType("Danh mục");
                    break;
                default:

                    list.map((item, index) => {
                        if (index == tempValueType) {
                            setTitleType(item.Name);
                            const filterData = displayData.filter(i => i.TYPE == item.ID)
                            setDisplayData(filterData.slice(0, sizeItem));
                            return;
                        }
                    })
                    break;


            }
        });

    }


    const cusLoading = () => {
        displayData.length > 0 ? setLoading(true) : setLoading(false);
    }
    const loadMoreData = () => {
        if (!emptyData) {
            console.log('loadmore');
            setLoading(true);
            setSizeItem(sizeItem + 5);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }

    const loadingFooter = () => {
        if (!loading) {
            if (emptyData)
                return (<Text style={{ alignSelf: 'center', color: '#7b7a7a', marginBottom: 5 }}>Hết</Text>);
            return true;
        } else {
            return (
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size='large' color="#000" />
                </View>
            );
        }

    };

    const getTypeData = () => {

        return (
            <RadioButton.Group onValueChange={value => unCheckType(value)} value={checkType}>
                {listTypeData.map((item, index) => {
                    return (
                        <RadioButton.Item key={`${index}`} label={item.Name} value={index} labelStyle={styles.textCheck} color={Color.mainColor} />
                    );
                })}
            </RadioButton.Group>
        );

    }

    //Modal

    const openModalSort = () => {
        setModalSort(true);
        setCheckSort(tempValueSort);
    };
    const openModalType = () => {
        setModalType(true);
        setCheckType(tempValueType);
    };
    const unCheckSort = (value) => {
        if (value === checkSort)
            setCheckSort(0);
        else
            setCheckSort(value);

    };
    const unCheckType = (value) => {
        if (value === checkType)
            setCheckType(-1);
        else
            setCheckType(value);
    };

    const closeModalSort = () => {
        setModalSort(false);
    };
    const closeModalType = () => {
        setModalType(false);
    };
    const acceptSort = () => {
        setSizeItem(5);
        setTempValuesort(checkSort);
        setTempValueType(-1);
        setModalSort(false);

    };
    const acceptType = () => {
        setSizeItem(5);
        setTempValueType(checkType);
        setModalType(false);

    };
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 2,
                }}
                contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 10
                }}
            >
                <TouchableOpacity style={tempValueSort > 0 ? styles.buttonColor : styles.buttonWhite} onPress={() => openModalSort()}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13 }}>{titleSort}</Text>
                        <Icon type='MaterialIcons' name='keyboard-arrow-down' color='#000' size={15} style={{ paddingTop: 1 }} />
                    </View>

                </TouchableOpacity>
                <Text style={{ marginRight: 5, fontSize: 12 }}>Lọc: </Text>
                <TouchableOpacity style={styles.buttonWhite} onPress={() => openModalType()}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13 }}>{titleType}</Text>
                        <Icon type='MaterialIcons' name='keyboard-arrow-down' color='#000' size={15} style={{ paddingTop: 1 }} />
                    </View>
                </TouchableOpacity>

            </ScrollView>

            <View style={{ flex: 9 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, }}
                    data={displayData}

                    renderItem={({ item }) => <FoodListItem tensp={item.TENSP} navigation={navigation} dongia={item.DONGIA} thoigian={item.THOIGIAN} danhgia={item.DANHGIA} anh={item.IMAGES} id={item.ID} dm={DM_ID} />}
                    keyExtractor={(item, index) => `${index}`}
                    ListFooterComponent={loadingFooter}
                    onEndReached={
                        () => {
                            loadMoreData();
                        }
                    }
                    onEndReachedThreshold={0.5}
                />
            </View>
            <Modal
                visible={modalSort}
                animationType="fade"
                transparent={false}
                style={{ zIndex: 1100 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.headerModal}>

                        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                            <TouchableOpacity onPress={() => closeModalSort()}>
                                <Icon type='Ionicons' name='close' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Sắp xếp</Text>
                        </View>
                        <View style={{ paddingRight: 13 }} />
                    </View>
                    <View style={styles.bodyModal}>
                        <RadioButton.Group onValueChange={value => unCheckSort(value)} value={checkSort}>
                            <RadioButton.Item label="Giá giảm dần" value={1} labelStyle={styles.textCheck} color={Color.mainColor} />
                            <RadioButton.Item label="Giá tăng dần" value={2} labelStyle={styles.textCheck} color={Color.mainColor} />
                            <RadioButton.Item label="Đánh giá" value={3} labelStyle={styles.textCheck} color={Color.mainColor} />
                        </RadioButton.Group>

                    </View>
                    <View style={styles.footerModal}>
                        <TouchableOpacity style={{
                            width: '95%',
                            alignItems: 'center',
                            paddingVertical: 10,
                            backgroundColor: Color.mainColor,
                            borderRadius: 10,
                            marginVertical: 10,
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}
                            onPress={() => acceptSort()}>
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalType}
                animationType="fade"
                transparent={false}
                style={{ zIndex: 1100 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.headerModal}>

                        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                            <TouchableOpacity onPress={() => closeModalType()}>
                                <Icon type='Ionicons' name='close' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danh mục</Text>
                        </View>
                        <View style={{ paddingRight: 13 }} />
                    </View>
                    <View style={styles.bodyModal}>
                        {getTypeData()}

                    </View>
                    <View style={styles.footerModal}>
                        <TouchableOpacity style={{
                            width: '95%',
                            alignItems: 'center',
                            paddingVertical: 10,
                            backgroundColor: Color.mainColor,
                            borderRadius: 10,
                            marginVertical: 10,
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}
                            onPress={() => acceptType()}>
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const font = mainFont;

const styles = StyleSheet.create({
    buttonWhite: {
        marginRight: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cdd4de',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center'
    },
    buttonColor: {
        marginRight: 10,
        backgroundColor: '#cdd4de',
        borderWidth: 1,
        borderColor: '#cdd4de',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center'
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
        // borderBottomWidth: 1,
        // borderBottomColor: '#cacaca',
        justifyContent: 'space-between',


    },
    bodyModal: {
        flex: 1,

    },
    footerModal: {
        width: '100%',
        height: 80,
        alignSelf: 'center',
    },
    textCheck: {
        fontSize: 15
    }
});
export default CategoryDetail;