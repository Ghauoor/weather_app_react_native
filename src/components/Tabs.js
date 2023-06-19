import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import CurrentWeather from '../screens/CurrentWeather';
import UpcomingWeather from '../screens/UpcomingWeather';
import City from '../screens/City';

const Tab = createBottomTabNavigator();

const Tabs = ({weather}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Current') {
            iconName = focused ? 'droplet' : 'droplet';
          } else if (route.name === 'Upcoming') {
            iconName = focused ? 'clock' : 'clock';
          } else if (route.name === 'City') {
            iconName = focused ? 'home' : 'home';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'lightblue',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 5,
        },
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 5,
        },
      }}>
      <Tab.Screen name="Current">
        {() => <CurrentWeather weatherData={weather?.list?.[0]} />}
      </Tab.Screen>
      <Tab.Screen name="Upcoming">
        {() => <UpcomingWeather weatherData={weather.list} />}
      </Tab.Screen>
      <Tab.Screen name="City">
        {() => <City weatherData={weather.city} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
