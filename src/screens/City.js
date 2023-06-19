import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import IconText from '../components/IconText';
import moment from 'moment';

const City = ({weatherData}) => {
  const {
    container,
    cityName,
    countryName,
    imageLayout,
    populationWrapper,
    populationText,
    riseSetWrapper,
    riseSetText,
  } = styles;

  const {name, country, population, sunrise, sunset} = weatherData;

  return (
    <SafeAreaView style={container}>
      <ImageBackground
        source={require('../../assets/city-bg.jpg')}
        style={imageLayout}>
        <View style={populationWrapper}>
          <IconText
            iconName="user"
            iconColor="red"
            bodyText={`Population: ${population}`}
            bodyTextStyles={populationText}
          />
        </View>
        <View style={riseSetWrapper}>
          <IconText
            iconName="sunrise"
            iconColor="white"
            bodyText={moment(sunrise).format('h:mm:ss a')}
            bodyTextStyles={riseSetText}
          />
          <IconText
            iconName="sunset"
            iconColor="white"
            bodyText={moment(sunset).format('h:mm:ss a')}
            bodyTextStyles={riseSetText}
          />
        </View>
        <View style={styles.cityDetailsContainer}>
          <Text style={[cityName, styles.cityText]}>{name}</Text>
          <Text style={[countryName, styles.cityText]}>{country}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageLayout: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  countryName: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  cityText: {
    alignSelf: 'center',
  },
  populationWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  populationText: {
    fontSize: 25,
    color: 'red',
  },
  riseSetWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  cityDetailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default City;
