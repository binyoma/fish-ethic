import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button, extendTheme, FormControl, Heading, Input } from 'native-base'
import { background } from 'native-base/lib/typescript/theme/styled-system'

const AddEventScreen = () => {
   
  return (
    <Box>
        <Heading size={'lg'}>AJOUT EVENEMENT</Heading>
        <FormControl>
            <FormControl.Label>Lieu</FormControl.Label>
            <Input placeholder='Indiquer le lieu'/>
        </FormControl>
        <FormControl>
            <FormControl.Label>Horaires</FormControl.Label>
            <Input placeholder="Préciser la date et l'heure"/>
        </FormControl>
        <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input placeholder="Décrire l'évenement"/>
        </FormControl>
        <FormControl>
            <FormControl.Label>Photo</FormControl.Label>
            <Input placeholder="Choisir la photo"/>
        </FormControl>
        <Button>Publier</Button>
    </Box>
  )
}

export default AddEventScreen