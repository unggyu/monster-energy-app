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

  export type DrinkSliderProps = {
    navigation: DrinkScreenNavigationProp
  }

  export type DrinkSliderState = {
    initialAnimationFinished: boolean
  }

  export type DrinkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

  export type DrinkScreenProps = {
    navigation: DrinkScreenNavigationProp
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