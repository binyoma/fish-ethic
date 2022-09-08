import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/AccountScreen'
// import LoginScreens from '../screens/LoginScreens'
// import SignUpScreens from '../screens/SignUpScreens'

const Stack = createNativeStackNavigator()
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='account'
        component={AccountScreen}
      />
      {/* <Stack.Screen
        name='login'
        component={LoginScreens}
      />
      <Stack.Screen
        name='signUp'
        component={SignUpScreens}
      /> */}
    </Stack.Navigator>
  )
}

export default StackNavigation