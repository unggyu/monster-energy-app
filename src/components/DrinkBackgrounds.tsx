import React from 'react'
import { Animated, Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import { DrinkBackgroundsProps } from 'monster-energy-app'
import Logo from './Logo'

const { width, height } = Dimensions.get('screen')
const BackgroundImage = Animated.createAnimatedComponent(ImageBackground)

const DrinkBackgrounds = (props: DrinkBackgroundsProps) => {
  const { scrollAnimation, drinks } = props
  return (
    <View style={styles.bgContainer}>
      {drinks.map((item, index) => {
        const opacity = scrollAnimation.interpolate({
          inputRange: [width * index, width * (index + 1)],
          outputRange: [1, 0],
          extrapolate: 'clamp'
        })
        return (
          <BackgroundImage
            key={index}
            style={[styles.bg, { zIndex: -index, opacity }]}
            resizeMode={'cover'}
            source={item.background}
          >
            <Logo drink={item} />
          </BackgroundImage>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    width,
    height
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

export default DrinkBackgrounds