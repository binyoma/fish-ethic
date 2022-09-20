import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getStations} from '../services/HubEauApiCall';

/**
 * Google firebase
 */

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


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
  const [selectedFish, setSelectedFish] = useState('');
  const [department, setDepartment] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [stations, setStations] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [AllFish, setAllFish] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(false);
  const [selectedFishData, setSelectedFishData] = useState([]);

  const theme = useTheme();
  const allFish=[];

  const searchStation = () => {
    setWarning(false)
    getStations(selectedFish, department, startMonth, endMonth).then(data => {
      firestore()
      .collection('fish').doc(selectedFish)
      .get()
      .then((doc)=>{
        setSelectedFishData(doc.data());
        if (selectedFishData.menace) {
          setWarning(true)
        }
      }
        
      )

      const stat =[];
      setStations(data);
      if(stations.length!= 0){
        stations.features.forEach(station => {
          stat.push({
            title: station.properties.localisation,
            coordinates: {
              latitude: station.properties.y,
              longitude: station.properties.x,
            }
          });
        });
        setMarkers(stat)
      }
      
    });
  };
  useEffect(() => {
    firestore()
      .collection('fish')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data= {};
          data={
            id: doc.id,
            menace: doc.data().menace,
            name: doc.data().name,
          }
          allFish.push(data);
        });
        setAllFish(allFish)
      })
      .then(
        firestore()
          .collection('department_code')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              departments.push(doc.data());
            });
            setLoading(false);
          })
          
      )
      .catch(error => {
        console.log('Error getting documents: ', error.message);
      });
  
  }, []);
  return loading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <Box>
        <VStack>
          <Box h="500">
            <View style={styles.container}>
              <MapView provider={PROVIDER_GOOGLE} style={styles.map}>
                {markers.map((marker, index) => {
                  return (
                    <Marker
                      onPress={()=>{console.log(marker.description)}}
                      key={index}
                      coordinate={marker.coordinates}
                      title={marker.title}
                      description={marker.description}
                    >
                    </Marker>
                  );
                })}
              </MapView>
            </View>
          </Box>
        </VStack>
        {warning?<VStack backgroundColor={'#ffca3a'}><Text>{selectedFishData.name} est {selectedFishData.menace}</Text></VStack>:''}
        
        <VStack mt="4">
          <Center>
            <Box maxW="300">
              <Text>Espèce de poisson</Text>
              <Select
                selectedValue={selectedFish}
                minWidth="300"
                accessibilityLabel="Espèce de poisson"
                placeholder="Selectionnez une ou plusieurs espèce de poisson"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={itemValue => setSelectedFish(itemValue)}>
                {AllFish.map((fish, index) => {
                  return (
                    <Select.Item
                      key={index}
                      label={fish.name}
                      value={fish.id}
                    />
                  );
                })}
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
                onValueChange={itemValue => setDepartment(itemValue)}>
                  <Select.Item label="" value="" />
                {departments.map((dept, index) => {
                  return (<Select.Item  key={index} label={dept.name} value={dept.code} />);
                })}
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
                onValueChange={itemValue => setStartMonth(itemValue)}>
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
                onValueChange={itemValue => setEndMonth(itemValue)}>
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
              onPress={() => searchStation()}
            />
          </Center>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ResearchScreen;
