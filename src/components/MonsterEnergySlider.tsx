import React, { Component } from 'react'
import { View, StyleSheet, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

interface DrinkItem {
  background: any
  item_image: any
  logo: any
}

const items: Array<DrinkItem> = [
  {
    background: {},//require('../../assets/background_lightgreen.png'),
    item_image: require('../../assets/monster_energy_can.png'),
    logo: require('../../assets/monster_energy_logo.png')
  },
  {
    background: {},//require('../../assets/background_pink.png'),
    item_image: require('../../assets/monster_energy_pipeline_punch_can.png'),
    logo: require('../../assets/monster_energy_pipeline_punch_logo.png')
  },
  {
    background: {},//require('../../assets/background_orange.png'),
    item_image: require('../../assets/monster_energy_mango_loco_can.png'),
    logo: require('../../assets/monster_energy_mango_loco_logo.png')
  }
]

interface Props {

}

class MonsterEnergySlider extends Component<Props> {
  scrollAnimation: Animated.Value

  constructor(props: Props) {
    super(props)
    this.state = { }
    this.scrollAnimation = new Animated.Value(0)
  }

  render() {
    const { scrollAnimation } = this
    const rotate_1 = scrollAnimation.interpolate({
      inputRange: [0, width],
      outputRange: ['0deg', '20deg'],
      extrapolate: 'clamp'
    })
    const rotate_2 = scrollAnimation.interpolate({
      inputRange: [0, width, width * 2],
      outputRange: ['-20deg', '0deg', '20deg'],
      extrapolate: 'clamp'
    })
    const rotate_3 = scrollAnimation.interpolate({
      inputRange: [width, width * 2, width * 3],
      outputRange: ['-20deg', '0deg', '20deg'],
      extrapolate: 'clamp'
    })
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                x: this.scrollAnimation
              }
            }
          }],
          { useNativeDriver: true })}
        >
        <Items scrollAnimation={scrollAnimation} items={items} />
        </Animated.ScrollView>
      </View>
    )
  }
}

const Items = (props) => {
  const { scrollAnimation, items } = props
  return (
    <>
      {items.map((item, index) => {
        const inputRange = index === 0 ? [0, width] : [width * (index - 1), width * index, width * (index + 1)]
        const outputRange = index === 0 ? ['0deg', '20deg'] : ['-20deg', '0deg', '20deg']
        const rotate = scrollAnimation.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp'
        })
        return (
          <View style={styles.itemContainer}>
            <Animated.Image
              source={require('../../assets/monster_energy_can.png')}
              resizeMode={'contain'}
              style={[ styles.item, { transform: [{ rotate: rotate }]}]}
            />
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen'
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
  }
})

export default MonsterEnergySlider