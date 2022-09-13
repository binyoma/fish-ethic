import React, { useContext, useEffect, useState } from 'react';
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
  Avatar,
  ScrollView,
  Stack,
  theme,
  Pressable,
} from 'native-base';
//import du theme
import { useTheme, Divider } from 'native-base';
// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Card from '../components/Card';
// Hook React navigation pour accéder au context de la react-navigation
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <Center flex={'1'} bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">

          <Box alignItems="center">
            <Avatar bg="green.500" mt="5" size="2xl" source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }}>

              <Avatar.Badge
                size="8"
                justifyContent="center"
                backgroundColor="amber.500"
                shadow="2"
              >
                <Center>
                  <Ionicons name="checkmark" size={10} color="white" />
                </Center>
              </Avatar.Badge>

            </Avatar>
            <Text>“Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do” </Text>
            <Button colorScheme="green" onPress={() => navigation.navigate('Modification')}
              rightIcon={<Ionicons name="pencil-outline" size={20} color="white" />
              }
            >
              Modifier le profil
            </Button>
            <Divider my={2} mt="5" />

            {/* ajouter icon email */}
            <Text mt="5"><Ionicons name="ios-mail-sharp" size={10} /> name@gmail.com </Text>
            <Text><Ionicons name="bar-chart-outline" size={10} /> Niveau intermédiaire </Text>
            <Text><FontAwesomeIcon name="fish" size={10} /> Pèche à la carpe</Text>

            <Divider my={2} mt="5" />

          </Box>
          <Box>
            <Center>
              <Text color="muted.50">MES PRECEDENTES SORTIES</Text>
            </Center>
            <ScrollView horizontal={true}>
              <Stack direction="row" space="3" mt="5">
                <Card />
                <Card />
                <Card />
              </Stack>
            </ScrollView>
          </Box>
          <Box mt="5">
            <Center>
              <Text color="muted.50">MES SORTIES A VENIR</Text>
            </Center>
            <ScrollView horizontal={true}>
              <Stack direction="row" space="3" mt="5">
                <Card />
                <Card />
                <Card />
              </Stack>
            </ScrollView>
          </Box>
        </Box>
      </ScrollView>
    </Center>

  )
}

export default AccountScreen