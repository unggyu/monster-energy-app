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

  export interface DrinkBackgroundsProps {
    scrollAnimation: Animated.Value
    drinks: Drink[]
  }

  export interface DrinksProps {
    scrollAnimation: Animated.Value
    drinks: Drink[]
  }

  export interface LogoProps {
    index: number
    drink: Drink
    scrollAnimation: Animated.Value
  }

  export interface SwipeableItemsProps {

  }

  export interface SwipeableItemsBackgroundProps {
    animation: Animated.Value
  }

  export interface SwipeableItemsState {
    isCitraCanOnFront: boolean,
    swipedLeft: boolean,
    backgroundAnimationValue: 0 | 1,
    initialAnimationFinished: boolean
  }

  export interface AnimateStyle {
    transform: (
      { translateX: Animated.AnimatedInterpoation } |
      { rotate: Animated.AnimatedInterpolation | string } |
      { scale: Animated.AnimatedInterpolation | number }
    )[];
    zIndex?: Animated.AnimatedInterpolation
  }

  export interface GoBackable {
    goBack(): void
  }

  export type DetailsProps = GoBackable & RootStackParamList['Details']

  export type TextContainerProps = GoBackable & {
    animations: Animated.Value[]
  }

  export type RootStackParamList = {
    Home: undefined
    Details: {
      background: any
      logo: any
    }
    Swipeable: undefined
  }
}