import React from 'react'
import { View, StyleSheet,  Animated, Dimensions, ImageBackground } from 'react-native'
import { Drink, DrinkBackgroundsProps, DrinksProps, LogoProps } from 'monster-energy-app'

const { width, height } = Dimensions.get('screen')
const BackgroundImage = Animated.createAnimatedComponent(ImageBackground)

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
  },
  {
    background: require('../../assets/monster_energy_ultra_background.png'),
    item_image: require('../../assets/monster_energy_ultra_can.png'),
    logo: require('../../assets/monster_energy_ultra_logo.png')
  }
]

const DrinkSlider = () => {
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
            <Logo index={index} drink={item} scrollAnimation={scrollAnimation} />
          </BackgroundImage>
        )
      })}
    </View>
  )
}

const Drinks = (props: DrinksProps) => {
  const { scrollAnimation, drinks } = props
  return (
    <>
      {drinks.map((item, index) => {
        const inputRange = index === 0 ?
          [0, width] :
          [
            width * (index - 1),
            width * index,
            width * (index + 1)
          ]
        const outputRange = index === 0 ?
          ['0deg', '20deg'] :
          ['-20deg', '0deg', '20deg']
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

const Logo = ({ index, drink, scrollAnimation }: LogoProps) => {
  const scale = scrollAnimation.interpolate({
    inputRange: index === 0 ?
      [0, width] :
      [
        width * (index - 1),
        width * index,
        width * (index + 1)
      ],
    outputRange: index === 0 ? [1, 0] : [0, 1, 0],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.logoContainer}>
      <Animated.Image
        style={[styles.logo, { transform: [{ scale }] }]}
        resizeMode={'contain'}
        source={drink.logo}>
      </Animated.Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  itemContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: '70%',
    height: '55%'
  },
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
  },
  logoContainer: {
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '60%',
    height: 100
  }
})

export default DrinkSlider