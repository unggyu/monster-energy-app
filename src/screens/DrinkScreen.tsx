import React from 'react'
import { Drink, DrinkScreenProps } from 'monster-energy-app'
import { DrinkSlider } from '../components'

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
  },
  {
    background: require('../../assets/monster_energy_ultra_citra_background.png'),
    item_image: require('../../assets/monster_energy_ultra_citra_can.png'),
    logo: require('../../assets/monster_energy_ultra_logo.png')
  },
  {
    background: require('../../assets/monster_energy_ultra_paradise_background.png'),
    item_image: require('../../assets/monster_energy_ultra_paradise_can.png'),
    logo: require('../../assets/monster_energy_ultra_paradise_logo.png')
  }
]

const DrinkScreen = ({ navigation }: DrinkScreenProps) => (
  <DrinkSlider navigation={navigation} drinks={drinks} />
)

export default DrinkScreen