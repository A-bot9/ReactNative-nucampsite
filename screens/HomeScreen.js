import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

const FeaturedItem = ({ item }) => {
	if (item) {
		return (
			<Card containerStyle={{ padding: 0 }}>
				<Card.Image source={item.image}>
					<View style={{ justifyContent: 'center', flex: 1 }}>
						<Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}></Text>
					</View>
				</Card.Image>
				<Text style={{ margin: 20 }}>{item.description}</Text>
			</Card>
		);
	}
};

const HomeScreen = () => {
	const [campsites, setCampsites] = useState(CAMPSITES);
	const [promotions, setPromotions] = useState(PROMOTIONS);
	const [partners, setPartners] = useState(PARTNERS);

	const featCampsite = campsites.find((item) => item.featured);
	const featPromotions = promotions.find((item) => item.featured);
	const featPartners = partners.find((item) => item.featured);

	return (
		<ScrollView>
			<FeaturedItem item={featCampsite} />
			<FeaturedItem item={featPromotions} />
			<FeaturedItem item={featPartners} />
		</ScrollView>
	);
};

export default HomeScreen;
