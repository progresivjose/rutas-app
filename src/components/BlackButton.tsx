import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleProp,
	ViewStyle,
	StyleSheet,
} from 'react-native';

interface Props {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
}

export const BlackButton: React.FC = ({title, onPress, style = {}}: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			style={{
				...(style as any),
				...styles.blackButton,
			}}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default BlackButton;

const styles = StyleSheet.create({
	blackButton: {
		height: 45,
		width: 200,
		backgroundColor: 'black',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,

		elevation: 10,
	},
	text: {
		color: 'white',
		fontSize: 18,
	},
});
