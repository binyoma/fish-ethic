import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Button,
  AspectRatio,
  useTheme,
  Link,
  Toast,
  useToast,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const MoreInfoScreen = props => {
  const item = props.route.params;
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState();
  const [subscriber, setSubscriber] = useState([]);
  const navigation = useNavigation();

  // recuperation du pseudo
  useEffect(() => {
    const user_id = item.props.user_id;
    if (!users) {
      firestore()
        .collection('users')
        .doc(user_id)
        .onSnapshot(documentSnapshot => {
          setUsers(documentSnapshot.data());
        });
    }
  }, []);
  useEffect(() => {
    if (item.props.subscriber) {
      let data = [];
      item.props.subscriber.map(async (id, index) => {
        const user = await firestore().collection('users').doc(id).get();
        if (user) {
          data.push({pseudo: user.data().pseudo, id: id});
          if (item.props.subscriber.length - 1 === index) {
            setSubscriber(data);
          }
        }
      });
    }
  }, [subscriber]);
  console.log(subscriber);
  // inscription à une sortie
  const subscribEvent = async () => {
    const event = await firestore()
      .collection('events')
      .doc(item.props.id)
      .get();
    if (event.data().subscriber) {
      let data = [...event.data().subscriber, auth().currentUser.uid];

      firestore()
        .collection('events')
        .doc(item.props.id)
        .update({subscriber: data})
        .then(() => {
          console.log('bien enregistré');
        });
    } else {
      firestore()
        .collection('events')
        .doc(item.props.id)
        .update({subscriber: [auth().currentUser.uid]})
        .then(() => {
          console.log('bien enregistré');
        });
    }
  };
  const deleteSubscriber = () => {
    firestore()
      .doc(item.props.id)
      .delete({subscriber: [auth().currentUser.uid]})
      .then(() => {
        console.log('suppression');
      });
  };

  const theme = useTheme();
  const publisherId = item.props.user_id;
  const currentUserId = auth().currentUser.uid;

  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <Box>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{uri: item?.props?.url}}
              alt="peche"
              h="100%"
              resizeMode="cover"
            ></Image>
          </AspectRatio>
        </Box>
        {publisherId != currentUserId ? (
          <HStack justifyContent="center" mt="3">
            <Text mr="3">{users?.pseudo}</Text>
            <MaterialCommunityIcons
              color={theme.colors.primary.yellow}
              name="star"
              size={20}
            />
            <Text mr="3">4.9</Text>
            <MaterialCommunityIcons
              color={theme.colors.primary.green}
              name="send"
              size={20}
            />
            <Link href="mailTo:paulinegallezot@gmail.com">
              Contacter le membre
            </Link>
          </HStack>
        ) : null}
        <Stack mt="4">
          <Heading>{item.props.title}</Heading>
          <Stack bg={theme.colors.primary.green} mt="5" mb="3" p="2" space="2">
            <Text color="white">
              Date: Du{' '}
              {item?.props?.startAt &&
                dayjs(item.props.startAt?.toDate()).format('DD/MM/YYYY')}{' '}
              au{' '}
              {item?.props?.endAt &&
                dayjs(item.props.endAt?.toDate()).format('DD/MM/YYYY')}
            </Text>
            <Text color="white">
              Heure: De{' '}
              {item?.props?.startHour &&
                dayjs(item.props.startHour?.toDate()).format('HH:mm')}{' '}
              à{' '}
              {item?.props?.endHour &&
                dayjs(item.props.endHour?.toDate()).format('HH:mm')}
            </Text>
            <Text color="white">Lieu: {item?.props?.place}</Text>
          </Stack>

          <Text m="2">Description: {item.props.description}</Text>

          <Stack m="2">
            <Text>Participants:</Text>
            <HStack>
              {subscriber.length != 0 ? (
                subscriber.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('profilUsers', {
                          subscriber: item.id,
                        });
                      }}
                    >
                      <Text>
                        {item.pseudo}{' '}
                        {index == subscriber.length - 1 ? null : ' | '}
                        {item.id == currentUserId ? (
                          <TouchableOpacity
                            onPress={() => deleteSubscriber(subscriber)}
                          >
                            <MaterialCommunityIcons
                              color={theme.colors.primary.yellow}
                              name="alpha-x-circle"
                              size={20}
                            />
                          </TouchableOpacity>
                        ) : null}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text>"Il n'y a pas de participants pour l'instant!"</Text>
              )}
            </HStack>
          </Stack>
          {publisherId != currentUserId ? (
            <Button
              onPress={() => {
                subscribEvent();
              }}
              mt="5"
              ml="1"
              mr="1"
              bg={theme.colors.primary.green}
            >
              S'INSCRIRE
            </Button>
          ) : (
            <Box>
              <Button
                m="3"
                bg={theme.colors.primary.green}
                onPress={() => {
                  navigation.navigate('Modification évenement', item);
                }}
              >
                MODIFIER
              </Button>
              <Button m="3" bg={theme.colors.primary.green}>
                SUPPRIMER
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default MoreInfoScreen;
