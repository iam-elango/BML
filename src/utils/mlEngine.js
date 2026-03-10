// A simple rule-based model to classify "anomalies".
// In a real scenario, this would evaluate properties against a trained ML model.

const THRESHOLDS = {
  temperature: { min: -10, max: 45 },
  humidity: { min: 10, max: 80 }
};

export const detectAnomaly = (data) => {
  const reasons = [];
  
  if (data.temperature < THRESHOLDS.temperature.min || data.temperature > THRESHOLDS.temperature.max) {
    reasons.push(`Temperature out of bounds (${data.temperature}°C)`);
  }
  
  if (data.humidity < THRESHOLDS.humidity.min || data.humidity > THRESHOLDS.humidity.max) {
    reasons.push(`Humidity out of bounds (${data.humidity}%)`);
  }

  const isAnomalous = reasons.length > 0;
  
  return {
    ...data,
    isAnomalous,
    anomalyReasons: isAnomalous ? reasons : ['Normal reading'],
    confidenceScore: isAnomalous ? 0.95 : 0.99 // Simulated confidence score
  };
};
