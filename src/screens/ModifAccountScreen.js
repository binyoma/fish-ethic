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
    useToast,
} from 'native-base';
//import du theme
import { useTheme } from 'native-base';

// import {auth, db} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

// formik
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
        .string(),
    firstname: yup
        .string(),
    pseudo: yup
        .string(),
    email: yup
        .string()
        .email('Merci une adresse mail valide')
        .required("L'email est requis"),
});

///////////////////////////////////////
const ModifAccountScreen = () => {
    ////////////////////////////////////////
    //toast
    const toast = useToast();
    //piker
    const [level, setLevel] = React.useState();
    const [fishing_techniques, setFishing_techniques] = React.useState();

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
            // level: '',
            // fishing_techniques: '',
        },
        onSubmit: values => modif(values),
        validationSchema,
    });
    const modif = values => {
        values.level = level;
        values.fishing_techniques = fishing_techniques;
        //ici envoi de données
        toast.show({
            title: 'Modification(s) effectuée(s)',
            placement: 'bottom',
        });
        console.log(values);
        //////////////////////
    };
    return (
        <Center flex="1" bgColor="warmGray.5">
            <ScrollView w="full">
                <Box w="95%" mx="auto" px="1">
                    <Heading size="lg" mt="5"> Modifiez votre profil</Heading>
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
                        <Select
                            mt="2"
                            placeholder="Niveau"
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                        >
                            <Select.Item label="DÉBUTANT/NOVICE" value="DÉBUTANT/NOVICE" />
                            <Select.Item label="AMATEUR" value="AMATEUR" />
                            <Select.Item label="INTERMÉDIAIRE" value="INTERMÉDIAIRE" />
                            <Select.Item label="CONFIRMÉ" value="CONFIRMÉ" />
                            <Select.Item label="EXPERT" value="EXPERT" />
                        </Select>
                        <Select
                            mt="2"
                            mb="5"
                            placeholder="Techniques de péche"
                            selectedValue={fishing_techniques}
                            onValueChange={(itemValue) => setFishing_techniques(itemValue)}
                        >
                            <Select.Item label="LA PÊCHE AU TOC" value="LA PÊCHE AU TOC" />
                            <Select.Item label="LA PÊCHE AUX LEURRES" value="LA PÊCHE AUX LEURRES" />
                            <Select.Item label="LA PÊCHE À LA MOUCHE" value="LA PÊCHE À LA MOUCHE" />
                        </Select>
                        <Button colorScheme='green' onPress={handleSubmit}>
                            ENREGISTRER
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Center>
    );
}

export default ModifAccountScreen