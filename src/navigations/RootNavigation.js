import React, { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import TabNavigation from './TabNavigation';
// context - gestion d'un state partagé
import { AuthContext } from '../contexts/AuthContext';

// header personnalisé
import CustomHeader from '../components/CustomHeader';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import ModifEventScreen from '../screens/ModifEventScreen';
import ProfilScreen from '../screens/profilUsersScreen';
import ProfilUsersScreen from '../screens/profilUsersScreen';
// react-navigation
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const authContext = useContext(AuthContext);
  const { authenticated } = authContext;
  return !authenticated ? (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="TermsOfUseScreen"
          component={TermsOfUseScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Welcome"
          options={{
            headerShown: false,
          }}
          component={TabNavigation}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfoScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="Modification évenement"
          component={ModifEventScreen}
          options={{
            headerTitle: props => <CustomHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="profilUsers"
          component={ProfilUsersScreen}
          options={{
            header: () => <CustomHeader />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
