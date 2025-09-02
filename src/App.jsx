import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import NuclearFissionComponent, { FissionControls } from './NuclearFissionComponent';

function App() {
  const [maxFissions, setMaxFissions] = useState(10);
  const [currentFissions, setCurrentFissions] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleFissionOccurred = () => {
    setCurrentFissions(prev => prev + 1);
  };

  const handleIncrementMax = () => {
    setMaxFissions(prev => prev + 1);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleReset = () => {
    setCurrentFissions(0);
    setIsPlaying(false);
    setResetKey(prev => prev + 1);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <FissionControls 
        maxFissions={maxFissions}
        currentFissions={currentFissions}
        isPlaying={isPlaying}
        onIncrementMax={handleIncrementMax}
        onReset={handleReset}
        onPlayPause={handlePlayPause}
      />
      
      <Canvas camera={{ position: [3, 3, 3] }}>
        <NuclearFissionComponent
          key={resetKey}
          maxFissions={maxFissions}
          currentFissions={currentFissions}
          isPlaying={isPlaying}
          onFissionOccurred={handleFissionOccurred}
        />
      </Canvas>
    </div>
  );
}

export default App;