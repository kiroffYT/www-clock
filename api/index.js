const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const options = {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  const parts = formatter.formatToParts(new Date());

  const getValue = (type) => parts.find(p => p.type === type).value;
  const timeStr = `${getValue('hour')}:${getValue('minute')}:${getValue('second')}`;
  const dateStr = `${getValue('day')}.${getValue('month')}.${getValue('year')}`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100" width="350" height="100%">
      <style>
        .bg { fill: #1e1e2e; }
        .time { font-family: 'Segoe UI', -apple-system, sans-serif; font-size: 38px; fill: #f5c2e7; font-weight: bold; }
        .date { font-family: 'Segoe UI', -apple-system, sans-serif; font-size: 16px; fill: #bac2de; letter-spacing: 3px; }
      </style>
      <rect width="100%" height="100%" rx="12" class="bg"/>
      <text x="50%" y="48" text-anchor="middle" class="time">${timeStr}</text>
      <text x="50%" y="80" text-anchor="middle" class="date">${dateStr}</text>
    </svg>
  `;

  res.send(svg);
});

module.exports = app;
