import express from 'express'
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"
import connectMongoDB from './db/connectMongoDB.js';
import dotenv from 'dotenv'
import { protectRoute } from './middleware/protectRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, async () => {
    try {
        await connectMongoDB();
        console.log(`Server running on : http://localhost:${PORT}`);
    } catch (err) {
        console.error(" Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}); 
