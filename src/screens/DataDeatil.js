import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormDetail = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);

  const getFormSubmissions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('form_submissions');
      console.log('Retrieved form data:', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
      // parse the JSON string back into an object before returning it
    } catch (e) {
      console.log('Error retrieving form submissions: ', e);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const submissions = await getFormSubmissions();
      setFormSubmissions(submissions);
    };
    fetchData();
  }, []);

  const renderItem = ({item,id}) => {
    return (
      <View style={styles.card}>
        <Text>Name: {item.name}</Text>
        <Text>Phone: {item.phone}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text> 
        <Button title='Edit'onPress={(e) =>console.log(id)}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {formSubmissions.length ? (
          <FlatList data={formSubmissions} renderItem={renderItem} />
      ) : (
        <Text>No form submissions found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FormDetail;
