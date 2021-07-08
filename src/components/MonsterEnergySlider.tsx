import { Component } from 'react'
import { View, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

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
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.itemContainer}>
            <Animated.Image
              source={require('./assets/coke_regular_can.png')}
              resizeMode={'contain'}
              style={styles.item}
            />
          </View>
          <View style={styles.itemContainer}>
            <Animated.Image
              source={require('./assets/coke_regular_can.png')}
              resizeMode={'contain'}
              style={styles.item}
            />
          </View>
          <View style={styles.itemContainer}>
            <Animated.Image
              source={require('./assets/coke_regular_can.png')}
              resizeMode={'contain'}
              style={styles.item}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen'
  },
  itemContainer: {
    width,
    height,
    justifyCointent: 'center',
    alignItems: 'center'
  },
  item: {
    width: '70%',
    height: '55%'
  }
})

export default MonsterEnergySlider