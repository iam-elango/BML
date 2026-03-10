import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Search, Database, Fingerprint, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import BlockchainLedger from '../components/BlockchainLedger';

const BlockchainExplorer = () => {
  const { blockchain, chainValid } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChain = blockchain.chain.filter(block => 
    block.hash.includes(searchTerm) || 
    block.previousHash.includes(searchTerm) ||
    JSON.stringify(block.data).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header className="app-header" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
        <h1>Blockchain Explorer</h1>
        <p>Inspect blocks, verify cryptographic hashes, and search ledger data</p>
      </header>

      <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Blocks</span>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={24} color="var(--accent-blue)" />
              {blockchain.chain.length}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Network Status</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: chainValid ? 'var(--success-color)' : 'var(--danger-color)' }}>
              {chainValid ? <><CheckCircle size={24} /> Secure</> : <><AlertTriangle size={24} /> Compromised</>}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '0.5rem 1rem', border: '1px solid var(--border-color)' }}>
          <Search size={20} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search by block hash, previous hash, or data..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              width: '100%', 
              padding: '0.5rem',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredChain.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
            <Search size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <h3>No blocks found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <BlockchainLedger chain={filteredChain} isValid={chainValid} />
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
