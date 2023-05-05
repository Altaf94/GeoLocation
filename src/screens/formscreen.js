import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [formSubmissions, setFormSubmissions] = useState([]);
  const navigation = useNavigation();

  const clearForm = () => {
    setName('');
    setPhone('');
    
  };

  const submitForm = () => {
    const newSubmitForm = {
      name: name,
      phone: phone,
      latitude: latitude,
      longitude: longitude,
    };
    setFormSubmissions([...formSubmissions, newSubmitForm]);
    clearForm();
    try {
      AsyncStorage.setItem(
        'form_submissions',
        JSON.stringify(formSubmissions)
      );
      console.log('Form data saved successfully');
      navigation.navigate('DataDetail');
    } catch (e) {
      console.log('Error saving form data: ', e);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude),
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    ),[];
  
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('form_submissions');
        console.log('Retrieved form data:', jsonValue);
        setFormSubmissions(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch (e) {
        console.log('Error retrieving form submissions: ', e);
      }
    };
    fetchData();
  }, []);
  

  return (
    <View>
      <Text style={styles.Text}>Fill the form</Text>
      <View style={styles.TextInput}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="latitude"
          value={latitude.toString()}
          disabled={true}
          defaultValue={latitude.toString()}
          onChangeText={(latitude) => setLatitude(latitude)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="longitude"
          value={longitude.toString()}
          disabled={true}
          defaultValue={longitude.toString()}
          onChangeText={(longitude) => setLongitude(longitude)}
        />
      </View>
      <View style={styles.TextInput}>
        <Button mode="contained-tonal" onPress={submitForm}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    color: 'black',
    padding: 10,
    fontWeight: 'bold',
  },
  TextInput: {
    padding: 10,
  },
});

export default FormScreen;
