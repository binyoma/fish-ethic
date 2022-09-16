import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Select,
  VStack,
  Text,
  ScrollView,
  HStack,
  Link,
  useToast,
  Checkbox,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

// formik
import { useFormik } from 'formik';
import * as yup from 'yup';

// firebase imports
// import {createUserWithEmailAndPassword} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// import {auth, db} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

// schema de validation

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Merci une adresse mail valide')
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, 'mot de passe trop court')
    .required('Le mot de passe est requis'),
  confirmPassword: yup
    .string()
    .required('Le mot de passe est requis')
    .oneOf([yup.ref('password'), null], 'Les mots de passe sont différents'),
  pseudo: yup
    .string()
    .required('Le pseudo est requis'),
  Checkbox: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions générales"),
});

//import du theme
import { useTheme } from 'native-base';
import { useState } from 'react';

export default function RegistrationScreen() {
  //theme
  const theme = useTheme();
  // Récupération du props navigation de react navigation
  const navigation = useNavigation();
  // Toast de notification
  const toast = useToast();
  // Récupération des props useFormik
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    pseudo: '',
    Checkbox: false,
  })
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit: values => signIn(values),
    validationSchema,
  });
  const signIn = values => {
    /**
     * @var string email
     * @var string password
     */
    const { email, password } = values;
    // Condition de connexion ok
    auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then(userCredential => {
        const user = userCredential.user;
        const id = user.uid;
        delete values.password;
        delete values.confirmPassword;
        toast.show({
          description: 'Compte créé avec succès !',
        });
        console.log('Compte créé avec succès !');
        navigation.goBack();

        //pas de creation de profil dans l'inscription
        // delete values.password;
        // delete values.confirmPassword;

        firestore()
          .collection('users')
          .doc(id)
          .set({
            ...values,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then(userCredential => {
            toast.show({
              description: 'Compte créé avec succès !',
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      });
  };
  return (
    <Center flex="1" bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <Heading size="lg">Bienvenue !</Heading>
          <Text my={'1.5'} color="muted.500">
            Inscrivez-vous pour continuer
          </Text>
          <VStack space={2}>
            <FormControl isInvalid={touched.email && errors?.email}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <FormControl.ErrorMessage>
                {errors?.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={touched.password && errors?.password}>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                type="password"
              />
              <FormControl.ErrorMessage>
                {errors?.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label
                isInvalid={touched.confirmPassword && errors?.confirmPassword}
              >
                Confirmation du mot de passe
              </FormControl.Label>
              <Input
                type="password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              <FormControl.ErrorMessage>
                {errors?.confirmPassword}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.pseudo && errors?.pseudo}>
              <FormControl.Label>Pseudo</FormControl.Label>
              <Input
                value={values.pseudo}
                onChangeText={handleChange('pseudo')}
              />
              <FormControl.ErrorMessage>
                {errors?.pseudo}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mt="5" isInvalid={touched.Checkbox && errors?.Checkbox}>

              {console.log("log1", values.Checkbox)}

              <Checkbox colorScheme="green" value={true} onChange={value => {
                values.Checkbox = value;

                //setInitialValues({ Checkbox: value });

                console.log("log2", initialValues.Checkbox);
              }}>

                <Link
                  onPress={() => navigation.navigate('TermsOfUseScreen')}
                  _text={{
                    color: theme.colors.primary.green,
                    fontWeight: 'medium',
                    fontSize: 'sm',
                  }}
                >
                  J'accèpte les conditions générales
                </Link>
              </Checkbox>
              <FormControl.ErrorMessage>
                {errors?.Checkbox}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button mt="5" bg={theme.colors.primary.green} onPress={handleSubmit}>
              S'inscrire
            </Button>
          </VStack>
          <HStack mt="2" space="1.5">
            <Text>Déjà inscrit ? </Text>
            <Link
              onPress={() => navigation.goBack()}
              _text={{
                color: theme.colors.primary.green,
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
            >
              Se connecter
            </Link>
          </HStack>
          <Box mt="2" mb="5" flexDirection="row">
            <TouchableOpacity>
              <Text pl={'1.5'} color="${theme.colors.primary.green}"></Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Center >
  );
}
