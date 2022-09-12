import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  Input,
  VStack,
  Box,
  Icon,
  HStack,
  Select,
  CheckIcon
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    height:"100%",
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const ResearchScreen = () => {
  const [searchBy, setSearchBy] = useState('');

  return (
    <VStack >
      <Box h="5/6">
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} 
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
        </View>
      </Box>
      <Box h="1/6"
        _dark={{
          bg: 'black',
        }}
        _light={{
          backgroundColor: 'green.700',
        }}>
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            InputRightElement={
              <HStack>
                <Box maxW="300">
                  <Select
                    selectedValue={searchBy}
                    minWidth="100"
                    height="55"
                    accessibilityLabel="Recherche par"
                    placeholder="Recherche par"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={itemValue => setSearchBy(itemValue)}>
                    <Select.Item label="Poisson" value="Poisson" />
                    <Select.Item label="Lieux" value="Lieu" />
                  </Select>
                </Box>
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              </HStack>
            }
          />
        </VStack>
      </Box>
    </VStack>
  );
};

export default ResearchScreen;
