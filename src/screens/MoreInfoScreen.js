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
const MoreInfoScreen = () => {
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
          <Heading>Titre de la sortie</Heading>

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

          <Text>Description:</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Button mt="5" bg={theme.colors.primary.green}>
            S'INSCRIRE
          </Button>
        </Stack>
      </Box>
    </ScrollView>
  );
};

export default MoreInfoScreen;
