import React, { useContext, useEffect, useState } from 'react';
// NATIVE BASE
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  ScrollView,
} from 'native-base';
//import du theme
import { useTheme } from 'native-base';

// faire disparaitre les warnings
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

// Hook React navigation pour accéder au context de la react-navigation
import { useNavigation } from '@react-navigation/native';
// stockage
import AsyncStorage from '@react-native-async-storage/async-storage';
/*******************************************************
 * FIREBASE
 ******************************************************/
// Import de auth
import auth from '@react-native-firebase/auth';

/*******************************************************
 * FIREBASE                                            \
 ******************************************************/
// Custom context pour la gestion globale du state du status d'auth avec son setter.
import { AuthContext } from './../contexts/AuthContext';

/*******************************************************
 *  Traitement de formulaire                           \
 ******************************************************/

// Librairie de traitement de formulaire
import { useFormik } from 'formik';
// librairie de validation de données

import * as yup from 'yup';

// TouchID
import touchID from 'react-native-touch-id';

// Keychain
import * as Keychain from 'react-native-keychain';
import { LogBox } from 'react-native';

export default function LoginScreen() {
  const navigation = useNavigation();
  //theme 
  const theme = useTheme();
  console.log(navigation);


  const authenContext = useContext(AuthContext);
  const { setAuthenticated } = authenContext;

  // vérif accord pour le touch id
  const [isTouchID, setIsTouchID] = useState(false);

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: 'ddhuille@gmail.com',
      password: '123456',
    },
    onSubmit: values => login(values),
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userAuth');
      if (value !== null) {
        setIsTouchID(true);
      }
    } catch (e) {
      // error reading value
      console.log('====================================');
      console.log(e.message);
      console.log('====================================');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    AuthWithTouchId();
  }, [isTouchID]);

  const login = values => {
    const { email, password } = values;
    // Condition de connexion ok
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('vous êtes connecté !');
        // on stocke les information de l'utilisateur dans le storage
        storeUserCredential(email, password);
        setAuthenticated(true);
      })
      .catch(error => {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
      });
  };
  /**
   * Authentifcation par l'empreinte digitale
   */
  const AuthWithTouchId = () => {
    if (isTouchID) {
      const options = {
        title: 'Confirmez votre identité',
        sensorDescription:
          'Utilisez votre empreinte pour confirmer votre identité',
        sensorErrorDescription: 'empreinte non reconnue',
      };
      // On vérifie que le touch id est configurée sur l'appareil de l'utilisateur
      if (touchID.isSupported) {
        // On vérifie si l'utilsateur à déjà donnée son accord pour être authentifier par mot de passe
        touchID
          .authenticate('Authentification par empreinte digital', options)
          .then(success => {
            signInUserWithStoredData();
            console.log('Authenticated Successfully');
          })
          .catch(error => {
            console.log('Authentication Failed');
          });
      }
    }
  };

  const signInUserWithStoredData = async () => {
    try {
      console.log('toto');
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        login({ email: credentials.username, password: credentials.password });
      }
    } catch (err) {
      console.log('====================================');
      console.log(err.message);
      console.log('====================================');
    }
  };

  const storeUserCredential = async (email, password) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      console.log(credentials);
      if (!credentials) {
        console.log('add new cred');
        await Keychain.setGenericPassword(email, password);
      }
    } catch (err) {
      console.log('====================================');
      console.log(err.message);
      console.log('====================================');
    }
  };

  // Affichage du popup demande activation touch id
  return (
    <Center flex={'1'} bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <Heading size="lg">
            Content de vous revoir
          </Heading>
          <Text my={'1.5'} color="muted.500">
            Connecter-vous pour continuer
          </Text>
          <VStack space={'2'}>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={values.email} onChangeText={handleChange('email')} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                type="password"
                value={values.password}
                onChangeText={handleChange('password')}
              />

              <Link
                onPress={() => {
                  auth().sendPasswordResetEmail(values.email)
                    .then(() => {
                      console.log('Password reset email sent!');
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      console.log(errorCode);
                      console.log(errorMessage);
                    });
                }}
                _text={{
                  color: theme.colors.primary.green,
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
              >
                Mot de passe oublié?
              </Link>
            </FormControl>
            <Button onPress={handleSubmit} colorScheme="green">
              Se connecter
            </Button>
            <HStack justifyContent={'center'} mt="3">
              <Text>Pas encore membre ? </Text>
              <Link
                onPress={() => navigation.navigate('Registration')}
                _text={{
                  color: theme.colors.primary.green,
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
              >
                Créer un compte
              </Link>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </Center>
  );
}