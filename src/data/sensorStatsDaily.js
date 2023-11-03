const apiUrl = 'https://api.thingspeak.com/channels/2314365/feeds.json?api_key=ESPOY24P92FJIH2G&timezone=Asia%2FJakarta&start=2023-10-25%2000:00:00&end=2023-10-27%2023:59:59';

async function fetchDataFromApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari API');
    }
    const data = await response.json();
    return data.feeds || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
function calculateDailyAverages(data) {
  const dailyAverages = {};
  
  for (const feed of data) {
    const date = new Date(feed.created_at).toLocaleDateString();
    for (const field in feed) {
      if (field.startsWith("field")) {
        const fieldName = field;
        const temperature = parseFloat(feed[fieldName]);
        
        dailyAverages[date] = dailyAverages[date] || {};
        dailyAverages[date][fieldName] = dailyAverages[date][fieldName] || { totalTemperature: 0, count: 0 };
        
        if (!isNaN(temperature)) {
          dailyAverages[date][fieldName].totalTemperature += temperature;
          dailyAverages[date][fieldName].count++;
        }
      }
    }
  }
  
  return Object.entries(dailyAverages).map(([date, fieldData]) => {
    const dailyAverage = { date };
    for (const [fieldName, { totalTemperature, count }] of Object.entries(fieldData)) {
      dailyAverage[fieldName] = count > 0 ? totalTemperature / count : NaN;
    }
    return dailyAverage;
  });
}

async function calculateAndLogDailyAverages(apiUrl) {
  const data = await fetchDataFromApi(apiUrl);
  const dailyAverages = calculateDailyAverages(data);
  console.log("Rata-rata Suhu per Hari:");
  dailyAverages.forEach((dailyAverage) => {
    // console.log(`Tanggal: ${dailyAverage.date}`);
    for (const [fieldName, average] of Object.entries(dailyAverage)) {
      if (fieldName !== "date") {
        // console.log(`${fieldName}: ${average}`);
      }
    }
  });
}

calculateAndLogDailyAverages(apiUrl);
