import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {useTheme} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {date} from 'yup/lib/locale';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState();
  const [oldEvents, setOldEvents] = useState([]);
  const [users, setUsers] = useState();
  const navigation = useNavigation();
  // affichage les elements passer les évènements
  useEffect(() => {
    const allEvents = firestore()
      .collection('events')
      .where('endAt', '<=', new Date())
      .onSnapshot(
        querySnapShot => {
          const eventsArray = [];
          querySnapShot.forEach(doc => {
            eventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setOldEvents(eventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.message);
        },
      );
    return () => allEvents();
  }, []);
  // affichage les elements futur les évènements
  useEffect(() => {
    const allEvents = firestore()
      .collection('events')
      .where('endAt', '>=', new Date())
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

  // affichage des dernieres inscriptions
  useEffect(() => {
    let toDay = new Date();
    let toDaymoinsdeux = toDay.setDate(toDay.getDate() - 2);
    let newMember = new Date(toDaymoinsdeux);

    const allAvatar = firestore()
      .collection('users')
      .onSnapshot(
        querySnapShot => {
          const usersArray = [];
          querySnapShot.forEach(doc => {
            if (new Date(doc.data().createdAt.seconds * 1000) >= newMember) {
              usersArray.push({
                ...doc.data(),
                id: doc.id,
              });
            }
          });
          setUsers(usersArray);
          setLoading(false);
        },
        error => {
          console.log(error.message);
        },
      );
    return () => allAvatar();
  }, []);

  // renderitem affichage des sortie
  const renderItemCards = ({item}) => <Card props={item} />;

  // renderitem affichage des avatar
  const renderItemAvatar = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('profilUsers', {subscriber: item.id});
      }}
    >
      <VStack>
        {item.image ? (
          <Avatar m="2" bg="green.500" size="lg" source={{uri: item.image}} />
        ) : null}

        <Text textAlign="center">{item?.pseudo}</Text>
      </VStack>
    </TouchableOpacity>
  );

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
              data={oldEvents}
              keyExtractor={item => item.id}
              renderItem={renderItemCards}
              ListEmptyComponent={() => (
                <Text my="5">Pas de sortie aujour'hui !</Text>
              )}
            />
          </Stack>
        </Box>
        <Center mt="5">
          <Text>BIENVENUE A NOS NOUVEAUX MEMBRES</Text>
        </Center>

        <HStack space={2} mt="5">
          <FlatList
            horizontal={true}
            data={users}
            keyExtractor={item => item.id}
            renderItem={renderItemAvatar}
            ListEmptyComponent={() => (
              <Text my="5">Pas de nouveaux membres aujour'hui !</Text>
            )}
          />
        </HStack>

        <Box mt="5">
          <Center>
            <Text>LES SORTIES A VENIR</Text>
          </Center>

          <Stack direction="row" space="3" mt="5">
            <FlatList
              horizontal={true}
              data={events}
              keyExtractor={item => item.id}
              renderItem={renderItemCards}
            />
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;
