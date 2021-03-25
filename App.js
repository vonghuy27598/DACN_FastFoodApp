import React from 'react';
import SignIn from './Components/Login/SignIn.js';
import SignUp from './Components/Login/SignUp.js';
import Main from './Components/Main/index.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App(navigation) {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* SignIn screen */}
        <Stack.Screen name="SignIn"
          component={SignIn}
          options={{ header: () => null, }} />
        {/* SignUp screen */}
        <Stack.Screen name="SignUp"
          component={SignUp}
          options={{
            headerTransparent: true,
            headerTitle: ''
          }} />
          <Stack.Screen name="Main"
          component={Main}
          options={{ header: () => null, }} />
      </Stack.Navigator>
    </NavigationContainer>

  );


}

