import React, {useEffect, useState} from 'react';
// NATIVE BASE
import {Box, Center, Text, Avatar, ScrollView, Stack, Link} from 'native-base';
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
  console.log(props.route.params, 'hello');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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

  return loading ? (
    <ActivityIndicator />
  ) : (
    <Center flex={'1'} bgColor="warmGray.5">
      <ScrollView w="full">
        <Box w="95%" mx="auto" px="1">
          <Box alignItems="center">
            <Avatar
              bg="green.500"
              mt="5"
              size="2xl"
              source={{uri: user?.image}}
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
            <Text>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do”{' '}
            </Text>

            <Divider my={2} mt="5" />

            {/* ajouter icon email */}
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
  );
};

export default ProfilUsersScreen;
