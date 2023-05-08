import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FormScreen from '../screens/formscreen';
import DataDetail from '../screens/DataDeatil';
import EditList from '../screens/EditList';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="FormScreen"
          component={FormScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DataDetail"
          component={DataDetail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditList"
          component={EditList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;