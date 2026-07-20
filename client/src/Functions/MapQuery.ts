import axios from 'axios';

const API_KEY = 'AIzaSyB8rVxLxXlomXkjJ04LRtFHC63AtzSnyw0';

export const getLatLng = async (location: string) => {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`,
    );

    const { lat, lng }: { lat: number; lng: number } = data.results[0].geometry?.location;

    return { lat, lng };
  } catch (e) {
    console.log(e);
  }
};
