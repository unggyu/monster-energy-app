import React, { Component } from 'react'
import { AnimateStyle, SwipeableItemsBackgroundProps, SwipeableItemsProps, SwipeableItemsState } from 'monster-energy-app'
import { View, StyleSheet, Dimensions, Animated, PanResponder, Easing, ImageBackground, PanResponderInstance } from 'react-native'

const { width, height } = Dimensions.get('screen')
const BackgroundImage = Animated.createAnimatedComponent(ImageBackground)

class SwipeableItems extends Component<SwipeableItemsProps, SwipeableItemsState> {
  gestureAnimation: Animated.Value
  backgroundAnimation: Animated.Value
  initialAnimation: Animated.Value
  panResponder: PanResponderInstance

  constructor(props: SwipeableItemsProps) {
    super(props)
    this.state = {
      isCitraCanOnFront: true,
      swipedLeft: false,
      backgroundAnimationValue: 1,
      initialAnimationFinished: false
    }
    this.gestureAnimation = new Animated.Value(0)
    this.backgroundAnimation = new Animated.Value(1)
    this.initialAnimation = new Animated.Value(0)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (ent, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.gestureAnimation.setValue(gestureState.dx)
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { moveX, vx } = gestureState
        const {
          gestureAnimation,
          backgroundAnimation
        } = this
        const backgroundAnimationValue = this.state.backgroundAnimationValue === 1 ? 0 : 1
        if (moveX >= (width - 150) && vx > 0) {
          Animated.parallel([
            Animated.timing(gestureAnimation, {
              toValue: width,
              duration: 350,
              useNativeDriver: false,
              easing: Easing.elastic(1.8)
            }),
            Animated.timing(backgroundAnimation, {
              toValue: backgroundAnimationValue,
              duration: 350,
              useNativeDriver: true,
              easing: Easing.linear
            })
          ]).start(() => {
            gestureAnimation.setValue(0)
            this.setState({
              isCitraCanOnFront: !this.state.isCitraCanOnFront,
              backgroundAnimationValue
            })
          })
        } else if (moveX <= 250 && vx < 0) {
          this.setState({ swipedLeft: true }, () => {
            if (this.state.swipedLeft) {
              Animated.parallel([
                Animated.timing(gestureAnimation, {
                  toValue: width,
                  duration: 500,
                  useNativeDriver: false,
                  easing: Easing.elastic(1.9)
                }),
                Animated.timing(backgroundAnimation, {
                  toValue: backgroundAnimationValue,
                  duration: 350,
                  useNativeDriver: true,
                  easing: Easing.linear
                })
              ]).start(() => {
                gestureAnimation.setValue(0)
                this.setState({
                  isCitraCanOnFront: !this.state.isCitraCanOnFront,
                  swipedLeft: false,
                  backgroundAnimationValue
                })
              })
            }
          })
        } else {
          Animated.timing(gestureAnimation, {
            toValue: 0,
            duration: 300,
            easing: Easing.elastic(1.9),
            useNativeDriver: false
          }).start()
        }
      }
    })
    this.getFrontStyle = this.getFrontStyle.bind(this)
    this.getBackStyle = this.getBackStyle.bind(this)
  }

  componentDidMount() {
    Animated.timing(this.initialAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(2.3),
      useNativeDriver: true
    }).start(() => {
      this.setState({
        initialAnimationFinished: true
      })
    })
  }

  getFrontStyle(animation: Animated.Value): AnimateStyle {
    const {
      swipedLeft
    } = this.state

    const translateX = animation.interpolate({
      inputRange: [-width, 0, width / 2, width],
      outputRange: [-120, 0, 90, 50],
      extrapolate: 'clamp'
    })
    const scale = animation.interpolate({
      inputRange: [0, width],
      outputRange: [1, 0.8],
      extrapolate: 'clamp'
    })
    const rotate = animation.interpolate({
      inputRange: [-width, 0, width],
      outputRange: ['-9deg', '0deg', '13deg'],
      extrapolate: 'clamp'
    })
    const zIndex = animation.interpolate({
      inputRange: [-width, 0, width],
      outputRange: !swipedLeft ? [2, 2, 0] : [0, 0, 0]
    })

    return {
      transform: [
        { translateX },
        { rotate },
        { scale }
      ],
      zIndex,
      // elevation: zIndex
    }
  }

  getBackStyle(animation: Animated.Value): AnimateStyle {
    const {
      swipedLeft
    } = this.state

    const translateX = animation.interpolate({
      inputRange: [-width, 0, width],
      outputRange: [80, 50, 0],
      extrapolate: 'clamp'
    })
    const scale = animation.interpolate({
      inputRange: [0, width],
      outputRange: [0.8, 1],
      extrapolate: 'clamp'
    })
    const rotate = animation.interpolate({
      inputRange: [0, width],
      outputRange: ['13deg', '0deg'],
      extrapolate: 'clamp'
    })
    const zIndex = animation.interpolate({
      inputRange: [-width, 0, width],
      outputRange: !swipedLeft ? [0, 0, 2] : [2, 2, 2]
    })

    return {
      transform: [
        { translateX },
        { rotate },
        { scale }
      ],
      zIndex,
      // elevation: zIndex
    }
  }

  render() {
    const {
      initialAnimation,
      panResponder,
      gestureAnimation,
      backgroundAnimation,
      getFrontStyle,
      getBackStyle
    } = this
    const {
      isCitraCanOnFront,
      initialAnimationFinished
    } = this.state

    const translateX = initialAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0]
    })
    const _translateX = initialAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 50]
    })
    const initialFrontStyling = {
      transform: [
        { translateX }
      ]
    }
    const initialBackStyling = {
      transform: [
        { translateX: _translateX },
        { rotate: '13deg' },
        { scale: 0.8 }
      ]
    }

    let frontStyle = isCitraCanOnFront ? getFrontStyle(gestureAnimation) : getBackStyle(gestureAnimation)
    frontStyle = initialAnimationFinished ? frontStyle : initialFrontStyling
    let backStyle = !isCitraCanOnFront ? getFrontStyle(gestureAnimation) : getBackStyle(gestureAnimation)
    backStyle = initialAnimationFinished ? backStyle : initialBackStyling

    return (
      <View style={styles.container}>
        <Background animation={backgroundAnimation} />
        <View {...panResponder.panHandlers} style={styles.panContainer}>
          <Animated.Image
            source={require('../../assets/monster_energy_ultra_paradise_can.png')}
            style={[styles.image, { position: 'absolute', top: 120 }, backStyle]}
            resizeMode={'contain'}
          />
          <Animated.Image
            source={require('../../assets/monster_energy_ultra_citra_can.png')}
            style={[styles.image, frontStyle]}
            resizeMode={'contain'}
          />
        </View>
      </View>
    )
  }
}

const Background = ({ animation }: SwipeableItemsBackgroundProps) => {
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })
  return (
    <View style={styles.bgContainer}>
      <BackgroundImage
        style={[styles.bg]}
        resizeMode={'cover'}
        source={require('../../assets/monster_energy_ultra_paradise_background.png')}
      >
        <View style={styles.logoContainer}>
          <Animated.Image
            style={[styles.logo, {
              transform: [{ scale }]
            }]}
            resizeMode={'contain'}
            source={require('../../assets/monster_energy_ultra_paradise_logo.png')}
          />
       </View>
      </BackgroundImage>
      <BackgroundImage
        style={[styles.bg, { opacity: animation }]}
        resizeMode={'cover'}
        source={require('../../assets/monster_energy_ultra_citra_background.png')}
      >
        <View style={styles.logoContainer}>
          <Animated.Image
            style={[styles.logo, {
              transform: [{
                scale: animation
              }]
            }]}
            resizeMode={'contain'}
            source={require('../../assets/monster_energy_ultra_logo.png')}
          />
        </View>
      </BackgroundImage>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen'
  },
  panContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  image: {
    marginTop: 100,
    width: '55%',
    height: '60%'
  },
  bgContainer: {
    position: 'absolute',
    width,
    height,
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: 90,
  }
})

export default SwipeableItems