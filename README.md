# TKT Passkey Entry

Standalone React application for passkey verification.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3002`

## Configuration

Edit `src/components/PasskeyPage.jsx`:

- **API Base URL** (line 3): Change `http://localhost:3000/api/v1`
- **Redirect URL** (line 39): Change from `https://google.com`
- **Logo** (line 50): Replace `/logo.png` with actual logo path

## Backend API

Expected endpoint:

```
POST /api/v1/verify-passkey
Content-Type: application/json

{
  "passkey": "0000"
}

Response (success):
{
  "success": true
}

Response (error):
{
  "success": false,
  "message": "Invalid passkey"
}
```

## Build

```bash
npm run build
```

Output in `dist/`
