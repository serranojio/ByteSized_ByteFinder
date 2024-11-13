import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [ip, setIp] = useState('');
  const [version, setVersion] = useState('v4');
  const [ipDetails, setIpDetails] = useState(null);
  const slideAnim = useRef(new Animated.Value(300)).current; 

  const fetchIpDetails = async () => {
    const selectedIp = ip || '';
    console.log(`Selected IP: ${selectedIp}`);
    const url = `https://ipapi.co/${selectedIp}/${version === 'v4' ? 'json' : 'json'}/`;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      if (data.error) {
        setIpDetails({ error: 'Could not retrieve IP details' });
      } else {
        setIpDetails({
          ip: data.ip,
          org: data.org,
          country: data.country_name,
          region: data.region,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude
        });
      }

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

    } catch (error) {
      setIpDetails({ error: 'Error fetching IP details' });
    }
  };

  const clearResults = () => {
    setIpDetails(null);
    setIp('');
    slideAnim.setValue(300); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/ByteFinder - Presentation Draft (1).png')} style={styles.image} />
      
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter IP Address (optional)"
          placeholderTextColor={'#f9f9f9'}
          value={ip}
          onChangeText={setIp}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.versionButton,
            version === 'v4' && styles.selectedButton
          ]}
          onPress={() => setVersion('v4')}
        >
          <Text style={styles.buttonText}>IPv4</Text>
        </Pressable>

        <Pressable
          style={[
            styles.versionButton,
            version === 'v6' && styles.selectedButton
          ]}
          onPress={() => setVersion('v6')}
        >
          <Text style={styles.buttonText}>IPv6</Text>
        </Pressable>
      </View>

      <Pressable style={styles.lookupButton} onPress={fetchIpDetails}>
        <Text style={styles.lookupButtonText}>Get IP Details</Text>
      </Pressable>

      {ipDetails && (
        <Animated.View style={[styles.detailsContainer, { transform: [{ translateY: slideAnim }] }]}>
          {ipDetails.error ? (
            <Text style={styles.errorText}>{ipDetails.error}</Text>
          ) : (
            <>
              <Text style={styles.detailsText}>IP Address: <Text style={styles.detailsValueText}> {ipDetails.ip} </Text></Text>
              <Text style={styles.detailsText}>ISP: <Text style={styles.detailsValueText}> {ipDetails.org} </Text></Text>
              <Text style={styles.detailsText}>Country: <Text style={styles.detailsValueText}> {ipDetails.country} </Text></Text>
              <Text style={styles.detailsText}>Region: <Text style={styles.detailsValueText}> {ipDetails.region} </Text></Text>
              <Text style={styles.detailsText}>City: <Text style={styles.detailsValueText}> {ipDetails.city} </Text></Text>
              <Text style={styles.detailsText}>Location: <Text style={styles.detailsValueText}> {ipDetails.latitude}, {ipDetails.longitude} </Text></Text>
              
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: ipDetails.latitude,
                  longitude: ipDetails.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: ipDetails.latitude,
                    longitude: ipDetails.longitude
                  }}
                  title={ipDetails.city}
                  description={`${ipDetails.region}, ${ipDetails.country}`}
                />
              </MapView>
            </>
          )}
        </Animated.View>
      )}

      {ipDetails && (
        <Pressable style={styles.clearButton} onPress={clearResults}>
          <Text style={styles.clearButtonText}>Clear Results</Text>
        </Pressable>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202A44',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f9f9f9',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  image: {
    height: "35%",
    width: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    margin: -80,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  versionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#263252',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#181f32',
    borderWidth: 1,
    borderColor: '#f9f9f9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lookupButton: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  lookupButtonText: {
    color: '#202A44',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#f9f9f9',
    padding: 20,
    borderRadius: 11,  
  },
  detailsText: {
    color: '#f9f9f9',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '700',
  },

  detailsValueText: {
    color: '#f9f9f9',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#ff6666',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#f9f9f9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 8, 
  },
});
