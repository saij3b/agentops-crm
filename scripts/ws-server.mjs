import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

console.log('AgentOps WebSocket Server running on port 3001');

const SIMULATED_EVENTS = [
  { type: 'AGENT_TURN', agent: 'Jules', status: 'thinking', task: 'Optimizing database schema' },
  { type: 'AGENT_TURN', agent: 'Jules', status: 'executing', task: 'Optimizing database schema' },
  { type: 'PR_UPDATE', pr: '#21', status: 'opened', title: 'feat: add postgres connection pool' },
  { type: 'AGENT_TURN', agent: 'Codex', status: 'reviewing', pr: '#21' },
  { type: 'APPROVAL_NEEDED', id: 'app-99', description: 'Review security group changes' },
  { type: 'HEARTBEAT', status: 'Operational' }
];

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  let eventIndex = 0;
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      const event = SIMULATED_EVENTS[eventIndex];
      ws.send(JSON.stringify({
        ...event,
        timestamp: new Date().toISOString()
      }));
      eventIndex = (eventIndex + 1) % SIMULATED_EVENTS.length;
    }
  }, 8000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
