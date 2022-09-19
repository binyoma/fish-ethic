import React, {useEffect, useState} from 'react';
// NATIVE BASE
import {
  Box,
  Center,
  Text,
  Avatar,
  ScrollView,
  Stack,
  Link,
  FlatList,
  useColorModeValue,
} from 'native-base';
//import du theme
import {useTheme, Divider} from 'native-base';
// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Card from '../components/Card';
// Hook React navigation pour accéder au context de la react-navigation
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

const ProfilUsersScreen = props => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [lastEvents, setLastEvents] = useState();
  const [nextEvents, setNextEvents] = useState();
  const navigation = useNavigation();
  const theme = useTheme();

  //   recupération des données user
  useEffect(() => {
    const user_id = props.route.params.subscriber;
    if (!user) {
      firestore()
        .collection('users')
        .doc(user_id)
        .onSnapshot(documentSnapshot => {
          setUser(documentSnapshot.data());
          setLoading(false);
        });
    }
  }, []);

  // affichages des dernieres sorties du user
  useEffect(() => {
    const user_id = props.route.params.subscriber;
    const lastEvents = firestore()
      .collection('events')
      .where('user_id', '==', user_id)
      .where('endAt', '>=', new Date())
      .onSnapshot(
        querySnapshot => {
          const lastEventsArray = [];
          querySnapshot.forEach(doc => {
            lastEventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setLastEvents(lastEventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.massage);
        },
      );
    return () => lastEvents();
  }, []);
  // affichage des prochaines sorties du user
  useEffect(() => {
    const user_id = props.route.params.subscriber;
    const nextEvents = firestore()
      .collection('events')
      .where('user_id', '==', user_id)
      .where('endAt', '<=', new Date())
      .onSnapshot(
        querySnapshot => {
          const nextEventsArray = [];
          querySnapshot.forEach(doc => {
            nextEventsArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setNextEvents(nextEventsArray);
          setLoading(false);
        },
        error => {
          console.log(error.massage);
        },
      );
    return () => nextEvents();
  }, []);

  const renderItem = ({item}) => <Card props={item} />;
  return loading ? (
    <ActivityIndicator />
  ) : (
    <Center flex={'1'} bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <Box alignItems="center">
            {item.image ? (
              <Avatar
                bg="green.500"
                mt="5"
                size="2xl"
                source={{uri: user.image}}
              >
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
            ) : null}

            <Text>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do”{' '}
            </Text>

            <Divider my={2} mt="5" />

            <Link href="mailTo:paulinegallezot@gmail.com">
              <Text mt="5">
                <Ionicons name="ios-mail-sharp" size={10} /> {user.email}
              </Text>
            </Link>
            <Text>
              <Ionicons name="bar-chart-outline" size={10} />
              {user.level}
            </Text>
            <Text>
              <FontAwesomeIcon name="fish" size={10} />{' '}
              {user.fishing_techniques}
            </Text>

            <Divider my={2} mt="5" />
          </Box>
          <Box>
            <Center>
              <Text
                color={useColorModeValue(theme.colors.primary.green, 'white')}
              >
                PRECEDENTES SORTIES
              </Text>
            </Center>

            <Stack direction="row" space="3" mt="5">
              <FlatList
                horizontal={true}
                data={lastEvents}
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
              <Text
                color={useColorModeValue(theme.colors.primary.green, 'white')}
              >
                SORTIES A VENIR
              </Text>
            </Center>

            <Stack direction="row" space="3" mt="5">
              <FlatList
                horizontal={true}
                data={nextEvents}
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
  );
};

export default ProfilUsersScreen;
