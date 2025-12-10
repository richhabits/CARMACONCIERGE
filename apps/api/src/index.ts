import { config } from 'dotenv';
import express, { Express, json, Request, Response } from 'express';

// Load environment variables
config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'carmaconcierge-api',
  });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'CARMACONCIERGE API',
    version: '0.1.0',
    endpoints: {
      health: '/health',
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 API server running on http://localhost:${port}`);
});

export default app;
