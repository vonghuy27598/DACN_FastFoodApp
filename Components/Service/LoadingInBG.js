import React, { useState } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LoadingInBG = (props) => {
    
    return (
        props.loading ? <Modal
            transparent={true}
            animationType={'none'}
            visible={true}
            style={{ zIndex: 1100 }}
            onRequestClose={() => { }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={true} size={13} color="#000" />
                    <Text style={{ color: '#000',fontSize:13,marginTop:5 }}>Đang cập nhật ...</Text>

                    {/* <Image source={require('../../assets/imagesApp/shiper_load.gif')} style={styles.images} resizeMode='contain' /> */}
                </View>
            </View>
        </Modal> : null


    );
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
    activityIndicatorWrapper: {
        borderRadius:5,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'space-between',
        padding:10,
       
       
    },
    
});
export default LoadingInBG;