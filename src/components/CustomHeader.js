import {View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base';
import {AuthContext} from '../contexts/AuthContext';
import auth from '@react-native-firebase/auth';
const CustomHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();

  const authenContext = useContext(AuthContext);
  const {setAuthenticated} = authenContext;

  const logout = () => {
    auth()
      .signOut()
      .then(userCredential => {
        setAuthenticated(false);
        console.log('====================================');
        console.log('déconnexion réussie');
        console.log('====================================');
      });
  };
  return route.name == 'Home' ? (
    <Box>
      <HStack justifyContent="center">
        <Avatar
          mt="4"
          mr="2"
          size="md"
          bg={useColorModeValue('white', 'black')}
          source={require('../assets/SAUVA2.png')}
        ></Avatar>

        <Center h="20">
          <Heading>FISHETHIC</Heading>
        </Center>
      </HStack>

      <Input
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="16"
        InputLeftElement={
          <Icon m="2" ml="3" size="6" as={<Ionicons name="search" />} />
        }
      />
    </Box>
  ) : route.name == 'Account' ? (
    <Box>
      <HStack
        bg={useColorModeValue(theme.colors.primary.green, 'black')}
        p="4"
        justifyContent="space-around"
      >
        <Center>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color="white" size={30} />
          </TouchableOpacity>
        </Center>
        <Center>
          <Text color="white" fontSize="20">
            VOTRE PROFIL
          </Text>
        </Center>
        <Center>
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
          >
            <MaterialCommunityIcons
              name="logout-variant"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'Research' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Center ml="2">
          <Text color="white" fontSize="20">
            RECHERCHE
          </Text>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'Add' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Center ml="2">
          <Text color="white" fontSize="20">
            AJOUTER
          </Text>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'Registration' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Text color="white" fontSize="20">
          INSCRIPTION
        </Text>
      </HStack>
    </Box>
  ) : route.name == 'Login' ? (
    <Box>
      <HStack justifyContent="center">
        <Avatar
          mt="4"
          mr="2"
          size="md"
          bg={useColorModeValue('white', 'black')}
          source={require('../assets/SAUVA2.png')}
        ></Avatar>

        <Center h="20">
          <Heading>FISHETHIC</Heading>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'profilUsers' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Center ml="2">
          <Text color="white" fontSize="20">
            INFOS PROFIL
          </Text>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'MoreInfo' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Center ml="2">
          <Text color="white" fontSize="20">
            PLUS D'INFO
          </Text>
        </Center>
      </HStack>
    </Box>
  ) : route.name == 'Modification évenement' ? (
    <Box>
      <HStack bg={useColorModeValue(theme.colors.primary.green, 'black')} p="4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={30} />
        </TouchableOpacity>
        <Center ml="2">
          <Text color="white" fontSize="20">
            MODIFIEZ VOTRE SORTIE
          </Text>
        </Center>
      </HStack>
    </Box>
  ) : null;
};

export default CustomHeader;
