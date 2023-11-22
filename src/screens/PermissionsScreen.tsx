import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {PermissionsContext} from '../context/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionsScreen = () => {
	const {permissions, askLocationPermission} = useContext(PermissionsContext);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Es necesario el uso del GPS para usar esta aplicación
			</Text>
			<BlackButton title="Persmiso" onPress={askLocationPermission} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: 'black',
		width: 200,
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 20,
	},
});
