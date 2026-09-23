require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const PASSKEY = process.env.PASSKEY;
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  app.use(cors({ origin: 'http://localhost:3002', credentials: true }));
}

app.use(express.json());

const COOKIE_NAME = 'tkt_access';
const SESSION_MS = 30 * 60 * 1000;
const SESSION_SECRET = process.env.SESSION_SECRET || PASSKEY;

const sign = (value) => crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex');

function createToken() {
  const exp = String(Date.now() + SESSION_MS);
  return `${exp}.${sign(exp)}`;
}

function isValidToken(token) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const actual = Buffer.from(sig);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function getCookie(req, name) {
  const match = (req.headers.cookie || '')
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

app.get('/api/v1/session', (req, res) => {
  res.json({ success: isValidToken(getCookie(req, COOKIE_NAME)) });
});

app.post('/api/v1/verify-passkey', (req, res) => {
  const { passkey } = req.body;

  if (!passkey) {
    return res.status(400).json({ success: false, message: 'Passkey required' });
  }

  if (passkey !== PASSKEY) {
    return res.status(401).json({ success: false, message: 'Invalid passkey. Please try again.' });
  }

  res.cookie(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    maxAge: SESSION_MS,
    path: '/',
  });
  return res.json({ success: true });
});

if (!isDev) {
  const distPath = path.join(__dirname, '../dist');
  // Homepage code chunk: only served with a valid access cookie.
  app.use(
    '/private',
    (req, res, next) => {
      if (!isValidToken(getCookie(req, COOKIE_NAME))) return res.status(401).end();
      res.set('Cache-Control', 'private, no-store');
      next();
    },
    express.static(path.join(distPath, 'private'))
  );
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${isDev ? 'development' : 'production'}]`);
});
