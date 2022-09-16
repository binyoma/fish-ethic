import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Pressable,
  ScrollView,
  useColorModeValue,
  useDisclose,
  useToast,
} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
/**
 * Google firebase
 */
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
const ModifEventScreen = props => {
  const item = props.route.params;
  const data = item.props;

  // traitement formulaire
  // gestion de l'affichage des pickers de date
  const [showDebutDatePicker, setShowDebutDatePicker] = useState(false);
  const [showFinDatePicker, setShowFinDatePicker] = useState(false);

  // gestion de l'affichage des pickers des heures
  const [showDebutHeurePicker, setShowDebutHeurePicker] = useState(false);
  const [showFinHeurePicker, setShowFinHeurePicker] = useState(false);

  //création de ref sur les inputs des champs des dates
  const dateDebutInputRef = useRef(null);
  const dateFinInputRef = useRef(null);

  //création de ref sur les inputs des champs des dates
  const heureDebutInputRef = useRef(null);
  const heureFinInputRef = useRef(null);
  // toast de notification de l'utilisateur
  const toast = useToast();

  const validationSchema = Yup.object({
    title: Yup.string().required('Le titre est requis'),
    place: Yup.string().required('Le lieu est requis'),
    startAt: Yup.date()
      .typeError("La valeur renseigné n'est pas une date valide")
      .required('La date de début est requise'),
    startHour: Yup.date()
      .typeError("La valeur renseigné n'est pas valide")
      .required("L'heure de début est requise"),
    endAt: Yup.date()
      .typeError("La valeur renseigné n'est pas une date valide")
      .required('La date de fin est requise'),
    endHour: Yup.date()
      .typeError("La valeur renseigné n'est pas valide")
      .required("L'heure de début est requise"),
    description: Yup.string().required('La description est réquise'),
  });

  const dateDebutChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    setShowDebutDatePicker(false);
    setFieldTouched('startAt', true);
    setFieldValue('startAt', nextDate);
    dateDebutInputRef.current.blur();
  };
  const dateFinChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    setShowFinDatePicker(false);
    setFieldTouched('endAt', true);
    setFieldValue('endAt', nextDate);
    dateFinInputRef.current.blur();
  };

  const heureDebutChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    setShowDebutHeurePicker(false);
    setFieldTouched('startHour', true);
    setFieldValue('startHour', nextDate);
    heureDebutInputRef.current.blur();
  };
  const heureFinChange = (event, selectedDate) => {
    const nextDate = selectedDate;
    setShowFinHeurePicker(false);
    setFieldTouched('endHour', true);
    setFieldValue('endHour', nextDate);
    heureFinInputRef.current.blur();
  };

  const {
    values,
    setFieldValue,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldTouched,
    dirty,
    resetForm,
  } = useFormik({
    initialValues: {
      title: data?.title,
      place: data?.place,
      startAt: data?.startAt,
      startHour: data?.startHour,
      endAt: data?.endAt,
      endHour: data?.endHour,
      description: data?.description,
    },
    onSubmit: values => console.log(values),
    validationSchema,
  });
  // firestore
  //   const createEvent = values => {
  //     firestore()
  //       .collection('events')
  //       .add({
  //         ...values,
  //         createdAt: firestore.FieldValue.serverTimestamp(),
  //         user_id: auth().currentUser.uid,
  //       })
  //       .then(async newAdvert => {
  //         toast.show({
  //           description: 'Evenement crée avec succès !',
  //         });
  //         resetForm();
  //       });
  //   };
  const {isOpen, onOpen, onClose} = useDisclose();

  const takePhoto = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
    };
    const response = await launchCamera(options);

    const {didCancel, errorCode, errorMessage, assets} = response;

    if (didCancel) {
      console.log('====================================');
      console.log("prise de photo annulée par l'utilisateur");
      toast.show({
        title: "Prise de photo annulée par l'utilisateur",
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
      uploadPhoto(img);
    }
  };

  const getPhotoFromStorage = async () => {
    const response = await launchImageLibrary(options);
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
    };

    const {didCancel, errorCode, errorMessage, assets} = response;

    if (didCancel) {
      console.log('====================================');
      console.log("prise de photo annulée par l'utilisateur");
      toast.show({
        title: "Prise de photo annulée par l'utilisateur",
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
      uploadPhoto(img);
    }
  };

  const uploadPhoto = async img => {
    // on crée une référence pour l'image que le souhaite update avec son nom de stockage

    const reference = storage().ref(`${uuid.v4()}.jpg`);
    reference.putFile(img.uri).then(() => {
      console.log('====================================');
      console.log('image uploaded to the bucket');
      console.log('====================================');
      reference.getDownloadURL().then(url => {
        setFieldValue('url', url);
        console.log(url);
      });
      toast.show({
        title: 'Photo uploaded',
        placement: 'bottom',
      });
    });
  };
  return (
    <Center flex="1" bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <FormControl isInvalid={touched.title && errors?.title}>
            <FormControl.Label>Titre</FormControl.Label>
            <Input
              placeholder="Indiquer le titre"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <FormControl.ErrorMessage>{errors?.title}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.place && errors?.place}>
            <FormControl.Label>Lieu</FormControl.Label>
            <Input
              placeholder="Indiquer le lieu"
              value={values.place}
              onChangeText={handleChange('place')}
            />
            <FormControl.ErrorMessage>{errors?.place}</FormControl.ErrorMessage>
          </FormControl>
          <HStack space={2} justifyContent="flex-start">
            <Center width="50%">
              <FormControl isInvalid={touched.startAt && errors?.startAt}>
                <FormControl.Label>Date de début</FormControl.Label>
                <Input
                  onFocus={() => setShowDebutDatePicker(true)}
                  showSoftInputOnFocus={false}
                  ref={dateDebutInputRef}
                  value={
                    touched.startAt
                      ? values.startAt.toLocaleDateString()
                      : values.startAt.toDate().toLocaleDateString()
                  }
                />
                <FormControl.ErrorMessage>
                  {errors?.startAt}
                </FormControl.ErrorMessage>
              </FormControl>
              {showDebutDatePicker &&
                DateTimePickerAndroid.open({
                  mode: 'date',
                  value: new Date(),
                  onChange: dateDebutChange,
                })}
            </Center>
            <Center width="47%">
              <FormControl isInvalid={touched.startHour && errors?.startHour}>
                <FormControl.Label>Heure de début</FormControl.Label>
                <Input
                  onFocus={() => setShowDebutHeurePicker(true)}
                  showSoftInputOnFocus={false}
                  ref={heureDebutInputRef}
                  value={
                    touched.startHour
                      ? values.startHour.toLocaleTimeString()
                      : values.startHour.toDate().toLocaleTimeString()
                  }
                />
                <FormControl.ErrorMessage>
                  {errors?.startHour}
                </FormControl.ErrorMessage>
              </FormControl>
              {showDebutHeurePicker &&
                DateTimePickerAndroid.open({
                  mode: 'time',
                  value: new Date(),
                  onChange: heureDebutChange,
                })}
            </Center>
          </HStack>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input
              placeholder="Décrire l'évenement"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </FormControl>
          <HStack space={2} justifyContent="flex-start">
            <Center width="50%">
              <FormControl isInvalid={touched.endAt && errors?.endAt}>
                <FormControl.Label>Date de fin</FormControl.Label>
                <Input
                  onFocus={() => setShowFinDatePicker(true)}
                  showSoftInputOnFocus={false}
                  ref={dateFinInputRef}
                  value={
                    touched.endAt
                      ? values.endAt.toLocaleDateString()
                      : values.endAt.toDate().toLocaleDateString()
                  }
                />
                <FormControl.ErrorMessage>
                  {errors?.endAt}
                </FormControl.ErrorMessage>
              </FormControl>
              {showFinDatePicker &&
                DateTimePickerAndroid.open({
                  mode: 'date',
                  value: new Date(),
                  onChange: dateFinChange,
                })}
            </Center>
            <Center width="47%">
              <FormControl isInvalid={touched.endHour && errors?.endHour}>
                <FormControl.Label>Heure de fin</FormControl.Label>
                <Input
                  onFocus={() => setShowFinHeurePicker(true)}
                  showSoftInputOnFocus={false}
                  ref={heureFinInputRef}
                  value={
                    touched.endHour
                      ? values.endHour.toLocaleTimeString()
                      : values.endHour.toDate().toLocaleTimeString()
                  }
                />
                <FormControl.ErrorMessage>
                  {errors?.endHour}
                </FormControl.ErrorMessage>
              </FormControl>
              {showFinHeurePicker &&
                DateTimePickerAndroid.open({
                  mode: 'time',
                  value: new Date(),
                  onChange: heureFinChange,
                })}
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Actionsheet.Item onPress={takePhoto}>
                    Camera
                  </Actionsheet.Item>
                  <Actionsheet.Item onPress={getPhotoFromStorage}>
                    Galerie photo
                  </Actionsheet.Item>
                </Actionsheet.Content>
              </Actionsheet>
            </Center>
          </HStack>
          <Pressable onPress={onOpen}>
            <Center>
              <Ionicons
                name="camera-sharp"
                size={40}
                color={useColorModeValue('#000', '#FFF')}
              />
            </Center>
          </Pressable>
          <Button colorScheme="green" onPress={handleSubmit} margin="5">
            Publier
          </Button>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default ModifEventScreen;
