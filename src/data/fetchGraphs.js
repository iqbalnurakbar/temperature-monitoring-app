const fetchData = async (apiConfigurations, targetName) => {
  try {
    let foundData = null;

    for (const config of apiConfigurations) {
      // Check if data is already found
      if (foundData) {
        break;
      }

      const response = await fetch(config.url);
      const data = await response.json();
      const channelInfo = data.channel;
      const feeds = data.feeds;

      const generateData = (fieldIndex, timeIndex) => {
        return feeds
          .filter(
            (feed) =>
              feed &&
              feed[`field${fieldIndex}`] !== null &&
              channelInfo[`field${fieldIndex}`] === targetName,
          )
          .map((feed) => ({
            suhu: parseFloat(feed[`field${fieldIndex}`]).toFixed(1),
            waktu: feed[`field${timeIndex}`],
          }));
      };

      const result = config.fieldIndices.map((fieldIndex, index) =>
        generateData(fieldIndex, config.timeIndices[index]),
      );

      // Filter out empty arrays
      const filteredResult = result.filter((arr) => arr.length > 0);

      // Check if data is found in the current API
      if (filteredResult.length > 0) {
        foundData = filteredResult;
      }
    }

    // Mengembalikan hasil untuk digunakan di tempat lain jika diperlukan
    return foundData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    // Mengembalikan null atau nilai lainnya sesuai kebutuhan jika terjadi error
    return null;
  }
};
export { fetchData };
