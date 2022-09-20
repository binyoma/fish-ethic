import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import ModifAccountScreen from '../screens/ModifAccountScreen';
import CustomHeader from '../components/CustomHeader';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profil"
        options={{headerShown: false}}
        component={AccountScreen}
      />
      <Stack.Screen
        name="Modification"
        options={{header: () => <CustomHeader />}}
        component={ModifAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
