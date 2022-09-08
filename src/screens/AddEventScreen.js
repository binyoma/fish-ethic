import {View, Text} from 'react-native';
import React, { useRef, useState } from 'react';
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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const AddEventScreen = () => {
  // traitement formulaire
  // gesetion de l'affichage des pickers de date
  const [showDebutDatePicker, setShowDebutDatePicker]=useState(false);
  const [showFinDatePicker, setShowFinDatePicker]=useState(false);

  //création de ref sur les inputs des champs des dates
  const debutInputRef= useRef(null)
  const finInputRef= useRef(null)


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

  const debutDateChange=(event, selectedDate)=>{
    const nextDate = selectedDate;
    setShowDebutDatePicker(false);
    setFieldValue('debut', nextDate);
    debutInputRef.current.blur();
  };
  const finDateChange=(event, selectedDate)=>{
    const nextDate = selectedDate;
    setShowFinDatePicker(false);
    setFieldValue('debut', nextDate);
    finInputRef.current.blur();
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

          <FormControl isInvalid={touched.lieu && errors?.lieu}>
            <FormControl.Label>Lieu</FormControl.Label>
            <Input placeholder="Indiquer le lieu" value={values.lieu} onChangeText={handleChange('lieu')}/>
            <FormControl.ErrorMessage>{errors?.lieu}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.debut && errors?.debut}>
            <FormControl.Label>Début</FormControl.Label>
            <Input 
                onFocus={()=>setShowDebutDatePicker(true)}
                showSoftInputOnFocus={false}
                ref={debutInputRef}
                value={values.debut?.toISOString()} 
                onChangeText={handleChange('debut')}
                />
                <FormControl.ErrorMessage>
            {errors?.debut}
          </FormControl.ErrorMessage>
          </FormControl>
          {showDebutDatePicker && DateTimePickerAndroid.open({
            mode:'date',
            value:new Date(),
            onChange:debutDateChange,
          })}
          <FormControl isInvalid={touched.fin && errors?.fin}>
            <FormControl.Label>Fin</FormControl.Label>
            <Input 
                onFocus={()=>setShowFinDatePicker(true)}
                showSoftInputOnFocus={false}
                ref={finInputRef}
                value={values.fin?.toISOString()} 
                onChangeText={handleChange('fin')}
                />
                <FormControl.ErrorMessage>
            {errors?.fin}
          </FormControl.ErrorMessage>
          </FormControl>
          {showFinDatePicker && DateTimePickerAndroid.open({
            mode:'date',
            value:new Date(),
            onChange:finDateChange,
          })}
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input placeholder="Décrire l'évenement"  value={values.description} onChangeText={handleChange('description')}/>
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
