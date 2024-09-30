# Express.js Prometheus Monitoring Sample

This project is a sample Express.js application with Prometheus monitoring integration.

## Prerequisites

- Node.js 14.x or higher
- npm (Node package manager)
- Postman (optional, for testing API endpoints)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/rslim087a/express-prometheus-monitoring-sample
   cd express-prometheus-monitoring-sample
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application, use the following command:

```
npm start
```

The application will start and be available at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `GET /`: Root endpoint
- `POST /items`: Create a new item
- `GET /items/{item_id}`: Retrieve an item
- `PUT /items/{item_id}`: Update an item
- `DELETE /items/{item_id}`: Delete an item
- `GET /metrics`: Prometheus metrics endpoint

## Testing with Postman

A Postman collection is provided for testing the API endpoints. To use it:

1. Open Postman
2. Click on "Import" and select the `express-metrics-postman-collection.json` file
3. The collection "Express Metrics App" will be added to your Postman workspace
4. You can now use the requests to test each endpoint

## Monitoring

The application exposes Prometheus metrics at the `/metrics` endpoint. You can configure your Prometheus server to scrape these metrics for monitoring.

## Development

If you want to make changes to the project:

1. Make your changes to the `app.js` file or other relevant files.
2. Restart the application to see your changes.

## Troubleshooting

If you encounter any issues:

1. Ensure you're using Node.js 14.x or higher:
   ```
   node --version
   ```

2. Make sure all dependencies are correctly installed:
   ```
   npm install
   ```

3. Check that you're in the correct directory and running the application with `npm start`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
