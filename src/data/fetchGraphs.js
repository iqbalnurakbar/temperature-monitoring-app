const fetchData = async (apiConfigurations, targetName) => {
  try {
    let foundData = null;

    for (const config of apiConfigurations) {
      // Cek data apakah sudah ditemukan
      if (foundData) {
        break;
      }

      const response = await fetch(config.url);
      const data = await response.json();
      const channelInfo = data.channel;
      const feeds = data.feeds;

      const generateData = (fieldIndex, timeIndex) => {
        // filter data-data yang tidak valid serta map data sesuai dengan parameter yang dibutuhkan
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

      // Filter array kosong
      const filteredData = result.filter((arr) => arr.length > 0);

      // Menggabungkan banyak array menjadi satu array
      const combinedData = [].concat(...filteredData);

      // Menghapus data yang terduplikasi berdasarkan parameter slaveTime
      const uniqueData = removeDuplicates(combinedData, 'slaveTime');

      const filteredResult = uniqueData.filter((entry) => {
        const formattedMasterTime = formatDateTimeDDMMYYYY(entry.masterTime);
        const formattedSlaveTime = formatDateTimeDDMMYYYY(entry.slaveTime);
        return formattedSlaveTime === formattedMasterTime;
      });

      // Cek data apakah data ditemukan di API saat ini
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

//Fungsi untuk menghapus data duplikat
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

//Formatting tanggal menjadi DD-MM-YYYY
function formatDateTimeDDMMYYYY(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export { fetchData };
