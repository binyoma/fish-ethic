import {View, TouchableOpacity} from 'react-native';
import React from 'react';

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
} from 'native-base';

const CustomHeader = props => {
  const route = useRoute();
  const navigation = useNavigation();

  return route.name == 'Home' ? (
    <Box>
      <HStack justifyContent="center">
        <Avatar
          mt="3"
          bg="black"
          size="md"
          source={require('../assets/SAUVA2.png')}
        ></Avatar>
        <Center h="20">
          <Heading bg="red">FISHETHIC</Heading>
        </Center>
      </HStack>

      <Input
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
    </Box>
  ) : route.name == 'Account' ? (
    <Box>
      <HStack>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text>VOTRE PROFIL</Text>
      </HStack>
      <Input
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
    </Box>
  ) : route.name == 'Research' ? (
    <Box>
      <HStack>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text>RECHERCHE</Text>
      </HStack>
      <Input
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
    </Box>
  ) : route.name == 'Add' ? (
    <Box>
      <HStack>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text>AJOUTER</Text>
      </HStack>
      <Input
        placeholder="Search"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        fontSize="14"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
    </Box>
  ) : null;
};

export default CustomHeader;
