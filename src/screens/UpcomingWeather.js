import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  View,
  Text,
  Animated,
} from 'react-native';

const UpcomingWeather = ({weatherData}) => {
  const renderItem = ({item}) => (
    <Animated.View style={styles.listItem}>
      <Text style={styles.condition}>{item.weather[0].main}</Text>
      <Text style={styles.dt}>{item.dt_txt}</Text>
      <View style={styles.tempWrapper}>
        <Text style={styles.tempLabel}>Min</Text>
        <Text style={styles.tempValue}>{item.main.temp_min}</Text>
        <Text style={styles.tempLabel}>Max</Text>
        <Text style={styles.tempValue}>{item.main.temp_max}</Text>
      </View>
    </Animated.View>
  );
  const filteredWeatherData = weatherData.filter(item => item.dt_txt);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/upcoming-bg.jpg')}
        style={styles.image}
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Upcoming Weather</Text>
          <FlatList
            data={filteredWeatherData}
            renderItem={renderItem}
            keyExtractor={item => item.dt_txt}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.7,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 3,
  },
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  condition: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dt: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  tempWrapper: {
    flexDirection: 'row',
  },
  tempLabel: {
    fontSize: 14,
    color: '#999999',
    marginRight: 4,
  },
  tempValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 10,
  },
});

export default UpcomingWeather;
