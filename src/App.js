import {StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import TabNavigation from './navigation/TabNavigation';

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

  const schema = useColorScheme();

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
        <TabNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
