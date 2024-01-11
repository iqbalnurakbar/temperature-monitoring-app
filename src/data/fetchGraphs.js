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
              channelInfo[`field${fieldIndex}`] === targetName &&
              parseFloat(feed[`field${fieldIndex}`]) > 0 &&
              parseFloat(feed[`field${fieldIndex}`]) < 300,
          )
          .map((feed) => ({
            id: feed.entry_id,
            temp: parseFloat(feed[`field${fieldIndex}`]).toFixed(2),
            slaveTime: feed[`field${timeIndex}`],
            masterTime: feed.created_at,
          }));
      };

      const result = config.fieldIndices.map((fieldIndex, index) =>
        generateData(fieldIndex, config.timeIndices[index]),
      );

      // Filter out empty arrays
      const filteredData = result.filter((arr) => arr.length > 0);

      // Combine arrays into a single array
      const combinedData = [].concat(...filteredData);

      // Remove duplicate entries based on the 'temp' key
      const uniqueData = removeDuplicates(combinedData, 'slaveTime');

      const filteredResult = uniqueData.filter((entry) => {
        const formattedMasterTime = formatDateTimeDDMMYYYY(entry.masterTime);
        const formattedSlaveTime = formatDateTimeDDMMYYYY(entry.slaveTime);
        return formattedSlaveTime === formattedMasterTime;
      });

      // Check if data is found in the current API
      if (filteredResult.length > 0) {
        foundData = filteredResult;
      }
    }

    return foundData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

function removeDuplicates(array, key) {
  const uniqueKeys = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (!uniqueKeys.has(value)) {
      uniqueKeys.add(value);
      return true;
    }
    return false;
  });
}


function formatDateTimeDDMMYYYY(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export { fetchData };
