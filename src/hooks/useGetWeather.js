import React, {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {WEATHER_API_KEY} from '@env';

export const useGetWeather = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const fetcheatherData = useCallback(async () => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
      );
      const data = await res.json();
      setWeather(data);
      // console.log(data);
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
            geolocationError => {
              setError(geolocationError.message);
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
  return [loading, error, weather];
};
