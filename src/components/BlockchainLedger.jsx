import React from 'react';
import { Database, Link, CheckCircle, AlertTriangle } from 'lucide-react';

const BlockchainLedger = ({ chain, isValid }) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', minHeight: '350px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem' }}>
          <Database size={28} color="var(--accent-blue)" />
          Verified Blockchain Ledger
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '1rem', fontWeight: 600, color: isValid ? 'var(--success-color)' : 'var(--danger-color)' }}>
          {isValid ? (
            <><CheckCircle size={20} /> Chain Valid</>
          ) : (
            <><AlertTriangle size={20} /> Chain Compromised</>
          )}
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        overflowX: 'auto', 
        display: 'flex', 
        gap: '2rem', 
        paddingBottom: '1rem',
        paddingTop: '0.5rem'
      }}>
        {chain.map((block, index) => (
          <div key={block.hash} style={{ 
            minWidth: '340px',
            background: 'var(--bg-surface)', 
            padding: '1.5rem', 
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            {index > 0 && (
              <div style={{ position: 'absolute', left: '-1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-blue)', zIndex: 1 }}>
                <Link size={24} />
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>Block #{block.index}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {new Date(block.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontSize: '0.8rem' }}>STORED DATA</span>
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  fontFamily: 'monospace', 
                  color: 'var(--success-color)', 
                  overflowWrap: 'break-word', 
                  wordBreak: 'break-all',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}>
                  {JSON.stringify(block.data, null, 2)}
                </div>
              </div>
              
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>PREVIOUS HASH</span>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--warning-color)', overflowWrap: 'break-word', wordBreak: 'break-all', background: 'rgba(245, 158, 11, 0.1)', padding: '6px', borderRadius: '4px' }}>
                  {block.previousHash}
                </div>
              </div>
              
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>BLOCK HASH</span>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent-blue)', overflowWrap: 'break-word', wordBreak: 'break-all', background: 'rgba(59, 130, 246, 0.1)', padding: '6px', borderRadius: '4px' }}>
                  {block.hash}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainLedger;
