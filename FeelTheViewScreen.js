import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const overlays = [
  { id: 'nature', title: 'Nature Walk', image: require('../assets/nature.png') },
  { id: 'ocean', title: 'Ocean Feel', image: require('../assets/ocean.png') },
  { id: 'forest', title: 'Forest Walk', image: require('../assets/forest.png') },
];

const FeelTheViewScreen = () => {
  const [selectedOverlay, setSelectedOverlay] = useState(overlays[0]); 

  return (
    <View style={styles.container}>
      {/* Fullscreen background image */}
      <ImageBackground source={selectedOverlay.image} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.imageTitle}>{selectedOverlay.title}</Text>
        </View>

        {/* Buttons to switch between images */}
        <View style={styles.buttonsContainer}>
          {overlays.map((overlay) => (
            <TouchableOpacity
              key={overlay.id}
              style={[
                styles.button,
                selectedOverlay.id === overlay.id && styles.activeButton,
              ]}
              onPress={() => setSelectedOverlay(overlay)}
            >
              <Text style={styles.buttonText}>{overlay.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#673AB7',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default FeelTheViewScreen;