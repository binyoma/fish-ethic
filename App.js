import { View, Text } from 'react-native'
import React from 'react'
import { NativeBaseProvider,Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './src/navigation/TabNavigation'

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <TabNavigation/>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App