import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Link,
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
import {useNavigation} from '@react-navigation/native';
const ModifEventScreen = props => {
  const item = props.route.params;
  const data = item.props;
  const navigation = useNavigation();
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
    enableReinitialize: true,
    initialValues: {
      title: data?.title,
      place: data?.place,
      startAt: data?.startAt.toDate(),
      startHour: data?.startHour.toDate(),
      endAt: data?.endAt.toDate(),
      endHour: data?.endHour.toDate(),
      description: data?.description,
      url: data?.url,
    },
    onSubmit: values => handleUpdate(values),
    validationSchema,
  });

  // modification

  const handleUpdate = values => {
    console.log(item);
    firestore()
      .collection('events')
      .doc(item.props.id)
      .update({
        ...values,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(updatedUser => {
        console.log('====================================');
        console.log('events updated !');
        console.log('====================================');
        toast.show({
          duration: 3000,
          title: 'sortie modifiée',
          placement: 'bottom',
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 3500);
      })
      .catch(e => {
        console.log('====================================');
        console.log(e.message);
        console.log('====================================');
      });
  };
  // gestion de la photo
  const {isOpen, onOpen, onClose} = useDisclose();
  const [uploadedPhoto, setUploadedPhoto] = useState(3);
  const [initialValues, setInitialValues] = useState();
  const takePhoto = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
    };
    const response = await launchCamera(options);

    const {didCancel, errorCode, errorMessage, assets} = response;

    if (didCancel) {
      console.log('====================================');
      console.log("prise de photo annulé par l'utilisateur");
      toast.show({
        title: "Prise de photo annulé par l'utilisateur",
        placement: 'bottom',
      });
      console.log('====================================');
    } else if (errorCode) {
      console.log('coucou====================================');
      console.log(errorMessage);
      console.log('====================================');
    } else {
      const img = assets[0];
      console.log(img);
      uploadPhoto(img);
    }
  };
  const getPhotoFromStorage = async () => {
    const response = await launchImageLibrary(options);
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
    };

    const {didCancel, errorCode, errorMessage, assets} = response;

    if (didCancel) {
      console.log('====================================');
      console.log("prise de photo annulé par l'utilisateur");
      toast.show({
        title: "Prise de photo annulé par l'utilisateur",
        placement: 'bottom',
      });
      console.log('====================================');
    } else if (errorCode) {
      console.log('coucou ====================================');
      console.log(errorMessage);
      console.log('====================================');
    } else {
      const img = assets[0];
      console.log(img);
      uploadPhoto(img);
    }
  };

  useEffect(() => {
    firestore()
      .collection('events')
      .doc(item.id)
      .get()
      .then(docSnap => {
        const data = docSnap.data();

        setInitialValues({
          title: data ? data['title'] : null,
          description: data ? data['description'] : null,
          startAt: data ? data['startAt'] : null,
          endAt: data ? data['endAt'] : null,
          startHour: data ? data['startHour'] : null,
          endHour: data ? data['endHour'] : null,
          url: data ? data['url'] : null,
        });
      });
  }, []);
  const uploadPhoto = async img => {
    // on crée une référence pour l'image que le souhaite update avec son nom de stockage
    const avatarRef = storage().ref(`pict-${uuid.v4()}.jpg`);
    avatarRef.putFile(img.uri).then(() => {
      console.log('====================================');
      console.log('image uploaded to the bucket');
      console.log('====================================');
      toast.show({
        title: 'Photo modifiée',
        placement: 'bottom',
      });

      avatarRef.getDownloadURL().then(url => {
        setFieldValue('url', url);
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
          <FormControl isInvalid={touched.url && errors?.url}>
            <Center>
              <Image
                source={{uri: values?.url}}
                size="2xl"
                alt="image de l'évenement"
                margin={2}
              />
              <FormControl.Label>Modifier la photo</FormControl.Label>
              <Pressable onPress={onOpen}>
                <Center>
                  <Ionicons
                    name="camera-sharp"
                    size={40}
                    color={useColorModeValue('#000', '#FFF')}
                  />
                </Center>
              </Pressable>
              <FormControl.ErrorMessage>{errors?.url}</FormControl.ErrorMessage>
            </Center>
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
                  value={values.startAt.toLocaleDateString()}
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
                  value={values.startHour.toLocaleTimeString()}
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
                  value={values.endAt.toLocaleDateString()}
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
                  value={values.endHour.toLocaleTimeString()}
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
          <Pressable onPress={onOpen}></Pressable>
          <Button colorScheme="green" onPress={handleSubmit} margin="5">
            Modifier
          </Button>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default ModifEventScreen;
