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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}
app.listen(5000, () => {
    connectMongoDB();
}); 
