import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const LoadingScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
			}}>
			<ActivityIndicator size={50} color="#0000ff" />
		</View>
	);
};
