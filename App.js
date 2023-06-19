import React, {useState, useEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Tabs from './src/components/Tabs';
import {WEATHER_API_KEY} from '@env';
import ErrorItem from './src/components/ErrorItem';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const fetcheatherData = useCallback(async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`,
      );
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError('Could not fetch weather');
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    const getLocationAsync = async () => {
      await fetcheatherData();
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);
              setLoading(false);
            },
            e => {
              setError(e.message);
              setLoading(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          setError('Location permission not granted');
          setLoading(false);
        }
      } catch (e) {
        setError('Failed to request location permission');
        setLoading(false);
      }
    };
    getLocationAsync();
  }, [fetcheatherData]);

  if (weather && weather.list && !loading) {
    return (
      <NavigationContainer>
        <Tabs weather={weather} />
      </NavigationContainer>
    );
  }

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="blue" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {error ? (
        <ErrorItem />
      ) : (
        <ActivityIndicator size={'large'} color={'blue'} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
