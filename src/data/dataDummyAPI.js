// URL API Thingspeak
const apiUrl = 'https://api.thingspeak.com/channels/266256/feeds.json';

// Fungsi untuk mengambil data dari API dan parse JSON
const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari API');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Mengambil data dari API dan mengekspor variabel
const dummy = await fetchData();