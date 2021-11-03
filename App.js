import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Button, StatusBar, StyleSheet, View } from 'react-native';
import RestaurantsScreen from './src/features/restaurants/screens/Restaurants.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context';
import { LocationContextProvider } from './src/services/location/location.context';
import Torch from 'react-native-torch';

const Tab = createBottomTabNavigator();

const TABS = {
  home: 'restaurant-outline',
  map: 'md-map',
  settings: 'settings-outline'
}


export default function App() {

  const screenOptions = ({ route }) => {
    const iconName = TABS[route.name]
    return {
      tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'grey'
    }
  }

  const mapCmp = () => {
    return (
      <View>
        <Button title='press me' onPress={() => Torch.switchState(this.isTorchOn = !this.isTorchOn)} />
      </View>
    )
  }

  return (
    <>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <NavigationContainer>
            <Tab.Navigator initialRouteName="home" screenOptions={screenOptions}>
              <Tab.Screen name="home" options={{ title: 'Restaurants' }} component={RestaurantsScreen} />
              <Tab.Screen name="map" options={{ title: 'Map' }} component={mapCmp} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantsContextProvider>
      </LocationContextProvider>
      <StatusBar style="auto" />
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});