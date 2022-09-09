import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Input, VStack, Box, Icon, HStack, Select, CheckIcon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ResearchScreen = () => {
    const [searchBy, setSearchBy] = useState('');
  return (
    <Box
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
                  accessibilityLabel="Recherche par"
                  placeholder="Recherche par"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => setSearchBy(itemValue)}>
                  <Select.Item label="Poisson" value="Poisson" />
                  <Select.Item label="Lieux" value="Lieux" />
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
  );
};

export default ResearchScreen