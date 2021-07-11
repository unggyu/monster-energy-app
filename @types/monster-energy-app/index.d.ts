import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { Animated } from 'react-native'

declare module 'monster-energy-app' {
  export type AppState = {
    isReady: boolean
  }

  export interface Drink {
    background: any
    item_image: any
    logo: any
  }
  export type DrinkTuple = {
    item1: Drink
    item2: Drink
  }

  export type DrinkSliderProps = {
    navigation: DrinkScreenNavigationProp
  }
  export type DrinkSliderState = {
    initialAnimationFinished: boolean
  }

  export type DrinkScreenProps = StackScreenProps<RootStackParamList, 'Home'>
  export type SwipeableScreenProps = StackScreenProps<RootStackParamList, 'Swipeable'>
  export type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>

  export type GoBackable = {
    goBack: DrinkScreenProps['navigation']['goBack']
  }

  export interface DrinkBackgroundsProps {
    scrollAnimation: Animated.Value
    initialAnimation: Animated.Value
    initialAnimationFinished: boolean
    drinks: Drink[]
  }

  export interface DrinksProps {
    scrollAnimation: Animated.Value
    initialAnimation: Animated.Value
    drinks: Drink[]
    navigateTo(index: number): void
  }

  export interface LogoProps {
    scrollAnimation: Animated.Value
    initialAnimation: Animated.Value
    initialAnimationFinished: boolean
    index: number
    drink: Drink
  }

  export type SwipeableDrinksProps = DrinkTuple & GoBackable
  export type SwipeableDrinksState = {
    isFirstCanOnFront: boolean,
    swipedLeft: boolean,
    backgroundAnimationValue: 0 | 1,
    initialAnimationFinished: boolean
  }

  export type SwipeableDrinksBackgroundProps = DrinkTuple & {
    animation: Animated.Value
  }

  export interface AnimateStyle {
    transform: (
      { translateX: Animated.AnimatedInterpoation } |
      { rotate: Animated.AnimatedInterpolation | string } |
      { scale: Animated.AnimatedInterpolation | number }
    )[];
    zIndex?: Animated.AnimatedInterpolation
  }

  export type DetailsProps = GoBackable & {
    background: any
    logo: any
  }

  export type TextContainerProps = GoBackable & {
    animations: Animated.Value[]
  }

  export type RootStackParamList = {
    Home: undefined
    Details: DetailsProps
    Swipeable: SwipeableDrinksProps
  }
}