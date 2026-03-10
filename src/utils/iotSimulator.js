export const generateSensorData = () => {
  const deviceIds = ['SENSOR-A1', 'SENSOR-B2', 'SENSOR-C3', 'SENSOR-D4'];
  const baseTemp = 20; // Base temperature in Celsius
  const baseHum = 40;  // Base humidity percentage

  // Introduce a 20% chance of generating anomalous data
  const isAnomalous = Math.random() < 0.2;

  let temperature, humidity;

  if (isAnomalous) {
    // Generate clearly out-of-bounds readings
    temperature = baseTemp + (Math.random() > 0.5 ? 40 : -30) + (Math.random() * 10);
    humidity = baseHum + (Math.random() > 0.5 ? 50 : -40) + (Math.random() * 10);
  } else {
    // Normal fluctuations
    temperature = baseTemp + (Math.random() * 15 - 5); // 15 to 30
    humidity = baseHum + (Math.random() * 20 - 10); // 30 to 50
  }

  return {
    id: crypto.randomUUID(), // Unique ID for the reading
    deviceId: deviceIds[Math.floor(Math.random() * deviceIds.length)],
    temperature: parseFloat(temperature.toFixed(2)),
    humidity: parseFloat(humidity.toFixed(2)),
    timestamp: new Date().toISOString(),
  };
};
