import React from 'react';
// react-navigation stack
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// Mes écrans
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from 'native-base';

import StackNavigation from './StackNavigation';
import AddEventScreen from '../screens/AddEventScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'md-home' : 'md-home-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          }else if (route.name === 'add') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary.green,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          paddingBottom: 2,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
<<<<<<< HEAD:src/navigation/TabNavigation.js
       <Tab.Screen
        name="add"
        component={AddEventScreen}
        options={{title: 'Ajout'}}
      />
    
=======

>>>>>>> origin/DylanDev:src/navigations/TabNavigation.js
      <Tab.Screen
        name="Account"
        component={StackNavigation}
        options={{ title: 'Mon compte' }}
      />
    </Tab.Navigator>
  );
}