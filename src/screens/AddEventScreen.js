import {View, Text} from 'react-native';
import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup'

const AddEventScreen = () => {
  // traitement formulaire
  const validationSchema=Yup.object({
    lieu: Yup.string().required('Le titre est requis'),
    Debut:Yup.date()
    .typeError("La valeur renseigné n'est pas une date valide")
    .required('La date de disponibilité du don est requis'),
    fin:Yup .date()
    .typeError("La valeur renseigné n'est pas une date valide")
    .required('La date de disponibilité du don est requis'), 
    description:''
  })

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
    initialValues:{
        lieu: '',
        debut:null,
        fin:null, 
        description:''
    }, 
    onsubmit: values=>console.log(values),
    validationSchema,

  });

  return (
    <Center flex="1" bgColor="warmGray.5">
      <ScrollView w="full">
        <Box>
          <Box
            _dark={{
              bg: 'black',
            }}
            _light={{
              backgroundColor: 'green.700',
            }}>
            <Heading size={'lg'} color="white">
              Ajout évenement
            </Heading>
          </Box>

          <FormControl>
            <FormControl.Label>Lieu</FormControl.Label>
            <Input placeholder="Indiquer le lieu"  onChangeText={handleChange('lieu')}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Début</FormControl.Label>
            <Input placeholder="Préciser le début" />
          </FormControl>
          
          <FormControl>
            <FormControl.Label>fin</FormControl.Label>
            <Input placeholder="Préciser la fin" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input placeholder="Décrire l'évenement" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Photo</FormControl.Label>
            <Input placeholder="Choisir la photo" />
          </FormControl>
          <Button colorScheme="green">Publier</Button>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default AddEventScreen;
