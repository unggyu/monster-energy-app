import React from 'react';
import { StyleSheet, View } from 'react-native'
import { SwipeableItems } from './src/components'


export default function App() {
  return (
    <View style={styles.container}>
      <SwipeableItems />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
