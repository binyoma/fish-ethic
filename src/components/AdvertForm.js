// React
import React, { useState, useRef, useEffect } from 'react';
// Native base
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from 'native-base';

// DateTime picker widget
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
/**
 * Google firebase
 */

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Custom service d'appel API création de notification PUSH
import { sendPushNotification } from '../services/notificationServices';

// Traitement de formulaire
import { useFormik } from 'formik';
// Validation de formulaire
import * as yup from 'yup';
// règles de validation des champs du formulaire
const validationSchema = yup.object({
  title: yup.string().required('Le titre est requis'),
  description: yup.string(),
  available: yup
    .date()
    .typeError("La valeur renseigné n'est pas une date valide")
    .required('La date de disponibilité du don est requis'),
  expiration: yup
    .date()
    .typeError("La valeur renseigné n'est pas une date valide")
    .required("La date d'expiration est requise"),
});

export default function AdvertForm() {
  // Gestion de l'affichage des pickers de date
  const [showAvailableDatePicker, setShowAvailableDatePicker] = useState(false);
  const [showExpirationDatePicker, setShowExpirationDatePicker] = useState(
    false,
  );
  // création de ref sur les inputs des champs date afin de leur enlever le focus un fois que l'utilisateur a chosi une date
  const availableInputRef = useRef(null);
  const expirationInputRef = useRef(null);
  // toast de notification de l'utilisateur
  const toast = useToast();
  // initialisation de formik avec le hook dédié
  const {
    values,
    setFieldValue,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      available: null,
      expiration: null,
    },
    onSubmit: values => createAds(values),
    validationSchema,
  });

  const availableDateChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    console.log(nextDate);
    setShowAvailableDatePicker(false);
    setFieldValue('available', nextDate);
    availableInputRef.current.blur();
  };

  const expirationDateChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    setShowExpirationDatePicker(false);
    setFieldValue('expiration', nextDate);
    expirationInputRef.current.blur();
  };

  const getRegistrationIds = async () => {
    const collectors = [];

    const querySnap = await firestore()
      .collection('users')
      .where('role', '==', 'collector')
      .limit(500)
      .get();

    querySnap.forEach(doc => {
      collectors.push(doc.data());
    });

    const registration_ids = collectors
      .filter(collector => collector.fcmToken)
      .map(item => item.fcmToken);
    console.log(registration_ids, 'ids');
    return registration_ids;
  };

  const createAds = values => {
    firestore()
      .collection('adverts')
      .add({
        ...values,
        available: firestore.Timestamp.fromDate(values.available),
        expiration: firestore.Timestamp.fromDate(values.expiration),
        createdAt: firestore.FieldValue.serverTimestamp(),
        user_id: auth().currentUser.uid,
      })
      .then(async newAdvert => {
        toast.show({
          description: 'Annonce ajoutée avec succès !',
        });
        resetForm();

        const registration_ids = await getRegistrationIds();

        sendPushNotification(registration_ids, values.title)
          .then(() => {
            console.log('Notification créée !');
          })
          .catch(error => {
            console.log('Erreur', error.message);
          });
      });
  };

  useEffect(() => {
    getRegistrationIds();
  }, []);

  return (
    <Box p={5}>
      <Heading>Nouvelle annonce</Heading>
      <VStack space={2}>
        <FormControl isInvalid={touched.title && errors?.title}>
          <FormControl.Label>Titre</FormControl.Label>
          <Input value={values.title} onChangeText={handleChange('title')} />
          <FormControl.ErrorMessage>{errors?.title}</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.description && errors?.description}>
          <FormControl.Label>Description</FormControl.Label>
          <Input
            value={values.description}
            onChangeText={handleChange('description')}
          />
          <FormControl.ErrorMessage>
            {errors?.description}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={touched.available && errors?.available}>
          <FormControl.Label>Disponibilité</FormControl.Label>
          <Input
            onFocus={() => setShowAvailableDatePicker(true)}
            showSoftInputOnFocus={false}
            ref={availableInputRef}
            value={values.available?.toISOString()}
            onChangeText={handleChange('available')}
          />
          <FormControl.ErrorMessage>
            {errors?.available}
          </FormControl.ErrorMessage>
        </FormControl>
        {showAvailableDatePicker &&
          DateTimePickerAndroid.open({
            mode: 'date',
            value: new Date(),
            onChange: availableDateChange,
          })}
        <FormControl isInvalid={touched.expiration && errors?.expiration}>
          <FormControl.Label>DLC/DLUO</FormControl.Label>
          <Input
            onFocus={() => {
              //   Keyboard.dismiss();
              setShowExpirationDatePicker(true);
            }}
            showSoftInputOnFocus={false}
            ref={expirationInputRef}
            value={values.expiration?.toISOString()}
            onChangeText={handleChange('expiration')}
          />
          <FormControl.ErrorMessage>
            {errors?.expiration}
          </FormControl.ErrorMessage>
        </FormControl>
        {showExpirationDatePicker &&
          DateTimePickerAndroid.open({
            mode: 'date',
            value: new Date(),
            onChange: expirationDateChange,
          })}
        <Button onPress={handleSubmit} mt={'4'} colorScheme={'amber'}>
          Enregistrer
        </Button>
      </VStack>
    </Box>
  );
}
