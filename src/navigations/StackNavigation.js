import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="MoreInfo" component={MoreInfoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
