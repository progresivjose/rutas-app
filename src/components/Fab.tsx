import React from 'react';
import {
	View,
	StyleProp,
	ViewStyle,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
	iconName: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
}

const Fab: React.FC = ({iconName, onPress, style}: Props) => {
	return (
		<View style={{...(style as any)}}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				style={styles.blackButton}>
				<Icon name={iconName} color="white" size={35} style={{left: 1}} />
			</TouchableOpacity>
		</View>
	);
};

export default Fab;

const styles = StyleSheet.create({
	blackButton: {
		zindex: 9999,
		height: 50,
		width: 50,
		backgroundColor: 'black',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 10,
	},
});
