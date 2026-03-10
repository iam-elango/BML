import React from 'react';
import { Activity, Thermometer, Droplets, Clock, Hash } from 'lucide-react';

const SensorDataGrid = ({ onGenerate, data, isGenerating }) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', maxHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem' }}>
          <Activity size={28} color="var(--accent-blue)" />
          IoT Sensor Hub
        </h2>
        <button onClick={onGenerate} disabled={isGenerating}>
          <Activity size={18} />
          {isGenerating ? 'Polling...' : 'Poll Sensor Data'}
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
        {data.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
            <Activity size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>No sensor polling initiated.</p>
            <p>Click "Poll Sensor Data" to simulate readings.</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '16px', 
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderLeft: `4px solid ${item.temperature > 35 || item.humidity > 60 || item.temperature < 0 || item.humidity < 20 ? 'var(--warning-color)' : 'var(--success-color)'}`,
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
                  <Hash size={16} color="var(--text-secondary)" /> {item.deviceId}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} />
                  {new Date(item.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', fontSize: '1.1rem' }}>
                  <Thermometer size={20} color={item.temperature > 35 || item.temperature < 0 ? 'var(--danger-color)' : 'var(--text-primary)'} />
                  {item.temperature}°C
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', fontSize: '1.1rem' }}>
                  <Droplets size={20} color={item.humidity > 60 || item.humidity < 20 ? 'var(--danger-color)' : 'var(--accent-blue)'} />
                  {item.humidity}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SensorDataGrid;
