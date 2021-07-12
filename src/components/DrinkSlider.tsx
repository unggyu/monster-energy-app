import React, { Component } from 'react'
import { View, StyleSheet,  Animated, Dimensions, ImageBackground, TouchableWithoutFeedback, Easing } from 'react-native'
import { Drink, DrinkBackgroundsProps, DrinkSliderProps, DrinkSliderState, DrinksProps, LogoProps, DrinkTuple } from 'monster-energy-app'

const { width, height } = Dimensions.get('screen')
const BackgroundImage = Animated.createAnimatedComponent(ImageBackground)

class DrinkSlider extends Component<DrinkSliderProps, DrinkSliderState> {
  scrollAnimation: Animated.Value
  initialAnimation: Animated.Value

  constructor(props: DrinkSliderProps) {
    super(props)
    this.state = {
      initialAnimationFinished: false
    }
    this.scrollAnimation = new Animated.Value(0)
    this.initialAnimation = new Animated.Value(0)
    this.navigateTo = this.navigateTo.bind(this)
  }

  componentDidMount() {
    Animated.timing(this.initialAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(2.4),
      useNativeDriver: true
    }).start(() => {
      this.setState({
        initialAnimationFinished: true
      })
    })
  }

  navigateTo(index: number) {
    const {
      drinks,
      navigation : { navigate }
    } = this.props
    const swipeableIdx = 4
    if (index === swipeableIdx) {
      const drinkTuple: DrinkTuple = {
        item1: drinks[swipeableIdx],
        item2: drinks[drinks.length - 1]
      }
      navigate('Swipeable', drinkTuple)
    } else {
      navigate('Details', {
        background: drinks[index].background,
        logo: drinks[index].logo
      })
    }
  }

  render() {
    const { scrollAnimation, initialAnimation } = this
    const { initialAnimationFinished } = this.state
    let { drinks } = this.props
    drinks = drinks.slice(0, drinks.length - 1)

    return (
      <View style={styles.container}>
        <DrinkBackgrounds
          scrollAnimation={scrollAnimation}
          initialAnimation={initialAnimation}
          initialAnimationFinished={initialAnimationFinished}
          drinks={drinks}
        />
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ zIndex: drinks.length + 1}}
          onScroll={Animated.event([{
            nativeEvent: {
              contentOffset: {
                x: scrollAnimation
              }
            }
          }],
          { useNativeDriver: true })}
        >
        <Drinks
          scrollAnimation={scrollAnimation}
          initialAnimation={initialAnimation}
          navigateTo={this.navigateTo}
          drinks={drinks}
        />
        </Animated.ScrollView>
      </View>
    )
  }
}

const DrinkBackgrounds = (props: DrinkBackgroundsProps) => {
  const {
    scrollAnimation,
    drinks,
    initialAnimation,
    initialAnimationFinished
  } = props

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
            key={`item-${index}`}
            style={[styles.bg, { zIndex: -index, opacity }]}
            resizeMode={'cover'}
            source={item.background}
          >
            <Logo
              index={index}
              drink={item}
              scrollAnimation={scrollAnimation}
              initialAnimation={initialAnimation}
              initialAnimationFinished={initialAnimationFinished}
            />
          </BackgroundImage>
        )
      })}
    </View>
  )
}

const Drinks = ({
  scrollAnimation,
  initialAnimation,
  drinks,
  navigateTo
}: DrinksProps) => {
  const translateY = initialAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  })
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
          ['0deg', '-20deg'] :
          ['20deg', '0deg', '-20deg']
        const rotate = scrollAnimation.interpolate({
          inputRange,
          outputRange,
          extrapolate: 'clamp'
        })

        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigateTo(index)}
          >
            <View key={index} style={styles.itemContainer}>
              <Animated.Image
                source={item.item_image}
                resizeMode={'contain'}
                style={[styles.item, { transform: [{ rotate }]}]}
              />
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </>
  )
}

const Logo = ({
  index,
  drink,
  scrollAnimation,
  initialAnimation,
  initialAnimationFinished
}: LogoProps) => {
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
        style={[styles.logo, {
          transform: [{
            scale: index === 0 && !initialAnimationFinished ?
              initialAnimation : scale
          }]
        }]}
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