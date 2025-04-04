import express from 'express';
import mongoose from 'mongoose';
import articleRoutes from './routes/articles';

const app = express();
// Start with port 4000 and try others if busy
let PORT = 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/articles', articleRoutes);

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/blog-app';

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    const tryPort = (port: number) => {
      try {
        const server = app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
          // Update the PORT variable to the actual port being used
          PORT = port;
        });
        
        server.on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}`);
            tryPort(port + 1);
          } else {
            console.error('Server error:', err);
          }
        });
      } catch (err) {
        console.error('Error starting server:', err);
      }
    };
    
    // Start with the initial port
    tryPort(PORT);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

startServer(); 