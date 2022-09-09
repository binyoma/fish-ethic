import React, { useContext, useEffect, useState, TouchableOpacity } from 'react';
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
    Select,
} from 'native-base';
//import du theme
import { useTheme } from 'native-base';

// import {auth, db} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

// formik
import { useFormik } from 'formik';
import * as yup from 'yup';
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
    // pseudo: yup.string().required('Le pseudo est requis'),
});

///////////////////////////////////////
const ModifAccountScreen = () => {
    ////////////////////////////////////////
    //theme 
    const theme = useTheme();
    // Récupération du props navigation de react navigation
    const navigation = useNavigation();
    // Récupération des props useFormik
    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            name: '',
            firstname: '',
            pseudo: '',
            email: '',
            level: '',
            fishing_techniques: '',
        },
        onSubmit: values => signIn(values),
        validationSchema,
    });
    return (
        <Center flex="1" bgColor="warmGray.5">
            <ScrollView w="full">
                <Box w="95%" mx="auto" px="1">
                    <Heading size="lg"> Modifiez votre profil</Heading>
                    {/* nom */}
                    <VStack space={2}>
                        <FormControl isInvalid={touched.name && errors?.name}>
                            <FormControl.Label>Nom</FormControl.Label>
                            <Input
                                value={values.name}
                                onChangeText={handleChange('name')}
                            />
                            <FormControl.ErrorMessage>
                                {errors?.name}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        {/* prenom */}
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
                        {/* pseudo */}
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
                        {/* email */}
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


                        <Button colorScheme='green' onPress={handleSubmit}>
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
                    </Box>
                </Box>
            </ScrollView>
        </Center>
    );
}

export default ModifAccountScreen