import Geocoder from 'react-native-geocoding';
// import { GOOGLE_MAPS_API_KEY } from '@env';
const GOOGLE_MAPS_API_KEY = process.env['GOOGLE_MAPS_API_KEY'];
Geocoder.init(GOOGLE_MAPS_API_KEY!);

export default Geocoder;