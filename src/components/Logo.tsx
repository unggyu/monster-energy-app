import React from 'react'
import { LogoProps } from 'monster-energy-app'
import { Animated, StyleSheet, View } from 'react-native'

const Logo = (props: LogoProps) => {
  const { drink } = props
  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        style={styles.logo}
        resizeMode={'contain'}
        source={drink.logo}>
      </Animated.Image>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    marginTop: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    // width: '60%',
    height: 100
  }
})

export default Logo