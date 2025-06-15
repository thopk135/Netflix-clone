import express from 'express'
import { getTrendingMovie,getTrailerMovie,getDetailMovie,getSimilarMovie,getMovieCategory } from '../controlles/movie.controller.js';

const router = express.Router();

router.get("/trending",getTrendingMovie)
router.get(`/:id/trailer`,getTrailerMovie)
router.get(`/:id/detail`,getDetailMovie)
router.get(`/:id/similar`,getSimilarMovie)
router.get(`/:category`,getMovieCategory)


export default router;