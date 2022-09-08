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
    .oneOf([yup.ref('password'), null], 'Les mots de passe sont différents'),
  firstname: yup.string().required('Le prénom est requis'),
  lastname: yup.string().required('Le nom est requis'),
});

export default function RegistrationScreen() {
  // Récupération du props navigation de react navigation
  const navigation = useNavigation();
  // Toast de notification
  const toast = useToast();
  // Récupération des props useFormik
  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      role: '',
    },
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
    <Center flex="1">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <Heading size="lg">Bienvenue !</Heading>
          <Text my={'1.5'} color="muted.500">
            Pour commencer, créer un votre compte
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
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              <FormControl.ErrorMessage>
                {errors?.confirmPassword}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={touched.firstname && errors?.firstname}>
              <FormControl.Label>Prénom</FormControl.Label>
              <Input
                value={values.firstname}
                onChangeText={handleChange('firstname')}
              />
              <FormControl.ErrorMessage>
                {errors?.firstname}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={touched.lastname && errors?.lastname}>
              <FormControl.Label>Nom</FormControl.Label>
              <Input
                value={values.lastname}
                onChangeText={handleChange('lastname')}
              />
              <FormControl.ErrorMessage>
                {errors?.lastname}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={touched.role && errors?.role}>
              <FormControl.Label>Rôle</FormControl.Label>
              <Select onValueChange={handleChange('role')}>
                <Select.Item label="Je suis un donateur" value="donor" />
                <Select.Item label="Je suis un collecteur" value="collector" />
              </Select>
              <FormControl.ErrorMessage>
                {errors?.role}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button colorScheme="amber" onPress={handleSubmit}>
              S'inscrire
            </Button>
          </VStack>
          <HStack mt="2" space="1.5">
            <Text>Déjà inscrit ? </Text>
            <Link
              onPress={() => navigation.goBack()}
              _text={{
                color: 'amber.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
            >
              Se connecter
            </Link>
          </HStack>
          <Box mt="2" mb="5" flexDirection="row">
            <TouchableOpacity>
              <Text pl={'1.5'} color="primary.500"></Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Center>
  );
}
