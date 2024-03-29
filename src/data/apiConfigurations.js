export const apiConfigurations1 = (startDate, endDate, startTime, endTime) => [
  /* Masukkan API yang digunakan dengan format: 
  {
    url:``, 
    fieldIndinces:[], 
    timeIndices:[],
  },
  */

  {
    
    url: `https://api.thingspeak.com/channels/2383410/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
    fieldIndices: [1,4],
    timeIndices: [2,5],
  },
  // {
  //   url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
  //   fieldIndices: [1, 2, 4],
  //   timeIndices: [3, 3, 6],
  // },

  // {
  //   url: `https://api.thingspeak.com/channels/2376785/feeds.json?api_key=62O0GD4N3983R8JP&timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
  //   fieldIndices: [1],
  //   timeIndices: [2],
  // },
];

// ! FieldIndices digunakan untuk menyimpan parameter temperatur, timeIndices digunakan untuk menyimpan parameter waktu.