require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSKEY = process.env.PASSKEY;
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(express.json());

app.post('/api/v1/verify-passkey', (req, res) => {
  const { passkey } = req.body;

  if (!passkey) {
    return res.status(400).json({ success: false, message: 'Passkey required' });
  }

  if (passkey !== PASSKEY) {
    console.log('passkey', passkey);
    console.log('PASSKEY', PASSKEY);
    return res.status(401).json({ success: false, message: 'Invalid passkey. Please try again.' });
  }

  return res.json({ success: true });
});

if (!isDev) {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${isDev ? 'development' : 'production'}]`);
});
