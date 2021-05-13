import React, { useState } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Image,Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Loading = props => {
    const [isLoading, setIsLoading] = useState(props);
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={true}
            style={{ zIndex: 1100 }}
            onRequestClose={() => { }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={true} size='large' color="#fff"/>
                    <Text style={{color:'#fff',marginTop:10 }}>Vui lòng đợi giây lát ...</Text>
                   
                    {/* <Image source={require('../../assets/imagesApp/shiper_load.gif')} style={styles.images} resizeMode='contain' /> */}
                </View>
            </View>
        </Modal>

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
        backgroundColor: 'transparent',
       
        
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    images: {

        width: 100,
        height:100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        
    }
});
export default Loading;