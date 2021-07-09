import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrinkSlider } from './src/components'

export default function App() {
  return (
    <View style={styles.container}>
      <DrinkSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
