import { Animated } from 'react-native'

declare module 'monster-energy-app' {
  export interface DrinkSliderProps { }

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
}