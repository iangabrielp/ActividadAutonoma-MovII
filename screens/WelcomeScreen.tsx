import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://4kwallpapers.com/images/walls/thumbs_3t/20517.jpg' }} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Actividad Autónoma</Text>
        <Text style={styles.subtitle}>Gabriel Proaño</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
