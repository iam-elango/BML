import React, { useMemo } from 'react';
import { ShieldAlert, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { detectAnomaly } from '../utils/mlEngine';

const AnomalyDetector = ({ data, onAddToBlockchain }) => {
  // Process the incoming data through the ML engine
  const processedData = useMemo(() => {
    return data.map(item => detectAnomaly(item));
  }, [data]);

  const normalData = processedData.filter(d => !d.isAnomalous);
  const anomalousData = processedData.filter(d => d.isAnomalous);

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', maxHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem' }}>
          <Cpu size={28} color="var(--accent-blue)" />
          ML Anomaly Engine
        </h2>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--success-color)' }}>Normal: {normalData.length}</span>
          <span style={{ color: 'var(--danger-color)' }}>Anomalies: {anomalousData.length}</span>
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
        {processedData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
            <Cpu size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Waiting for data feed...</p>
          </div>
        ) : (
          processedData.map((item, index) => (
            <div key={`${item.id}-ml`} style={{ 
              background: 'rgba(255,255,255,0.05)', 
              padding: '16px', 
              borderRadius: '12px',
              border: `1px solid ${item.isAnomalous ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.isAnomalous ? (
                    <ShieldAlert size={20} color="var(--danger-color)" />
                  ) : (
                    <ShieldCheck size={20} color="var(--success-color)" />
                  )}
                  <strong style={{ color: item.isAnomalous ? 'var(--danger-color)' : 'var(--success-color)' }}>
                    {item.isAnomalous ? 'Anomaly Detected' : 'Verified Normal'}
                  </strong>
                </div>
                <div style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                  Conf: {(item.confidenceScore * 100).toFixed(0)}%
                </div>
              </div>
              
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {item.anomalyReasons.map((reason, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} /> 
                    {reason}
                  </div>
                ))}
              </div>

              {!item.isAnomalous && (
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="success"
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                    onClick={() => onAddToBlockchain(item)}
                  >
                    Add to Blockchain <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnomalyDetector;
