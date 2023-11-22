import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {PermissionsContext} from '../context/PermissionsContext';

const Stack = createStackNavigator();

export const StackNavigator = () => {
	const {permissions} = useContext(PermissionsContext);

	if (permissions.locationStatus == 'unavailable') return <LoadingScreen />;

	return (
		<Stack.Navigator
			initialRouteName="PermissionsScreen"
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: 'white',
				},
			}}>
			{permissions.locationStatus == 'granted' ? (
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			) : (
				<Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
			)}
		</Stack.Navigator>
	);
};
