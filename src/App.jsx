import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import { generateSensorData } from './utils/iotSimulator';
import { Blockchain, Block } from './utils/blockchain';

function App() {
  // Shared Application State
  const [sensorData, setSensorData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [blockchain, setBlockchain] = useState(() => new Blockchain());
  const [chainValid, setChainValid] = useState(true);

  // Common Action Handlers
  const handleGenerateData = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReadings = Array.from({ length: 6 }, generateSensorData);
      setSensorData(newReadings);
      setIsGenerating(false);
    }, 600);
  };

  const handleAddToBlockchain = (verifiedData) => {
    const newBlockchain = Object.assign(
      Object.create(Object.getPrototypeOf(blockchain)), 
      blockchain
    );
    newBlockchain.chain = [...blockchain.chain];
    
    const latestBlock = newBlockchain.getLatestBlock();
    const newBlock = new Block(
      latestBlock.index + 1,
      new Date().toISOString(),
      verifiedData,
      latestBlock.hash
    );
    
    newBlockchain.addBlock(newBlock);
    
    setBlockchain(newBlockchain);
    setChainValid(newBlockchain.isChainValid());
    
    setSensorData(prev => prev.filter(d => d.id !== verifiedData.id));
  };

  return (
    <>
      <TopNav />
      {/* Add top padding so content doesn't stuck under the fixed top nav */}
      <div className="app-container" style={{ paddingTop: '80px' }}>
        <Outlet context={{
          sensorData, setSensorData,
          isGenerating, handleGenerateData,
          blockchain, setBlockchain,
          chainValid, setChainValid,
          handleAddToBlockchain
        }} />
      </div>
    </>
  );
}

export default App;
