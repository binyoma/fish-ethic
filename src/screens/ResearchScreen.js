import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  VStack,
  Box,
  Icon,
  HStack,
  Select,
  CheckIcon,
  Center,
  ScrollView,
  useTheme,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const ResearchScreen = () => {
  const [searchBy, setSearchBy] = useState('');
  const [fish, setFish] = useState();
  const [department, setDepartment] = useState();
  const [startMonth, setStartMonth] = useState();
  const [endMonth, setEndMonth] = useState();
  const theme = useTheme();
  return (
    <ScrollView>
      <Box>
        <VStack>
          <Box h="300">
            <View style={styles.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              ></MapView>
            </View>
          </Box>
        </VStack>

        <VStack mt="4">
          <Center>
            <Box maxW="300">
              <Text>Espèce de poisson</Text>
              <Select
                selectedValue={fish}
                minWidth="300"
                accessibilityLabel="Espèce de poisson"
                placeholder="Selectionnez une ou plusieurs espèce de poisson"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setFish(itemValue)}
              >
                <Select.Item label="Brochet" value="Brochet" />
                <Select.Item label="Ecrevisses" value="Ecrevisses" />
                <Select.Item label="Anguille bicolore" value="Anguille" />
                <Select.Item label="Truite fardée" value="Truite" />
                <Select.Item label="Anchois" value="Anchois" />
              </Select>
            </Box>
            <Box maxW="300" mt="3">
              <Text>Département</Text>
              <Select
                selectedValue={department}
                minWidth="300"
                accessibilityLabel="Sélectionnez un départment"
                placeholder="Sélectionnez un départment"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setDepartment(itemValue)}
              >
                <Select.Item label="O1- Ain" value="ux" />
                <Select.Item label="02- Aisne" value="web" />
                <Select.Item label="03- Allier" value="cross" />
                <Select.Item label="04- Alpes de hautes provence" value="ui" />
                <Select.Item label="05- Hautes alpes" value="backend" />
              </Select>
            </Box>
            <Box maxW="300" mt="3">
              <Text>Mois de début de pêche</Text>
              <Select
                selectedValue={startMonth}
                minWidth="300"
                accessibilityLabel="Mois de début"
                placeholder="Mois de début"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setStartMonth(itemValue)}
              >
                <Select.Item label="Janvier" value="Janvier" />
                <Select.Item label="Février" value="Février" />
                <Select.Item label="Mars" value="Mars" />
                <Select.Item label="Avril" value="Avril" />
                <Select.Item label="Mai" value="Mai" />
                <Select.Item label="Juin" value="Juin" />
                <Select.Item label="Juillet" value="Juillet" />
                <Select.Item label="Aout" value="Aout" />
                <Select.Item label="Septembre" value="Septembre" />
                <Select.Item label="Octobre" value="Octobre" />
                <Select.Item label="Novembre" value="Novembre" />
                <Select.Item label="Décembre" value="Décembre" />
              </Select>
            </Box>
            <Box maxW="300" mt="3">
              <Text>Mois de fin de pêche</Text>
              <Select
                selectedValue={endMonth}
                minWidth="300"
                accessibilityLabel="Mois de fin"
                placeholder="Mois de fin"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setEndMonth(itemValue)}
              >
                <Select.Item label="Janvier" value="Janvier" />
                <Select.Item label="Février" value="Février" />
                <Select.Item label="Mars" value="Mars" />
                <Select.Item label="Avril" value="Avril" />
                <Select.Item label="Mai" value="Mai" />
                <Select.Item label="Juin" value="Juin" />
                <Select.Item label="Juillet" value="Juillet" />
                <Select.Item label="Aout" value="Aout" />
                <Select.Item label="Septembre" value="Septembre" />
                <Select.Item label="Octobre" value="Octobre" />
                <Select.Item label="Novembre" value="Novembre" />
                <Select.Item label="Décembre" value="Décembre" />
              </Select>
            </Box>
          </Center>
          <Center m="3">
            <Button
              title="Afficher les stations"
              color={theme.colors.primary.green}
            ></Button>
          </Center>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ResearchScreen;
