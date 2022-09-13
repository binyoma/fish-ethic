import { StyleSheet, useColorScheme, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import RootNavigation from './navigations/RootNavigation';
import { AuthContext } from './contexts/AuthContext';
// import messaging from '@react-native-firebase/messaging';

// config du thème
const config = {
  useSystemColorMode: true,
};

const customTheme = extendTheme({
  colors: {
    primary: {
      titreDarkmode: 'FFFFFF',
      green: '#5bba6f',
      darkGrey: '#1F2937',
      yellow: '#ffca3a',
    },
  },
  config,
  components: {
    Input: {
      defaultProps: {
        _focus: {
          borderColor: '#5bba6f',
        },
      },
    },
  },
});

export default function App() {
  // on définit le state qui sera stocker dans le provider du context avec son setter
  const [authenticated, setAuthenticated] = useState(false);
  const schema = useColorScheme();

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <NavigationContainer
          theme={schema === 'dark' ? DarkTheme : DefaultTheme}
        >
          <RootNavigation />
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
