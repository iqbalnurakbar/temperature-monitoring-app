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
  const values = feeds.map((feed) =>
    feed && feed[`field${fieldIndex}`] !== null
      ? parseFloat(feed[`field${fieldIndex}`])
      : NaN,
  );

  // Filter out NaN values
  const validValues = values.filter((value) => !isNaN(value) && value > 0 && value < 300);

  const minValue = validValues.length > 0 ? Math.min(...validValues) : NaN;
  const maxValue = validValues.length > 0 ? Math.max(...validValues) : NaN;

  const avgValue =
    validValues.length === 0
      ? NaN
      : validValues.reduce((acc, val) => acc + val, 0) / validValues.length;

  const minTimeIndex = validValues.indexOf(minValue);
  const maxTimeIndex = validValues.indexOf(maxValue);

  const minTime =
    minTimeIndex !== -1 && feeds[minTimeIndex]
      ? feeds[minTimeIndex][`field${timeIndex}`]
      : NaN;

  const maxTime =
    maxTimeIndex !== -1 && feeds[maxTimeIndex]
      ? feeds[maxTimeIndex][`field${timeIndex}`]
      : NaN;

  const currentTime =
    values.length > 0 && feeds.length > 0
      ? feeds[feeds.length - 1][`field${timeIndex}`]
      : NaN;

  const currentValue = values.length > 0 ? values[values.length - 1] : NaN;

  const fieldName = channelInfo[`field${fieldIndex}`];

  const startTime =
    values.length > 0 && feeds.length > 0 && values
      ? new Date(feeds[0][`field${timeIndex}`])
      : NaN;

  const endTime =
    values.length > 0 && feeds.length > 0 && values
      ? new Date(feeds[feeds.length - 1][`field${timeIndex}`])
      : NaN;
      

    
  const duration =
    isNaN(startTime) || isNaN(endTime)
      ? { hours: 0, minutes: 0, seconds: 0 }
      : calculateDuration(startTime, endTime);

  return {
    name: fieldName,
    temperature: {
      maximum: isNaN(maxValue) ? "-" : maxValue.toFixed(1),
      minimum: isNaN(minValue) ? "-" : minValue.toFixed(1),
      average: isNaN(avgValue) ? "-" : avgValue.toFixed(1),
      current: isNaN(currentValue) ? "-" : currentValue.toFixed(1),
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

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
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
      temp: count > 0 ? (totalTemperature / count).toFixed(1) : "NaN",
    }),
  );
  return barChartData;
};


export { sensorUtils, calculateStatsWeekly };
