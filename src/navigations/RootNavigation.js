import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TabNavigation from './TabNavigation';
// context - gestion d'un state partagé
import {AuthContext} from '../contexts/AuthContext';

// header personnalisé
import CustomHeader from '../components/CustomHeader';

import MoreInfoScreen from '../screens/MoreInfoScreen';
// react-navigation
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const authContext = useContext(AuthContext);
  const {authenticated} = authContext;
  return !authenticated ? (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitle: props => <CustomHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerTitle: props => <CustomHeader {...props} />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <TabNavigation />
  );
}
