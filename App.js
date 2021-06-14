import React, { useState, useEffect } from 'react';
import { LogBox, Image, TouchableOpacity } from 'react-native';
import SignIn from './Components/Login/SignIn.js';
import SignUp from './Components/Login/SignUp.js';
import Main from './Components/Main/index.js';
import Search from './Components/Main/Search.js';
import CategoryDetail from './Components/Main/CategoryDetail.js';
import User from './Components/Main/User.js';
import FoodDetail from './Components/Main/FoodDetail.js';
import UpdateInfor from './Components/Main/UpdateInfor.js';
import AcceptOrder from './Components/Main/Order.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import mainFont from './Components/Service/Font.js';
import { MenuProvider } from 'react-native-popup-menu';
import Color from './Components/Service/Color.js';
import { DrawerActions } from '@react-navigation/native';
import CustomDrawer from './Components/Service/CustomDrawer.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'cornish': require('./assets/fonts/SVN-Cornish.ttf')

  });
};

LogBox.ignoreLogs(['Remote debugger']);

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);
  const font = mainFont;

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} />
    );
  }

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="main"
          component={Main}

          options={{
            headerShown: true,
            headerTitle: 'H-Food',
            headerStyle: {
              backgroundColor: Color.mainColor,

            },
            headerTitleStyle: {
              ...font,
              color: '#fff',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 10,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              fontSize: 30
            },
            headerTitleAlign: 'center',

          }}
        />
      </Drawer.Navigator>
    );
  }

  return (

    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn">
          {/* SignIn screen */}
          <Stack.Screen name="SignIn"
            component={SignIn}
            options={{
              header: () => null
              ,
            }}
          />
          <Stack.Screen name="Main"
            component={DrawerNavigator}
            options={{
              header: () => null,

            }}

          />

          {/* SignUp screen */}
          <Stack.Screen name="SignUp"
            component={SignUp}
            options={{
              headerTransparent: true,
              headerTitle: '',

            }}
          />

          <Stack.Screen name="Search"
            component={Search}
            options={{

              headerStyle: {
                backgroundColor: Color.mainColor,

              },
              headerTitleStyle: {
                ...font,
                color: '#fff',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                fontSize: 30
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen name="CategoryDetail"
            component={CategoryDetail}
            options={{
              headerTitle: '',
              headerStyle: {
                backgroundColor: Color.mainColor,

              },
              headerTitleStyle: {
                ...font,
                color: '#fff',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                fontSize: 30
              },
              headerTitleAlign: 'center',

            }}
          />

          <Stack.Screen name="User"
            component={User}
            options={{
              headerTitle: 'Tôi',

              headerTitleStyle: {

                fontSize: 20
              },
              headerShown: true,
              headerTransparent: true,
              headerTitleAlign: 'center',

            }}
          />
          <Stack.Screen name="UpdateInfor"
            component={UpdateInfor}
            options={{
              headerTitle: '',
              headerStyle: {
                // backgroundColor: Color.mainColor,

              },
              headerTitleStyle: {

                fontSize: 20
              },
              headerShown: true,

              headerTitleAlign: 'center',

            }}
          />

          <Stack.Screen name="FoodDetail"
            component={FoodDetail}
            options={{
             
              headerStyle: {
                backgroundColor: Color.mainColor,

              },
              
              headerTitleAlign: 'center',
              headerTitle: "CHI TIẾT SẢN PHẨM",
              headerTitleStyle:{
                fontSize: 20,
                color:'#fff',
                fontWeight:'bold',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
              }
            }}
          />

          <Stack.Screen name="AcceptOrder"
            component={AcceptOrder}
            options={{
              headerTitle: 'Xác nhận đơn hàng',
              headerStyle: {
                // backgroundColor: Color.mainColor,
              },
              headerTitleStyle: {
                fontSize: 20
              },
              headerShown: true,
              headerTitleAlign: 'center',
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider >
  );


}
