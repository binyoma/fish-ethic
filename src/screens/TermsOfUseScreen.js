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
const TermsOfUseScreen = () => {
    return (

        <Center flex="1" bgColor="warmGray.5">
            <ScrollView w="full">
                <Box w="95%" mx="auto" px="1">
                    <Heading size="lg" mt="5"> SENSIBILISER ET INFORMER L’UTILISATEUR DE FISHETHIC
                    </Heading>
                    <Text mt="2">Par la présente charte, l’utilisateur de FISHETHIC s’engage à :
                    </Text>
                    <Text mt="2">
                        • Admettre qu’en s’appuyant sur les informations recueillies par les scientifiques et le
                        cas échéant complétées par celles des associations représentatives de la pêche de
                        loisir et des instances représentatives de la pêche et de la conchyliculture, leur
                        pratique de la pêche devra évoluer :
                    </Text>
                    <Text mt="2">
                        • Sur les tailles minimales de capture quand cela peut apparaître nécessaire pour une
                        espèce donnée ou une zone géographique.
                    </Text>
                    <Text mt="2">
                        Ne pas utiliser certaines pratiques et techniques de pêche, comme la corde plombée
                        ou la chasse-pêche à l'aide d'un scooter sous-marin, et sont favorables à une
                        interdiction par la voie réglementaire.
                    </Text>
                    <Text mt="2">
                        • Respecter Les tailles biologiques des espèces garantissant au moins un cycle de
                        reproduction.
                    </Text>
                    <Text mt="2">
                        Ajouter ou retirer des espèces déclarées menacées.
                    </Text>
                    <Text mt="2">
                        • Respecter des périodes de repos biologiques pour certaines espèces.
                    </Text>
                    <Text mt="2">
                        • Etablir une limitation de prise journalière pour certaines espèces.
                    </Text>
                    <Text mt="2"> Il est essentiel, pour maintenir les équilibres environnementaux et assurer la durabilité de la
                        pêche de loisir, de sensibiliser tous les pratiquants aux enjeux écologiques, la pêche de loisir
                        a en effet des impacts sur la ressource et sur les milieux.</Text>
                    <Text mt="2">
                        JE M’ENGAGE
                    </Text>
                </Box>
            </ScrollView>
        </Center>
    )
}

export default TermsOfUseScreen