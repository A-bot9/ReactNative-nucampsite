import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
	Platform,
	View,
	StyleSheet,
	Text,
	Image,
	ToastAndroid,
	Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import logo from '../assets/images/logo.png';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import NetInfo from '@react-native-community/netinfo';

const Drawer = createDrawerNavigator();

const screenOptions = {
	headerTintColor: '#fff',
	headerStyle: { backgroundColor: '#5637DD' },
};

const HomeNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					title: 'Home',
					headerLeft: () => (
						<Icon
							name="home"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const AboutNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="About"
				component={AboutScreen}
				options={({ navigation }) => ({
					headerLeft: () => (
						<Icon
							name="info-circle"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const ContactNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Contact"
				component={ContactScreen}
				options={({ navigation }) => ({
					title: 'Campsite Directory',
					headerLeft: () => (
						<Icon
							name="address-card"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const ReservationNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Reservation"
				component={ReservationScreen}
				options={({ navigation }) => ({
					title: 'Reservation Search',
					headerLeft: () => (
						<Icon
							name="tree"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const FavoritesNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={({ navigation }) => ({
					title: 'Favorite Campsites',
					headerLeft: () => (
						<Icon
							name="heart"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const LoginNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={({ navigation, route }) => ({
					headerTitle: getFocusedRouteNameFromRoute(route),
					headerLeft: () => (
						<Icon
							name={getFocusedRouteNameFromRoute(route) === 'Register' ? 'user-plus' : 'sign-in'}
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

const DirectoryNavigator = () => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
			<Stack.Screen
				name="Directory"
				component={DirectoryScreen}
				options={{ title: 'Campsite Directory' }}
			/>
			<Stack.Screen
				name="CampsiteInfo"
				component={CampsiteInfoScreen}
				options={({ route }) => ({ title: route.params.campsite.name })}
			/>
		</Stack.Navigator>
	);
};

const CustomDrawerContent = (props) => {
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image source={logo} style={styles.drawerImage} />
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>Nucamp</Text>
				</View>
			</View>
			<DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
		</DrawerContentScrollView>
	);
};

const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCampsites());
		dispatch(fetchPromotions());
		dispatch(fetchPartners());
		dispatch(fetchComments());
	}, [dispatch]);

	const showNetInfo = async () => {
		const networkInfo = await NetInfo.fetch();
		Platform.OS === 'ios'
			? Alert.alert('initial Network Connectivity Type:', networkInfo.type)
			: ToastAndroid.show(
					'Initial Network Connectivity Type: ' + networkInfo.type,
					ToastAndroid.LONG
			  );
	};

	useEffect(() => {
		showNetInfo();

		const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
			handleConnectivityChange(connectionInfo);
		});

		return unsubscribeNetInfo;
	}, []);

	const handleConnectivityChange = (connectionInfo) => {
		let connectionMsg = 'You are now connected to an active network.';
		switch (connectionInfo.type) {
			case 'none':
				connectionMsg = 'No network connection is active.';
				break;
			case 'unknown':
				connectionMsg = 'The network connection state is now unknown.';
				break;
			case 'cellular':
				connectionMsg = 'You are now connected to a cellular network.';
			case 'wifi':
				connectionMsg = 'You are now connected to WiFi network.';
				break;
		}
		Platform.OS === 'ios'
			? Alert.alert('Connection change:', connectionMsg)
			: ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
	};

	return (
		<View
			style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}
		>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerStyle={{ backgroundColor: '#CEC8FF' }}
				drawerContent={CustomDrawerContent}
			>
				<Drawer.Screen
					name="Login"
					component={LoginNavigator}
					options={{
						drawerIcon: ({ color }) => (
							<Icon
								name="sign-in"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="Home"
					component={HomeNavigator}
					options={{
						title: 'Home',
						drawerIcon: ({ color }) => (
							<Icon
								name="home"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="Directory"
					component={DirectoryNavigator}
					options={{
						title: 'Directory',
						drawerIcon: ({ color }) => (
							<Icon
								name="list"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>

				<Drawer.Screen
					name="ReserveCampsite"
					component={ReservationNavigator}
					options={{
						title: 'Reserve Campsite',
						drawerIcon: ({ color }) => (
							<Icon
								name="tree"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>

				<Drawer.Screen
					name="Favorites"
					component={FavoritesNavigator}
					options={{
						title: 'My Favorites',
						drawerIcon: ({ color }) => (
							<Icon
								name="heart"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>

				<Drawer.Screen
					name="About"
					component={AboutNavigator}
					options={{
						title: 'About',
						drawerIcon: ({ color }) => (
							<Icon
								name="info-circle"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="Contact"
					component={ContactNavigator}
					options={{
						title: 'Contact Us',
						drawerIcon: ({ color }) => (
							<Icon
								name="address-card"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
			</Drawer.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	stackIcon: {
		marginLeft: 10,
		color: '#fff',
		fontSize: 24,
	},
	drawerHeader: {
		backgroundColor: '#5637DD',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	drawerHeaderText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width: 60,
	},
});

export default Main;
