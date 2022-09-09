import React from 'react';
import Card from '../components/Card';
import { Avatar, Box, Center, HStack, Stack, Text } from 'native-base';
import { useTheme } from 'native-base';
import { ScrollView } from 'react-native';
const HomeScreen = () => {
  //theme
  const theme = useTheme();
  return (
    <ScrollView>
      <Box bg="primary.darkGrey">
        <Box>
          <Center>
            <Text color="muted.50">LES DERNIERES SORTIES</Text>
          </Center>
          <ScrollView horizontal={true}>
            <Stack direction="row" space="3" mt="5">
              <Card />
              <Card />
              <Card />
            </Stack>
          </ScrollView>
        </Box>
        <Center mt="5">
          <Text color="muted.50">BIENVENUE A NOS NOUVEAUX MEMBRES</Text>
        </Center>
        <ScrollView horizontal={true}>
          <HStack space={2} mt="5">
            <Avatar
              bg="green.500"
              size="lg"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              AJ
            </Avatar>
            <Avatar
              size="lg"
              bg="cyan.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            >
              TE
            </Avatar>
            <Avatar
              size="lg"
              bg="indigo.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              JB
            </Avatar>
            <Avatar
              size="lg"
              bg="amber.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            >
              TS
            </Avatar>
            <Avatar
              size="lg"
              bg="indigo.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              JB
            </Avatar>
            <Avatar
              size="lg"
              bg="amber.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            >
              TS
            </Avatar>
            <Avatar
              size="lg"
              bg="green.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              AJ
            </Avatar>
            <Avatar
              size="lg"
              bg="cyan.500"
              source={{
                uri:
                  'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}
            >
              TE
            </Avatar>
          </HStack>
        </ScrollView>
        <Box mt="5">
          <Center>
            <Text color="muted.50">LES SORTIES A VENIR</Text>
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
  );
};

export default HomeScreen;