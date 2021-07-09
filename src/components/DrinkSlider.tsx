import React from 'react'
import { View, StyleSheet,  Animated } from 'react-native'
import { Drink, DrinkSliderProps } from 'monster-energy-app'
import DrinkBackgrounds from './DrinkBackgrounds'
import Drinks from './Drinks'

const drinks: Drink[] = [
  {
    background: require('../../assets/monster_energy_background.png'),
    item_image: require('../../assets/monster_energy_can.png'),
    logo: require('../../assets/monster_energy_logo.png')
  },
  {
    background: require('../../assets/monster_energy_pipeline_punch_background.png'),
    item_image: require('../../assets/monster_energy_pipeline_punch_can.png'),
    logo: require('../../assets/monster_energy_pipeline_punch_logo.png')
  },
  {
    background: require('../../assets/monster_energy_mango_loco_background.png'),
    item_image: require('../../assets/monster_energy_mango_loco_can.png'),
    logo: require('../../assets/monster_energy_mango_loco_logo.png')
  }
]

const DrinkSlider = (props: DrinkSliderProps) => {
  const scrollAnimation = new Animated.Value(0)
  return (
    <View style={styles.container}>
      <DrinkBackgrounds scrollAnimation={scrollAnimation} drinks={drinks} />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              x: scrollAnimation
            }
          }
        }],
        { useNativeDriver: false })}
      >
      <Drinks scrollAnimation={scrollAnimation} drinks={drinks} />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

export default DrinkSlider