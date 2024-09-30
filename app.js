const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 3000;

// Enable JSON parsing for incoming requests
app.use(express.json());

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'express-prometheus-monitoring-sample'
});

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Define custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

// In-memory storage for items
const items = {};

// Middleware to measure request duration
app.use((req, res, next) => {
  const start = process.hrtime();
  
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;
    
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.path, res.statusCode)
      .observe(durationInSeconds);
  });
  
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/items', (req, res) => {
  const item = req.body;
  const itemId = Object.keys(items).length + 1;
  items[itemId] = item.name;
  res.json({ item_id: itemId, name: item.name, status: 'created' });
});

app.get('/items/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  if (!(itemId in items)) {
    return res.status(404).json({ detail: 'Item not found' });
  }
  res.json({ item_id: itemId, name: items[itemId] });
});

app.put('/items/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  if (!(itemId in items)) {
    return res.status(404).json({ detail: 'Item not found' });
  }
  const item = req.body;
  items[itemId] = item.name;
  res.json({ item_id: itemId, name: item.name, status: 'updated' });
});

app.delete('/items/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  if (!(itemId in items)) {
    return res.status(404).json({ detail: 'Item not found' });
  }
  delete items[itemId];
  res.json({ item_id: itemId, status: 'deleted' });
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});