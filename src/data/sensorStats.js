import { dummy } from "./dataDummy";

// Fungsi untuk mengubah format tanggal dan waktu
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Fungsi untuk menghitung statistik
function calculateStatistics(data) {
  const statistics = {};

  if (!data || data.length === 0) {
    return statistics;
  }

  // Mengambil nama field dari data feeds
  const fieldNames = Object.keys(data[0]).filter((key) =>
    key.startsWith("field"),
  );

  fieldNames.forEach((fieldName) => {
    const values = data
      .map((feed) => parseFloat(feed[fieldName]))
      .filter((value) => !isNaN(value));

    if (values.length === 0) {
      // set semua nilai statistik menjadi NaN
      statistics[fieldName] = {
        minimum: NaN,
        maximum: NaN,
        average: NaN,
        minTime: "",
        maxTime: "",
      };
    } else {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const sum = values.reduce((acc, value) => acc + value, 0);
      const avg = sum / values.length;
      const minTime = data.find(
        (feed) => parseFloat(feed[fieldName]) === min,
      )?.created_at;
      const maxTime = data.find(
        (feed) => parseFloat(feed[fieldName]) === max,
      )?.created_at;

      statistics[fieldName] = {
        minimum: min,
        maximum: max,
        average: avg,
        minTime: formatDateTime(minTime || ""),
        maxTime: formatDateTime(maxTime || ""),
      };
    }
  });

  return statistics;
}

// Fungsi untuk menghasilkan output sesuai format yang diinginkan
function generateOutput() {
  const statistics = calculateStatistics(dummy.feeds);
  const machineDuration = calculateMachineDuration();

  let currentDate = "";

  if (dummy.feeds && dummy.feeds.length > 0) {
    currentDate = formatDateTime(
      dummy.feeds[dummy.feeds.length - 1].created_at,
    );
  }

  const sensorData = {
    sensortemp: Object.keys(statistics)
      .filter((fieldName) => fieldName !== "created_at")
      .map((fieldName, index) => {
        const fieldDuration = machineDuration[fieldName]; // Durasi mesin untuk field tertentu
        return {
          name: `Sensor ${index + 1}`,
          temperature: {
            maximum: statistics[fieldName].maximum.toFixed(1),
            minimum: statistics[fieldName].minimum.toFixed(1),
            average: statistics[fieldName].average.toFixed(1),
            current:
              parseFloat(
                dummy.feeds
                  .filter((feed) => typeof feed[fieldName] !== "undefined")
                  .slice(-1)[0]?.[fieldName],
              )?.toFixed(1) || "N/A",
          },
          timestamp: {
            maximum: statistics[fieldName].maxTime,
            minimum: statistics[fieldName].minTime,
          },
          currentdate: currentDate,
          duration: fieldDuration || { hours: 0, minutes: 0, seconds: 0 }, // Menambahkan durasi mesin ke dalam field
        };
      }),
  };

  return sensorData;
}

// Fungsi untuk menghitung durasi mesin
function calculateMachineDuration() {
  if (!dummy.feeds || dummy.feeds.length === 0) {
    return {};
  }

  const fieldDurations = {};

  // Mendapatkan daftar nama field sensor
  const fieldNames = Object.keys(dummy.feeds[0]).filter((key) =>
    key.startsWith("field"),
  );

  for (const fieldName of fieldNames) {
    const lastEntry = dummy.feeds[dummy.feeds.length - 1];
    const lastFieldTime = new Date(lastEntry.created_at);
    const firstFieldTime = new Date(dummy.feeds[0].created_at);
    const fieldTimeDifference = lastFieldTime - firstFieldTime;
    const fieldHours = Math.floor(fieldTimeDifference / (1000 * 60 * 60));
    const fieldMinutes = Math.floor(
      (fieldTimeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const fieldSeconds = Math.floor((fieldTimeDifference % (1000 * 60)) / 1000);

    fieldDurations[fieldName] = {
      hours: fieldHours,
      minutes: fieldMinutes,
      seconds: fieldSeconds,
    };
  }

  return fieldDurations;
}

// Hasil output
const output = generateOutput();

// Ekspor output sebagai default
export default output;
