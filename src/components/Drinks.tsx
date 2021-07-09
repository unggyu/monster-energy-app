import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { DrinksProps } from 'monster-energy-app'

const { width, height } = Dimensions.get('screen')

const Drinks = (props: DrinksProps) => {
  const { scrollAnimation, drinks } = props
  return (
    <>
      {drinks.map((item, index) => {
        const inputRange = index === 0 ? [0, width] : [width * (index - 1), width * index, width * (index + 1)]
        const outputRange = index === 0 ? ['0deg', '20deg'] : ['-20deg', '0deg', '20deg']
        const rotate = scrollAnimation.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp'
        })
        return (
          <View key={index} style={styles.itemContainer}>
            <Animated.Image
              source={item.item_image}
              resizeMode={'contain'}
              style={[styles.item, { transform: [{ rotate }]}]}
            />
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: '70%',
    height: '55%'
  }
})

export default Drinks