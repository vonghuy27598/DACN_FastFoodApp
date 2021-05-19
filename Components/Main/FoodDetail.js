import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const FoodDetail = ({ route, navigation }) => {
    const { ID } = route.params;
    const [listData, setListData] = useState([]);
    useEffect(() => {
        
    },[])
    return (
        <View>
            <Text>
                chi tiết
            </Text>
        </View>
    );
}

export default FoodDetail;