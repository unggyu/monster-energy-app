import React from 'react'
import { LogoProps } from 'monster-energy-app'
import { Animated, Image, StyleSheet, View, ImageSourcePropType, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

const Logo = ({ index, drink, scrollAnimation }: LogoProps) => {
  // Auto scale image height with React Native: https://stackoverflow.com/questions/42170127/auto-scale-image-height-with-react-native
  const scaleHeight = (source: ImageSourcePropType, desiredWidth: number) => {
    const { width, height } = Image.resolveAssetSource(source)
    return desiredWidth / width * height
  }
  const imageWidth = width * 0.6
  const imageHeight = scaleHeight(drink.logo, imageWidth)
  const scale = scrollAnimation.interpolate({
    inputRange: index === 0 ? [0, width] : [width * (index - 1), width * index, width * (index + 1)],
    outputRange: index === 0 ? [1, 0] : [0, 1, 0],
    extrapolate: 'clamp'
  })
  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: [{ scale }]
        }}
        resizeMode={'contain'}
        source={drink.logo}>
      </Animated.Image>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // logo: {
  //   width: '60%'
  // }
})

export default Logo