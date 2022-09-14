import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Text,
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Pressable,
  Center,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
// react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// firebase
import storage from '@react-native-firebase/storage';
const getUrl=async ref=>{
  return await ref.getDownloadURL();
}

const Card = props => {
  const [photoUrl, setPhotoUrl]=useState('');
  const item = props;

  const navigation = useNavigation();
  

  return (
    
      <Pressable
        onPress={() => navigation.navigate('MoreInfo', item)}
        margin="0.5"
      >
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
                {/* { item?.props?.url ??
                <Image
                  h="100%"
                  source={{uri:item?.props?.url }}
                  alt="image"
                /> } */}
                
              </AspectRatio>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {item?.props?.title}
                </Heading>
              </Stack>
              <Stack>
                <Text fontWeight="400">{item?.props?.description}</Text>
              <Text>Lieu: {item?.props?.place}</Text>
                <Text>
                  posté le:
                  {item?.props?.createdAt &&
                    dayjs(item.props.createdAt?.toDate()).format('DD/MM/YYYY')}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Pressable>
      
  );
};

export default Card;

const styles = StyleSheet.create({});
