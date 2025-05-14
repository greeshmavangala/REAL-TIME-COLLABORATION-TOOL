

// client/src/App.js
import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const textRef = useRef(null);

  useEffect(() => {
    socket.on('receive-changes', (data) => {
      textRef.current.value = data;
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    socket.emit('send-changes', value);
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Collaborative Text Editor</h2>
      <textarea
        ref={textRef}
        onChange={handleChange}
        style={{ width: '100%', height: '300px' }}
      />
    </div>
  );
}

export default App;
