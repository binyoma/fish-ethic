import { ActivityIndicator } from 'react-native';
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
  useTheme,
  Divider,
  useToast,
  FlatList,
} from 'native-base';
/************************************************
 * Firebase
 ***********************************************/
// firebase firestore
import firestore from '@react-native-firebase/firestore';
// firebase auth
import auth from '@react-native-firebase/auth';

/************************************************
 * Firebase
 ***********************************************/

// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import Card from '../components/Card';
// Hook React navigation pour accéder au context de la react-navigation
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const AccountScreen = () => {

  // toast de notification
  const toast = useToast();

  ///////////////////////////////////////////////////////////////////////
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    const id = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(id)
      .onSnapshot(
        docSnap => {
          const data = docSnap.data();
          setInitialValues({
            firstname: data['firstname'],
            name: data['name'],
            image: data['image'],
            level: data['level'],
            fishing_techniques: data['fishing_techniques'],
            email: data['email'],
          });
        });
  }, []);
  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [events, setevents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_id = auth().currentUser.uid;
    const oldevents = firestore()
      .collection('events')
      .where('user_id', '==', user_id)
      .where('endAt', "<=", new Date())
      .onSnapshot(
        querySnapshot => {
          const eventsArray = [];
          querySnapshot.forEach(doc => {
            eventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setOldEvents(eventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.massage);
        },
      );
    // Détacher un écouteur
    return () => oldevents();
  }, []);

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const user_id = auth().currentUser.uid;
    const events = firestore()
      .collection('events')
      .where('user_id', '==', user_id)
      .where('endAt', ">=", new Date())
      .onSnapshot(
        querySnapshot => {
          const eventsArray = [];
          querySnapshot.forEach(doc => {
            eventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setevents(eventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.massage);
        },
      );
    return () => events();
  }, []);

  ///////////////////////////////////////////////////////////////
  const renderItem = ({ item }) => <Card props={item} />;

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  const navigation = useNavigation();

  return (
    <Center flex={'1'} bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">

          <Box alignItems="center">
            <Avatar bg="green.500" mt="5" size="2xl" source={{
              uri: initialValues.image
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
            <Text>{initialValues.firstname} {initialValues.name}</Text>
            <Button colorScheme="green" onPress={() => navigation.navigate('Modification')}
              rightIcon={<Ionicons name="pencil-outline" size={20} color="white" />
              }
            >
              Modifier le profil
            </Button>
            <Divider my={2} mt="5" />
            <Text mt="5"><Ionicons name="ios-mail-sharp" size={10} /> {initialValues.email} </Text>
            <Text><Ionicons name="bar-chart-outline" size={10} /> {initialValues.level} </Text>
            <Text><FontAwesomeIcon name="fish" size={10} /> {initialValues.fishing_techniques}</Text>
            <Divider my={2} mt="5" />
          </Box>

          <Box>
            <Center>
              <Text >MES SORTIES A VENIR</Text>
            </Center>
            <Stack direction="row" space="3" mt="5" >
              <FlatList
                horizontal={true}
                data={events}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                  <Text my="5">Aucun evenement trouvé !</Text>
                )}
              />
            </Stack>
          </Box>
          <Box mt="5">
            <Center>
              <Text>MES PRECEDENTES SORTIES</Text>
            </Center>
            <Stack horizontal={true}>
              <FlatList
                horizontal={true}
                data={oldEvents}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                  <Text my="5">Aucun evenement trouvé !</Text>
                )}
              />
            </Stack>
          </Box>
        </Box>
      </ScrollView>
    </Center>
  )
}

export default AccountScreen

