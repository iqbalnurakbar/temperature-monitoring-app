// Fungsi untuk menghitung durasi antara dua timestamp dalam format string
function calculateDuration(startTimestamp, lastTimestamp) {
  const startTime = new Date(startTimestamp);
  const lastTime = new Date(lastTimestamp);

  const durationInMillis = lastTime - startTime;

  const milliseconds = durationInMillis % 1000;
  const seconds = Math.floor((durationInMillis / 1000) % 60);
  const minutes = Math.floor((durationInMillis / (1000 * 60)) % 60);
  const hours = Math.floor((durationInMillis / (1000 * 60 * 60)) % 24);

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
  };
}

// Fungsi untuk menghasilkan timestamp acak yang memenuhi persyaratan
function getRandomTimestamp() {
  const start = getRandomTime();
  let last;
  do {
    last = getRandomTime();
  } while (new Date(last) <= new Date(start)); // Memastikan last lebih besar daripada start
  return { start, last };
}

// Fungsi untuk menghasilkan waktu acak
function getRandomTime() {
  const year = 2023; // Tahun yang tetap
  const month = Math.floor(Math.random() * 12) + 1; // Bulan antara 1 dan 12
  const day = Math.floor(Math.random() * 31) + 1; // Hari antara 1 dan 31
  const hours = Math.floor(Math.random() * 24); // Jam antara 0 dan 23
  const minutes = Math.floor(Math.random() * 60); // Menit antara 0 dan 59
  const seconds = Math.floor(Math.random() * 60); // Detik antara 0 dan 59

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Data sensor
const sensorData = {
  sensortemp: [
    {
      id: 1,
      name: "Sensor 1",
      temperature: {
        current: 25.5,
        maximum: 30.2,
        minimum: 20.1,
        average: 26.8,
      },
      timestamp: getRandomTimestamp(),
      currentdate: "2023-10-07 08:00",
    },
    {
      id: 2,
      name: "Sensor 2",
      temperature: {
        current: 22.8,
        maximum: 28.9,
        minimum: 19.4,
        average: 24.7,
      },
      timestamp: getRandomTimestamp(),
      currentdate: "2023-10-07 08:00",
    },
    {
      id: 3,
      name: "Sensor 3",
      temperature: {
        current: 27.3,
        maximum: 32.1,
        minimum: 23.8,
        average: 28.5,
      },
      timestamp: getRandomTimestamp(),
      currentdate: "2023-10-07 08:00",
    },
    {
      id: 4,
      name: "Sensor 4",
      temperature: {
        current: 23.9,
        maximum: 29.7,
        minimum: 21.2,
        average: 25.4,
      },
      timestamp: getRandomTimestamp(),
      currentdate: "2023-10-07 08:00",
    },
    {
      id: 5,
      name: "Sensor 5",
      temperature: {
        current: 26.1,
        maximum: 31.5,
        minimum: 22.7,
        average: 27.6,
      },
      timestamp: getRandomTimestamp(),
      currentdate: "2023-10-07 08:00",
    },
  ],
};

// Menghitung dan menambahkan durasi ke setiap sensor dalam data
sensorData.sensortemp.forEach((sensor) => {
  const duration = calculateDuration(
    sensor.timestamp.start,
    sensor.timestamp.last,
  );
  sensor.duration = duration;
});

export default sensorData;
