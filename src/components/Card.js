import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Text,
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Card = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('MoreInfo')}>
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="2"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                h="100%"
                source={require('../assets/fish1.jpg')}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Carpe en Somme
              </Heading>
              <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                The Silicon Valley of India.
              </Text>
            </Stack>
            <Text fontWeight="400">
              Bengaluru (also called Bangalore) is the center of India's
              high-tech industry. The city is also known for its parks and
              nightlife.
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text fontWeight="400">6 mins ago</Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({});
