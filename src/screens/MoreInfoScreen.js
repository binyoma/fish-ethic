import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Pressable,
  Button,
  AspectRatio,
  useTheme,
  IconButton,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
const MoreInfoScreen = props => {
  const item = props.route.params;

  const theme = useTheme();
  return (
    <ScrollView>
      <Box>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={require('../assets/fish2.jpg')}
              alt="peche"
              h="100%"
              resizeMode="cover"
            ></Image>
          </AspectRatio>
        </Box>
        <HStack justifyContent="center" mt="3">
          <Text mr="3">Pseudo</Text>
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
          <TouchableOpacity>
            <Text ml="1">Contacter le membre</Text>
          </TouchableOpacity>
        </HStack>
        <Stack mt="4">
          <Heading>{item.props.title}</Heading>
          <HStack
            bg={theme.colors.primary.green}
            mt="5"
            mb="5"
            justifyContent="space-around"
          >
            <Text>Date</Text>
            <Text>Heure</Text>
            <Text>Lieu</Text>
          </HStack>
          <HStack
            bg={theme.colors.primary.green}
            mt="5"
            mb="5"
            justifyContent="space-around"
          >
            <Text>
              Du{' '}
              {item?.props?.dateDebut &&
                dayjs(item.props.dateDebut?.toDate()).format('DD/MM/YYYY')}{' '}
              au{' '}
              {item?.props?.dateFin &&
                dayjs(item.props.dateFin?.toDate()).format('DD/MM/YYYY')}
            </Text>
            <Text>De </Text>
            <Text>{item?.props?.lieu}</Text>
          </HStack>

          <Text>Description: {item.props.description}</Text>

          <Button mt="5" bg={theme.colors.primary.green}>
            S'INSCRIRE
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default MoreInfoScreen;
