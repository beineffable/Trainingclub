// src/pages/api/health.js
/**
 * Health check endpoint
 * Used to verify the API is running correctly
 */
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
