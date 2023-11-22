import {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';

interface Location {
	latitude: number;
	longitude: number;
}

export const useLocation = () => {
	const [initialPosition, setInitialPosition] = useState<Location>({});
	const [hasLocation, setHasLocation] = useState(false);
	const [userLocation, setUserLocation] = useState<Location>({
		latitude: 0,
		longitude: 0,
	});
	const [routeLines, setRouteLines] = useState<Location[]>([]);
	const watchId = useRef<number>();
	const isMounted = useRef(true);

	useEffect(() => {
		getCurrentLocation()
			.then(location => {
				if (!isMounted.current) return;

				setInitialPosition(location);
				setUserLocation(location);
				setHasLocation(true);
				setRouteLines(routes => [...routes, location]);
			})
			.catch(err => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	const getCurrentLocation = (): Promise<Location> => {
		return new Promise((resolve, reject) => {
			Geolocation.getCurrentPosition(
				({coords}) => {
					resolve({
						latitude: coords.latitude,
						longitude: coords.longitude,
					});
				},
				err => {
					reject({err});
				},
			);
		});
	};

	const followUserLocation = () => {
		watchId.current = Geolocation.watchPosition(
			({coords}) => {
				if (!isMounted.current) return;

				const location: Location = {
					latitude: coords.latitude,
					longitude: coords.longitude,
				};

				setUserLocation(location);

				setRouteLines(routes => [...routes, location]);
			},
			err => {
				console.error(err);
			},
			{
				enableHighAccuracy: true,
				distanceFilter: 10,
			},
		);
	};

	const stopFollowUserLocation = () => {
		if (watchId.current) {
			Geolocation.clearWatch(watchId.current);
		}
	};

	return {
		initialPosition,
		hasLocation,
		getCurrentLocation,
		followUserLocation,
		stopFolloUserLocation,
		userLocation,
		routeLines,
	};
};
