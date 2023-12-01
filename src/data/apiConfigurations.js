export const apiConfigurations1 = (startDate, endDate, startTime, endTime) => [
  {
    url: `https://api.thingspeak.com/channels/2342296/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
    fieldIndices: [1,2],
    timeIndices: [3,3],
  },
  // {
  //   url: `https://api.thingspeak.com/channels/2344351/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
  //   fieldIndices: [1, 2, 4, 5],
  //   timeIndices: [3, 3, 6, 6],
  // },
  // {
  //   url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
  //   fieldIndices: [1, 2, 4, 5],
  //   timeIndices: [3, 3, 6, 6],
  // },
];

// export const apiConfigurations2 = () => [
//   {
//     url: `https://api.thingspeak.com/channels/2342296/feeds.json?timezone=Asia%2FJakarta&results=2`,
//     fieldIndices: [1, 2, 4, 5],
//     timeIndices: [3, 3, 6, 6],
//   },
//   {
//     url: `https://api.thingspeak.com/channels/2344351/feeds.json?timezone=Asia%2FJakarta&results=2`,
//     fieldIndices: [1, 2, 4, 5],
//     timeIndices: [3, 3, 6, 6],
//   },
//   {
//     url: `https://api.thingspeak.com/channels/2347341/feeds.json?timezone=Asia%2FJakarta&results=2`,
//     fieldIndices: [1, 2, 4, 5],
//     timeIndices: [3, 3, 6, 6],
//   },
// ];
