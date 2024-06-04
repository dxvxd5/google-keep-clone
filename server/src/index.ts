// Import the 'express' module
import express from 'express';
import { noteRouter } from './routes/note.routes';
import { PORT } from './config/env.variable';
import cors from 'cors';

// Create an Express application
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routers
app.use('/note', noteRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
