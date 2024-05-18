// Import the 'express' module
import express from 'express';
import { noteRouter } from './routes/note.routes';
import { PORT } from './config/env.variable';

// Create an Express application
const app = express();

// Set the port number for the server

// // Define a route for the root path ('/')
// app.get('/', (req, res) => {
//   // Send a response to the client
//   res.send('Hello, TypeScript + Node.js + Express! + tmp');
// });
app.use(express.json());
app.use('/note', noteRouter);
// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});
