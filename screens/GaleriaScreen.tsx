import { useState } from 'react';
import { Button, Image, View, StyleSheet, ImageBackground, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/////SUBIR/////
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import axios from 'axios';
import { token } from '../config/Secrets';

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

  ///////////////////////////
  ///////////SUBIR IMAGEN DROPBOX//////////////////
  // Subir imagen a Dropbox y obtener el enlace de la imagen

  const [ImageUrl, setImageUrl] = useState('')
  const subirImagen = async (nombre: String) => {
    if (!image) {
      Alert.alert('Error', 'Primero selecciona una imagen');
      return;
    }

    const ACCESS_TOKEN = token; // Token válido de Dropbox

    try {
      // Leer el archivo local como Base64
      const fileData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convertir Base64 a binario
      const fileBuffer = Buffer.from(fileData, 'base64'); // Utiliza Buffer importado

    
      // Crear los argumentos para la API de Dropbox
      const dropboxArg = {
        path: `/${nombre}`, // Ruta donde se guardará el archivo
        mode: 'add',
        autorename: true,
        mute: false,
      };

      // Subir el archivo binario a Dropbox
      const result = await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        fileBuffer,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Dropbox-API-Arg': JSON.stringify(dropboxArg),
            'Content-Type': 'application/octet-stream',
          },
        }
      );

      console.log('Dropbox response:', result.data);

      // Después de la subida, obtener la URL de la imagen
      const filePath = result.data.path_display;

      // Solicitar el enlace de descarga del archivo
      const sharedLinkResult = await axios.post(
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        {
          path: filePath, // Ruta del archivo
          settings: {
            requested_visibility: 'public', // Hacer el enlace público
          },
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      // Obtener la URL del enlace compartido
      const downloadUrl = sharedLinkResult.data.url.replace('?dl=0', '?raw=1'); // Hacer que la URL sea de descarga directa

      console.log('URL de descarga:', downloadUrl);
      setImageUrl(downloadUrl); // Guardar la URL de la imagen subida

      Alert.alert('Éxito', 'Imagen subida correctamente a Dropbox');
    } catch (error) {
      //console.error('Error al subir la imagen:', error.response?.data || error.message);
      Alert.alert('Error', 'Hubo un problema al subir la imagen');
    }
  };
  ////////////////////////////

  return (
    <ImageBackground
      source={{ uri: 'https://4kwallpapers.com/images/walls/thumbs_3t/20488.jpg' }}
      style={styles.container}
    >
      <Button title="Abrir Galería" onPress={pickImage} color="#f27e95" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title='Subir' color={'green'}  onPress={ ()=> subirImagen ('imagen.jpg')}/>
      <Text>{ImageUrl}</Text>
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
