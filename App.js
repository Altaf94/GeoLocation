import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AppNavigation from './src/navigaition/navigation';
import FormScreen from './src/screens/formscreen';


const App = () => {

  return (
   
      <View style={{flex:1}}>
        <AppNavigation />
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

export default App;
