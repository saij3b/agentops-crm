import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

console.log('AgentOps WebSocket Server running on port 3001');

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Periodic status heartbeats
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: 'HEARTBEAT',
        timestamp: new Date().toISOString(),
        status: 'Operational'
      }));
    }
  }, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
