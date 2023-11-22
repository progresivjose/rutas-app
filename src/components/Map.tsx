import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import Fab from './Fab';

const Map: React.FC = () => {
	const {
		initialPosition,
		hasLocation,
		getCurrentLocation,
		followUserLocation,
		stopFollowUserLocation,
		userLocation,
		routeLines,
	} = useLocation();
	const mapViewRef = useRef<MapView>();
	const isFollowing = useRef(true);
	const [showPolyline, setShowPolyline] = useState(true);

	useEffect(() => {
		followUserLocation();

		return () => {
			stopFolowUserLocation();
		};
	}, []);

	useEffect(() => {
		if (isFollowing.current) {
			const {latitude, longitude} = userLocation;

			mapViewRef.current?.animateCamera({
				center: {latitude, longitude},
			});
		}
	}, [userLocation]);

	const centerPosition = async () => {
		const {latitude, longitude} = await getCurrentLocation();

		mapViewRef.current?.animateCamera({
			center: {
				latitude,
				longitude,
			},
		});

		isFollowing.current = true;
	};

	if (!hasLocation) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.container}>
			<MapView
				ref={el => (mapViewRef.current = el!)}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				showsUserLocation={true}
				region={{
					latitude: initialPosition!.latitude,
					longitude: initialPosition!.longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
				onTouchStart={() => (isFollowing.current = false)}>
				{showPolyline && (
					<Polyline
						coordinates={routeLines}
						stokeColor="black"
						strokeWidth={3}
					/>
				)}
			</MapView>

			<Fab
				iconName="brush-outline"
				onPress={() => setShowPolyline(!showPolilyne)}
				style={{
					position: 'absolute',
					right: 80,
					bottom: 20,
				}}
			/>

			<Fab
				iconName="compass-outline"
				onPress={centerPosition}
				style={{
					position: 'absolute',
					right: 20,
					bottom: 20,
				}}
			/>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
