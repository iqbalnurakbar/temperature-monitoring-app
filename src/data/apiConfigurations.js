export const apiConfigurations1 = (startDate, endDate, startTime, endTime) => [
  {
    url: `https://api.thingspeak.com/channels/2376785/feeds.json?api_key=62O0GD4N3983R8JP&timezone=Asia%2FJakarta&start=${startDate}%20${startTime}:00&end=${endDate}%20${endTime}:59`,
    fieldIndices: [1],
    timeIndices: [2],
  },
];
