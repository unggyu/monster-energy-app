import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, StyleSheet, Dimensions, Animated, PanResponder, Easing } from 'react-native'

const { width, height } = Dimensions.get('screen')

const SwipeableItems = () => {
  const gestureAnimation = new Animated.Value(0)
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (ent, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      gestureAnimation.setValue(gestureState.dx)
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { moveX, vx } = gestureState
      if (moveX >= (width - 150) && vx > 0) {
        Animated.timing(gestureAnimation, {
          toValue: width,
          duration: 350,
          useNativeDriver: false,
          easing: Easing.elastic(1.8)
        }).start(() => {
          gestureAnimation.setValue(0)
          setIsCitraCanOnFront(!isCitraCanOnFront)
        })
      } else if (moveX <= 250 && vx < 0) {
        setSwipedLeft(true)
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
  const [isCitraCanOnFront, setIsCitraCanOnFront] = useState(true)
  const [swipedLeft, setSwipedLeft] = useState(false)

  useEffect(() => {
    Animated.timing(gestureAnimation, {
      toValue: width,
      duration: 6850,
      useNativeDriver: false,
      easing: Easing.elastic(2.4)
    }).start(() => {
      gestureAnimation.setValue(0)
      setIsCitraCanOnFront(!isCitraCanOnFront)
      setSwipedLeft(false)
    })
  }, [swipedLeft])

  const getFrontStyle = (animation: Animated.Value) => {
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

  const getBackStyle = (animation: Animated.Value) => {
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

  const frontStyle = getFrontStyle(gestureAnimation)
  const backStyle = getBackStyle(gestureAnimation)

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} style={styles.panContainer}>
        <Animated.Image
          source={require('../../assets/monster_energy_ultra_paradise_can.png')}
          style={[styles.image, { position: 'absolute', top: 120 }, !isCitraCanOnFront ? frontStyle : backStyle]}
          resizeMode={'contain'}
        />
        <Animated.Image
          source={require('../../assets/monster_energy_ultra_citra_can.png')}
          style={[styles.image, isCitraCanOnFront ? frontStyle : backStyle]}
          resizeMode={'contain'}
        />
      </View>
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
    zIndex: 10
  },
  image: {
    marginTop: 100,
    width: '55%',
    height: '60%'
  }
})

export default SwipeableItems