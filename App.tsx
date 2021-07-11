import React, { Component } from 'react'
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppState, RootStackParamList } from 'monster-energy-app'
import { DetailsScreen, DrinkScreen, SwipeableScreen } from './src/screens'

const Stack = createStackNavigator<RootStackParamList>()

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isReady: false
    }
  }

  async _cacheResourcesAsync() {
    const images = [
      require('./assets/monster_energy_background.png'),
      require('./assets/monster_energy_can.png'),
      require('./assets/monster_energy_logo.png'),
      require('./assets/monster_energy_mango_loco_background.png'),
      require('./assets/monster_energy_mango_loco_can.png'),
      require('./assets/monster_energy_mango_loco_logo.png'),
      require('./assets/monster_energy_pipeline_punch_background.png'),
      require('./assets/monster_energy_pipeline_punch_can.png'),
      require('./assets/monster_energy_pipeline_punch_logo.png'),
      require('./assets/monster_energy_ultra_background.png'),
      require('./assets/monster_energy_ultra_can.png'),
      require('./assets/monster_energy_ultra_logo.png'),
      require('./assets/monster_energy_ultra_paradise_background.png'),
      require('./assets/monster_energy_ultra_paradise_can.png'),
      require('./assets/monster_energy_ultra_paradise_logo.png'),
      require('./assets/monster_energy_ultra_citra_background.png'),
      require('./assets/monster_energy_ultra_citra_can.png')
    ]

    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync())
    await Promise.all(cacheImages)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false
          }}
        >
          <Stack.Screen name="Home" component={DrinkScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Swipeable" component={SwipeableScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
