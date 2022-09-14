import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import {Avatar, Box, Center, FlatList, HStack, Stack, Text} from 'native-base';
import {useTheme} from 'native-base';
import {ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState();

  // affichage de tous les évènements
  useEffect(() => {
    const allEvents = firestore()
      .collection('events')
      .onSnapshot(
        querySnapShot => {
          const eventsArray = [];
          querySnapShot.forEach(doc => {
            eventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setEvents(eventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.message);
        },
      );
    return () => allEvents();
  }, []);

  const renderItem = ({item}) => <Card props={item} />;

  //theme
  const theme = useTheme();
  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <Box bgColor="warmGray.5">
        <Box>
          <Center mt="3">
            <Text>LES DERNIERES SORTIES</Text>
          </Center>

          <Stack direction="row" space="3" mt="5">
            <FlatList
              horizontal={true}
              data={events}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <Text my="5">Pas de sortie aujour'hui !</Text>
              )}
            />
          </Stack>
        </Box>
        <Center mt="5">
          <Text>BIENVENUE A NOS NOUVEAUX MEMBRES</Text>
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
            <Text>LES SORTIES A VENIR</Text>
          </Center>

          <Stack direction="row" space="3" mt="5">
            <FlatList
              horizontal={true}
              data={events}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;
