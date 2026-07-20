import axios from './axios';

interface SportItem {
  id: string;
  name: string;
  images: string[];
}

export async function getAllSports(state: (data: SportItem[]) => void) {
  try {
    const { data }: { data: SportItem[] } = await axios.get('/sports', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tkn')}`,
      },
    });
    state(data);
  } catch (error) {
    console.error(error);
  }
}
