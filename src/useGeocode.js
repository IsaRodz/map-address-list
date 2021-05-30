import axios from 'axios';
const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = 'AIzaSyDHLHpUVR6850QajwNW4NjKJc9K4_QZQIg';

export default async function useGeocode(address) {
  const url = `${baseUrl}?address=${address}&key=${API_KEY}`;
  const { data } = await axios.get(url);

  return data;
}
