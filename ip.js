// server.js
const express = require('express');
const os = require('os');
const app = express();

app.set('trust proxy', true); // keep true on cloud/proxy hosts

function getLocalIPs() {
  const nets = os.networkInterfaces();
  const results = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      results.push({
        iface: name,
        address: net.address,
        family: net.family,
        internal: net.internal
      });
    }
  }
  return results;
}

function extractClientIp(req) {
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp) return cfIp;

  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();

  const raw = req.socket?.remoteAddress || req.connection?.remoteAddress || '';
  if (!raw) return 'unknown';

  if (raw.startsWith('::ffff:')) return raw.split('::ffff:')[1];
  if (raw === '::1') return '127.0.0.1';
  return raw;
}

// Returns a clear timestamp string: IST human readable + ISO (UTC)
function formatTimestamp(date = new Date()) {
  // Human-friendly IST string
  const humanIST = date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  // ISO string in UTC for unambiguous logs
  const isoUTC = date.toISOString(); // e.g. 2025-11-03T13:45:30.000Z

  return `${humanIST} (IST) — ${isoUTC}`;
}

app.get('/', (req, res) => {
  const clientIp = extractClientIp(req);
  const timestamp = formatTimestamp();

  // Console log with timestamp string
  console.log(`${timestamp} - Visitor IP: ${clientIp} - URL: ${req.originalUrl}`);

  res.send(`
    <h3>Your IP as seen by server: ${clientIp}</h3>
    <p><strong>Timestamp:</strong> ${timestamp}</p>
    <h4>Server local network addresses</h4>
    <pre>${JSON.stringify(getLocalIPs(), null, 2)}</pre>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
  console.log('Local non-internal addresses:');
  console.log(getLocalIPs().filter(i => !i.internal));
});
