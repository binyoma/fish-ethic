import React from 'react';
import { Box, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default function CustomHeader() {
  return (
    <Box style={color = '#5bba6f'}>
      <Image
        source={require('./../assets/ic_logo.png')}
        alt="logo"
        size="55"
        resizeMode="contain"
      />
    </Box>
  );
}
