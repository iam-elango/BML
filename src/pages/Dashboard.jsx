import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import SensorDataGrid from '../components/SensorDataGrid';
import AnomalyDetector from '../components/AnomalyDetector';

const Dashboard = () => {
  const { sensorData, setSensorData, blockchain, setBlockchain, chainValid, setChainValid, handleAddToBlockchain, handleGenerateData, isGenerating } = useOutletContext();

  // Initial generation
  useEffect(() => {
    if (sensorData.length === 0) {
      handleGenerateData();
    }
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>Secure IoT Data Stream</h1>
        <p>Blockchain-Enabled Sensor Security & Machine Learning Anomaly Detection</p>
      </header>

      <div className="dashboard-grid">
        <SensorDataGrid 
          data={sensorData} 
          onGenerate={handleGenerateData} 
          isGenerating={isGenerating} 
        />
        <AnomalyDetector 
          data={sensorData} 
          onAddToBlockchain={handleAddToBlockchain} 
        />
      </div>
    </>
  );
};

export default Dashboard;
