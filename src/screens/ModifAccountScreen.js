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
    Actionsheet,
    useDisclose,
    Pressable,
    useColorModeValue,
} from 'native-base';
//import du theme
import { useTheme } from 'native-base';

// import {auth, db} from '../firebase/config';
import { useNavigation } from '@react-navigation/native';

// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// formik
import { useFormik } from 'formik';
import * as yup from 'yup';

// camera
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
/******************************************************************
 * FIREBASE
 *****************************************************************/
// firebase firestore
import firestore from '@react-native-firebase/firestore';
// firebase auth
import auth from '@react-native-firebase/auth';
// firebase storage
import storage from '@react-native-firebase/storage';

/******************************************************************
 * FIREBASE
 *****************************************************************/

const validationSchema = yup.object({
    name: yup
        .string()
        .required("Le nom est requis"),
    firstname: yup
        .string()
        .required("Le prénom est requis"),
    pseudo: yup
        .string()
        .required("Le pseudo est requis"),
    email: yup
        .string()
        .email('Merci une adresse mail valide')
        .required("L'email est requis"),
});

const ModifAccountScreen = () => {
    //camera
    const { isOpen, onOpen, onClose } = useDisclose();
    const takePhoto = async () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            includeBase64: true,
            saveToPhotos: true,
        };
        const response = await launchCamera(options);

        const { didCancel, errorCode, errorMessage, assets } = response;

        if (didCancel) {
            console.log('====================================');
            console.log("prise de photo annulé par l'utilisateur");
            toast.show({
                title: "Prise de photo annulé par l'utilisateur",
                placement: 'bottom',
            });
            console.log('====================================');
        } else if (errorCode) {
            console.log('====================================');
            console.log(errorMessage);
            console.log('====================================');
        } else {
            const img = assets[0];
            console.log('photo ok');
            uploadAvatar(img);
        }
    };

    const getPhotoFromStorage = async () => {
        const response = await launchImageLibrary(options);
        let options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            includeBase64: true,
            saveToPhotos: true,
        };

        const { didCancel, errorCode, errorMessage, assets } = response;

        if (didCancel) {
            console.log('====================================');
            console.log("prise de photo annulé par l'utilisateur");
            toast.show({
                title: "Prise de photo annulé par l'utilisateur",
                placement: 'bottom',
            });
            console.log('====================================');
        } else if (errorCode) {
            console.log('====================================');
            console.log(errorMessage);
            console.log('====================================');
        } else {
            const img = assets[0];
            console.log('photo ok');
            uploadAvatar(img);
        }
    };

    //toast
    const toast = useToast();

    //piker
    const [level, setLevel] = React.useState();
    const [fishing_techniques, setFishing_techniques] = React.useState();

    //theme
    const theme = useTheme();
    // Récupération du props navigation de react navigation
    const navigation = useNavigation();

    // Update user
    const [initialValues, setInitialValues] = useState({
        name: '',
        firstname: '',
        pseudo: '',
        email: '',
        level: '',
        fishing_techniques: '',
    });

    const { values, handleChange, handleSubmit, touched, errors } = useFormik({
        initialValues,
        onSubmit: values => {
            //on ajoute les valeurs des picker dans values de formique avant l'envoie en base de donnée
            values.level = level;
            values.fishing_techniques = fishing_techniques;
            handleUpdate(values);
        },
        validationSchema,

        enableReinitialize: true,
    });
    //recup data base de donnée au chargement de la page
    useEffect(() => {
        const id = auth().currentUser.uid;
        firestore()
            .collection('users')
            .doc(id)
            .get()
            .then(docSnap => {
                const data = docSnap.data();
                setLevel(data['level']);
                setFishing_techniques(data['fishing_techniques']);
                setInitialValues({
                    name: data['name'],
                    firstname: data['firstname'],
                    pseudo: data['pseudo'],
                    email: data['email'],
                    level: data['level'],
                    fishing_techniques: data['fishing_techniques'],
                });

                const user = auth().currentUser;
                user
                    .updateEmail(data['email'])
                    .then(() => {
                        // ...
                    })
                    .catch(error => {
                        // An error occurred
                        // ...
                    });
            });
    }, []);

    const handleUpdate = values => {
        const id = auth().currentUser.uid;
        firestore()
            .collection('users')
            .doc(id)
            .update({
                ...values,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(updatedUser => {
                console.log('====================================');
                console.log('user updated !');
                console.log('====================================');
                toast.show({
                    title: 'Utilisateur modifié',
                    placement: 'bottom',
                });
            })
            .catch(e => {
                console.log('====================================');
                console.log(e.massage);
                console.log('====================================');
            });
    };

    //upload avatar
    const uploadAvatar = async img => {
        // on crée une référence pour l'image que le souhaite update avec son nom de stockage
        const avatarRef = storage().ref(`avatar-${auth().currentUser.uid}.jpg`);
        avatarRef.putFile(img.uri).then(() => {
            console.log('====================================');
            console.log('image uploaded to the bucket');
            console.log('====================================');
            toast.show({
                title: 'Photo modifiée',
                placement: 'bottom',
            });

            avatarRef.getDownloadURL().then(url => {
                handleUpdate({ image: url });
                auth().currentUser.updateProfile({
                    photoURL: url,
                });
            });
        });
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
                        <Pressable onPress={onOpen}>
                            <Center>
                                <Ionicons name="camera-sharp" size={40} color={useColorModeValue("#000", "#FFF")} />
                            </Center>
                        </Pressable>

                        <Button colorScheme='green' onPress={handleSubmit}>
                            ENREGISTRER
                        </Button>

                        <Button colorScheme='red' onPress={() => {
                            //    const handleUpdate = values => {
                            //     console.log(item);
                            //     firestore()
                            //       .collection('events')
                            //       .doc(item.props.id)
                            //       .update({
                            //         ...values,
                            //         updatedAt: firestore.FieldValue.serverTimestamp(),
                            //       })
                            //       .then(updatedUser => {
                            //         console.log('====================================');
                            //         console.log('events updated !');
                            //         console.log('====================================');
                            //         toast.show({
                            //           duration: 3000,
                            //           title: 'sortie modifiée',
                            //           placement: 'bottom',
                            //         });
                            //         setTimeout(() => {
                            //           navigation.navigate('Home');
                            //         }, 3500);
                            //       })
                            //       .catch(e => {
                            //         console.log('====================================');
                            //         console.log(e.message);
                            //         console.log('====================================');
                            //       });
                            //   };
                            const handleUpdate = values => {
                                const id = auth().currentUser.uid;
                                firestore()
                                    .collection('users')
                                    .doc(id)
                                    .update({
                                        ...values,
                                        deleteAt: firestore.FieldValue.serverTimestamp(),
                                    })
                                    .then(updatedUser => {
                                        console.log('====================================');
                                        console.log('user updated !');
                                        console.log('====================================');
                                        toast.show({
                                            title: 'Utilisateur modifié',
                                            placement: 'bottom',
                                        });
                                    })
                                    .catch(e => {
                                        console.log('====================================');
                                        console.log(e.massage);
                                        console.log('====================================');
                                    });
                            };
                        }}>
                            SUPPRIMER MON COMPTE FISHE ETIC
                        </Button>


                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                <Actionsheet.Item onPress={takePhoto} >Camera</Actionsheet.Item>
                                <Actionsheet.Item onPress={getPhotoFromStorage}>
                                    Galerie photo
                                </Actionsheet.Item>
                            </Actionsheet.Content>
                        </Actionsheet>
                    </VStack>
                </Box>
            </ScrollView>
        </Center >
    );
}
export default ModifAccountScreen