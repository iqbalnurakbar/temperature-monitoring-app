// URL API Thingspeak
const apiUrl = 'https://api.thingspeak.com/channels/2176107/feeds.json?api_key=ESPOY24P92FJIH2G&results=8000';

// Fungsi untuk mengambil data dari API dan parse JSON
const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Gagal mengambil data dari API');
    }

    const data = await response.json();
    return data.feeds;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fungsi untuk mengubah format tanggal dan waktu
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Fungsi untuk menghitung statistik
function calculateStatistics(data) {
  const statistics = {};

  if (!data || data.length === 0) {
    return statistics;
  }

  // Mengambil nama field dari data feeds
  const fieldNames = Object.keys(data[0]).filter(key =>
    key.startsWith('field')
  );

  fieldNames.forEach(fieldName => {
    const values = data
      .map(feed => parseFloat(feed[fieldName]))
      .filter(value => !isNaN(value));

    if (values.length === 0) {
      // Set semua nilai statistik menjadi NaN
      statistics[fieldName] = {
        minimum: NaN,
        maximum: NaN,
        average: NaN,
        minTime: '',
        maxTime: '',
      };
    } else {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const sum = values.reduce((acc, value) => acc + value, 0);
      const avg = sum / values.length;
      const minTime = data.find(feed => parseFloat(feed[fieldName]) === min)?.created_at;
      const maxTime = data.find(feed => parseFloat(feed[fieldName]) === max)?.created_at;

      statistics[fieldName] = {
        minimum: min,
        maximum: max,
        average: avg,
        minTime: formatDateTime(minTime || ''),
        maxTime: formatDateTime(maxTime || ''),
      };
    }
  });

  return statistics;
}

// Fungsi untuk menghasilkan output sesuai format yang diinginkan
function generateOutput(data) {
  const statistics = calculateStatistics(data);
  const machineDuration = calculateMachineDuration(data);

  let currentDate = '';

  if (data && data.length > 0) {
    currentDate = formatDateTime(data[data.length - 1].created_at);
  }

  const sensorData = {
    sensortemp: Object.keys(statistics)
      .filter(fieldName => fieldName !== 'created_at')
      .map((fieldName, index) => ({
        name: `Sensor ${index + 1}`,
        temperature: {
          maximum: statistics[fieldName].maximum.toFixed(1),
          minimum: statistics[fieldName].minimum.toFixed(1),
          average: statistics[fieldName].average.toFixed(1),
          current:
            parseFloat(
              data
                .filter(feed => typeof feed[fieldName] !== 'undefined')
                .slice(-1)[0]?.[fieldName]
            )?.toFixed(1) || 'N/A',
        },
        timestamp: {
          maximum: statistics[fieldName].maxTime,
          minimum: statistics[fieldName].minTime,
        },
        currentdate: currentDate,
        duration: machineDuration,
      })),
  };

  return sensorData;
}

// Fungsi untuk menghitung durasi mesin
function calculateMachineDuration(data) {
  if (!data || data.length === 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const startTime = new Date(data[0].created_at);
  const endTime = new Date(data[data.length - 1].created_at);
  const timeDifference = endTime - startTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

// Export fungsi-fungsi yang mungkin dibutuhkan di komponen lain
export { generateOutput, fetchData };