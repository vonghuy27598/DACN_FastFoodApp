import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableHighlight, Alert } from 'react-native';
import mainFont from '../../Service/Font.js';
import { Icon } from "react-native-elements";
const font = mainFont;

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const FoodListItem = (props) => {
    return (

        <View>
            {props.tensp != null ?
                <TouchableHighlight
                    style={{
                        flex: 1,
                        height: 110,
                        backgroundColor: '#fff',
                        marginBottom: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#cacaca'
                    }}
                    activeOpacity={0.8}
                    underlayColor='#cacaca'
                    onPress={() => { props.navigation.navigate("FoodDetail",{ID: props.id}) }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.Images}>
                            <Image source={{ uri: 'https://th.bing.com/th/id/Re3eea138f835647bbc15767ecac57326?rik=6oZsHLOB89RoZA&pid=ImgRaw' }} style={{ width: '100%', height: '100%', borderRadius: 30 }} resizeMode={'stretch'} />
                            <View style={styles.time}>
                                <Text style={{ color: '#fff', fontSize: 10, marginRight: 3 }}>{props.thoigian}</Text>
                                <Icon type='ionicon' name='time-outline' color='#fff' size={10} />
                            </View>
                        </View>
                        <View style={styles.Content}>
                            <Text style={{ color: '#000', fontSize: 14 }}>{props.tensp}</Text>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <Text>{currencyFormat(props.dongia)}</Text>
                                    <Text style={{ fontSize: 10, alignSelf: 'flex-start' }}>đ</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 10, marginRight: 3 }}>{props.danhgia}</Text>
                                    <Image source={require('../../../assets/imagesApp/icon/icon_star.png')} style={{ width: 10, height: 10 }} resizeMode={'stretch'} />

                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableHighlight> : <ActivityIndicator size='large' color='red' />}

        </View>
    );
}

const styles = StyleSheet.create({
    Images: {
        flex: 2,
        position: 'relative'
    },
    time: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 2
    },
    Content: {
        flex: 6,
        justifyContent: 'space-between',
        paddingHorizontal: 5

    }
});

export default FoodListItem;