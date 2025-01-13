import { useState } from 'react';
import { Button, Image, View, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GaleriaScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://4kwallpapers.com/images/walls/thumbs_3t/20488.jpg' }} 
      style={styles.container}
    >
      <Button title="Abrir Galería" onPress={pickImage} color="#f27e95" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
  },
  image: {
    width: '95%',
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
});
