import express from 'express';

// Import the specific functions from your database logic file
import { 
    getPropsByClst, 
    getPropsByLoc 
} from '../db/queries.js'; // Adjust path if needed

const router = express.Router();

// Define the routes using the router instance
router.get('/props/clst/:clst', getPropsByClst);
router.get('/props/xy/:lng/:lat/:cnt', getPropsByLoc);

// Export the configured router to be used by server.js
export default router;