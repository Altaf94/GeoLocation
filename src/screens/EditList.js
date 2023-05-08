import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EditList = ({route}) => {
  const { objectParam, formSubmissions, setFormSubmissions } = route.params;
  const [name, setName] = useState(objectParam.name);
  const [phone, setPhone] = useState(objectParam.phone);
  const [latitude, setLatitude] = useState(objectParam.latitude);
  const [longitude, setLongitude] = useState(objectParam.longitude);
  const navigation = useNavigation();

  const handleUpdateSubmission = () => {
    const updateItem = {
      customid: objectParam.customid,
      name: name,
      phone: phone,
      latitude: latitude,
      longitude: longitude,
    };
    const updatedSubmissions = formSubmissions.map((item) => {
      if (item.customid === updateItem.customid) {
        return updateItem;
      } else {
        return item;
      }
    });
    setFormSubmissions(updatedSubmissions);
    const updatedSubmissionsString = JSON.stringify(updatedSubmissions);
   AsyncStorage.setItem('form_submissions', updatedSubmissionsString)
      .then(() => {
       navigation.goBack()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text style={styles.Text}>Edit the form</Text>
      <View style={styles.TextInput}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="latitude"
          value={latitude.toString()}
          disabled={true}
          defaultValue={latitude.toString()}
          onChangeText={latitude => setLatitude(latitude)}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          label="longitude"
          value={longitude.toString()}
          disabled={true}
          defaultValue={longitude.toString()}
          onChangeText={longitude => setLongitude(longitude)}
        />
      </View>
      <View style={styles.TextInput}>
        <Button
          mode="contained-tonal"
          onPress={handleUpdateSubmission}>
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

export default EditList;
