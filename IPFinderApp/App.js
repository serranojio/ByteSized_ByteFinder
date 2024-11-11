import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';

export default function App() {
  const [ip, setIp] = useState('');
  const [version, setVersion] = useState('v4');
  const [ipDetails, setIpDetails] = useState(null);

  const fetchIpDetails = async () => {
    const selectedIp = ip || '';  // Use entered IP or default to public IP
    const url = "https://ipapi.co/${selectedIp}/${version === 'v4' ? 'json' : 'json'}/";
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
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
    } catch (error) {
      setIpDetails({ error: 'Error fetching IP details' });
    }
  };
  

  const clearResults = () => {
    setIpDetails(null);
    setIp(''); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ByteFinder</Text>
      
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
        <View style={styles.detailsContainer}>
          {ipDetails.error ? (
            <Text style={styles.errorText}>{ipDetails.error}</Text>
          ) : (
            <>
              <Text style={styles.detailsText}>IP Address: {ipDetails.ip}</Text>
              <Text style={styles.detailsText}>Organization: {ipDetails.org}</Text>
              <Text style={styles.detailsText}>Country: {ipDetails.country}</Text>
              <Text style={styles.detailsText}>Region: {ipDetails.region}</Text>
              <Text style={styles.detailsText}>City: {ipDetails.city}</Text>
              <Text style={styles.detailsText}>Location: {ipDetails.latitude}, {ipDetails.longitude}</Text>
            </>
          )}
        </View>
      )}

      {/* Clear Results Button */}
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
    alignItems: 'flex-start',
    marginTop: 20,
  },
  detailsText: {
    color: '#f9f9f9',
    fontSize: 16,
    marginBottom: 5,
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
});
