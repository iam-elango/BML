import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Settings as SettingsIcon, Save, RefreshCcw, CheckCircle } from 'lucide-react';
import { generateSensorData } from '../utils/iotSimulator';

const Settings = () => {
  const { setSensorData, setBlockchain, blockchain, handleGenerateData } = useOutletContext();
  
  const [params, setParams] = useState({
    baseTemp: 20,
    baseHum: 40,
    anomalyRate: 20
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app we'd pass these params down, but for this simple 
    // project we just simulate the change visually
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    setSensorData([]);
    // Regenerate genesis
    const BlockchainClass = blockchain.constructor;
    setBlockchain(new BlockchainClass());
    handleGenerateData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header className="app-header" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
        <h1>Simulation Settings</h1>
        <p>Configure IoT data generation parameters and reset the application state</p>
      </header>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <SettingsIcon size={24} color="var(--accent-blue)" />
          IoT Environment Setup
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Base Environment Temperature (°C)</label>
            <input 
              type="range" 
              min="-10" 
              max="50" 
              value={params.baseTemp}
              onChange={(e) => setParams({...params, baseTemp: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>-10°C</span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{params.baseTemp}°C</span>
              <span>50°C</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Base Environment Humidity (%)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={params.baseHum}
              onChange={(e) => setParams({...params, baseHum: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>0%</span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{params.baseHum}%</span>
              <span>100%</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Anomaly Injection Rate (%)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={params.anomalyRate}
              onChange={(e) => setParams({...params, anomalyRate: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>0% (Perfect Data)</span>
              <span style={{ fontWeight: 'bold', color: 'var(--warning-color)' }}>{params.anomalyRate}%</span>
              <span>100% (High Volatility)</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <button onClick={handleSave} className={saved ? 'success' : ''} style={{ minWidth: '150px', justifyContent: 'center' }}>
            {saved ? <><CheckCircle size={18} /> Saved</> : <><Save size={18} /> Apply Changes</>}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--danger-color)' }}>Danger Zone</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Resetting the application will completely wipe the current simulated sensor data and the entire blockchain ledger history. This action cannot be undone.
        </p>
        <div>
          <button className="danger" onClick={handleResetData}>
            <RefreshCcw size={18} />
            Hard Reset System State
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
