const sensorUtils = async (apiConfigurations) => {
  try {
    const results = await Promise.all(
      apiConfigurations.map(async (config) => {
        const response = await fetch(config.url);
        const data = await response.json();
        const channelInfo = data.channel;
        const feeds = data.feeds;

        return config.fieldIndices.map((fieldIndex, index) =>
          calculateStatistics(
            fieldIndex,
            config.timeIndices[index],
            channelInfo,
            feeds,
          ),
        );
      }),
    );

    const mergedResults = results.reduce((merged, apiResults) => {
      apiResults.forEach((result) => {
        const sensorName = result.name;
        if (!merged[sensorName]) {
          merged[sensorName] = result;
        } else {
          Object.keys(result).forEach((key) => {
            if (typeof result[key] === "object") {
              merged[sensorName][key] = {
                ...merged[sensorName][key],
                ...result[key],
              };
            } else {
              merged[sensorName][key] = result[key];
            }
          });
        }
      });
      return merged;
    }, {});
    return mergedResults;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const calculateStatistics = (fieldIndex, timeIndex, channelInfo, feeds) => {
  const filteredValues = feeds
    .filter(
      (feed) =>
        feed &&
        feed[`field${fieldIndex}`] !== null &&
        parseFloat(feed[`field${fieldIndex}`]) > 0 &&
        parseFloat(feed[`field${fieldIndex}`]) < 300,
    )
    .map((feed) => ({
      temp: parseFloat(feed[`field${fieldIndex}`]).toFixed(1),
      slaveTime: feed[`field${timeIndex}`],
      masterTime: feed.created_at,
    }));

  const validValues = filteredValues.filter((entry) => {
    const formattedMasterTime = formatDateTimeDDMMYYYY(entry.masterTime)
    const formattedSlaveTime = formatDateTimeDDMMYYYY(entry.slaveTime)
    return formattedSlaveTime === formattedMasterTime
  });

  const uniqueValidValues = removeDuplicates(validValues, 'slaveTime');
  const tempValues = uniqueValidValues.map((entry) => parseFloat(entry.temp));

  const minValue = tempValues.length > 0 ? Math.min(...tempValues) : NaN;
  const maxValue = tempValues.length > 0 ? Math.max(...tempValues) : NaN;

  const avgValue =
    tempValues.length === 0
      ? NaN
      : tempValues.reduce((acc, val) => acc + val, 0) / tempValues.length;

  const minTimeIndex = tempValues.indexOf(minValue);
  const maxTimeIndex = tempValues.indexOf(maxValue);

  const minTime =
    minTimeIndex !== -1 && uniqueValidValues[minTimeIndex]
      ? uniqueValidValues[minTimeIndex].slaveTime
      : NaN;

  const maxTime =
    maxTimeIndex !== -1 && uniqueValidValues[maxTimeIndex]
      ? uniqueValidValues[maxTimeIndex].slaveTime
      : NaN;

  const currentTime =
    tempValues.length > 0 && uniqueValidValues.length > 0
      ? uniqueValidValues[uniqueValidValues.length - 1].slaveTime
      : NaN;

  const currentValue =
    tempValues.length > 0 ? tempValues[tempValues.length - 1] : NaN;

  const fieldName = channelInfo[`field${fieldIndex}`];

  const startTime =
    tempValues.length > 0 && uniqueValidValues.length > 0
      ? new Date(uniqueValidValues[0].slaveTime)
      : NaN;

  const endTime =
    tempValues.length > 0 && uniqueValidValues.length > 0
      ? new Date(uniqueValidValues[uniqueValidValues.length - 1].slaveTime)
      : NaN;

  const duration =
    isNaN(startTime) || isNaN(endTime)
      ? { hours: 0, minutes: 0, seconds: 0 }
      : calculateDuration(startTime, endTime);

  return {
    name: fieldName,
    temperature: {
      maximum: isNaN(maxValue) ? "-" : maxValue.toFixed(2),
      minimum: isNaN(minValue) ? "-" : minValue.toFixed(2),
      average: isNaN(avgValue) ? "-" : avgValue.toFixed(2),
      current: isNaN(currentValue) ? "-" : currentValue.toFixed(2),
    },
    timestamp: {
      maximum: isNaN(maxValue) ? getCurrentDateTime() : formatDateTime(maxTime),
      minimum: isNaN(minValue) ? getCurrentDateTime() : formatDateTime(minTime),
      current: isNaN(currentValue)
        ? getCurrentDateTime()
        : formatDateTime(currentTime),
    },
    duration: duration,
  };
};

const calculateDuration = (startTime, endTime) => {
  if (isNaN(startTime) || isNaN(endTime)) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const durationInMilliseconds = endTime - startTime;
  const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
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

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDateTimeDDMMYYYY(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const getCurrentDateTime = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDateTime;
};

const calculateStatsWeekly = (dataGraph) => {
  const dailyAverages = {};

  dataGraph.forEach((entry) => {
    const { time, temp } = entry;
    dailyAverages[time] = dailyAverages[time] || {
      totalTemperature: 0,
      count: 0,
    };
    if (!isNaN(temp)) {
      dailyAverages[time].totalTemperature += parseFloat(temp);
      dailyAverages[time].count++;
    }
  });

  const barChartData = Object.entries(dailyAverages).map(
    ([time, { totalTemperature, count }]) => ({
      time,
      temp: count > 0 ? (totalTemperature / count).toFixed(2) : "NaN",
    }),
  );
  return barChartData;
};

export { sensorUtils, calculateStatsWeekly };
