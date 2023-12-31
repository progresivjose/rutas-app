import React, {useState, createContext, useEffect} from 'react';
import {Platform, AppState} from 'react-native';
import {
	check,
	PERMISSIONS,
	PermissionStatus,
	request,
	openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
	locationStatus: PermissionStatus;
}

export const permissionInitStatus: PermissionsState = {
	locationStatus: 'unavailable',
};

type PermissionsContextProps = {
	permissions: PermissionsState;
	askLocationPermission: () => void;
	checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
	const [permissions, setPermissions] = useState(permissionInitStatus);

	useEffect(() => {
		checkLocationPermission();

		AppState.addEventListener('change', state => {
			if (state == 'active') {
				checkLocationPermission();
			}
		});
	}, []);

	const askLocationPermission = async () => {
		let permissionsStatus: PermissionStatus;

		if (Platform.OS == 'ios') {
			permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		} else {
			permissionStatus = await request(
				PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
			);
		}

		if (permissionStatus == 'blocked') {
			openSettings();
		}

		setPermissions({
			...permissions,
			locationStatus: permissionStatus,
		});
	};
	const checkLocationPermission = async () => {
		let permissionsStatus: PermissionStatus;

		if (Platform.OS == 'ios') {
			permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		} else {
			permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
		}

		setPermissions({
			...permissions,
			locationStatus: permissionStatus,
		});
	};

	return (
		<PermissionsContext.Provider
			value={{permissions, askLocationPermission, checkLocationPermission}}>
			{children}
		</PermissionsContext.Provider>
	);
};
