import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import RowText from '../components/RowText';
import {weatherType} from '../utilities/weatherType';

const CurrentWeather = ({weatherData}) => {
  const {
    wrapper,
    container,
    tempStyle,
    feels,
    highLowWrapper,
    highLow,
    bodyWrapper,
    description,
    message,
  } = styles;

  const {
    main: {temp, feels_like, temp_max, temp_min},
    weather,
  } = weatherData;

  const weatherCondition = weather[0].main;
  const weatherTypeData = weatherType[weatherCondition];

  return (
    <SafeAreaView
      style={[wrapper, {backgroundColor: weatherTypeData.backgroundColor}]}>
      <View style={container}>
        <Feather name={weatherTypeData.icon} size={100} color="white" />
        <Text style={tempStyle}>{temp}</Text>
        <Text style={feels}>{`Feels Like ${feels_like}°`}</Text>
        <RowText
          messageOne={`High: ${temp_max}° / `}
          messageTwo={`Low: ${temp_min}°`}
          containerStyles={highLowWrapper}
          messageOneStyles={highLow}
          messageTwoStyles={highLow}
        />
      </View>
      <RowText
        messageOne={weather[0].description}
        messageTwo={weatherTypeData.message}
        containerStyles={bodyWrapper}
        messageOneStyles={description}
        messageTwoStyles={message}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tempStyle: {
    fontSize: 72,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feels: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  highLow: {
    color: 'white',
    fontSize: 20,
  },
  highLowWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bodyWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 25,
    marginBottom: 40,
  },
  description: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    color: 'white',
  },
});

export default CurrentWeather;
