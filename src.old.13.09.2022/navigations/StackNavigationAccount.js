import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/AccountScreen'
import ModifAccountScreen from '../screens/ModifAccountScreen'


const Stack = createNativeStackNavigator()
const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Profil'
                component={AccountScreen}
            />
            <Stack.Screen
                name='Modification'
                component={ModifAccountScreen}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation