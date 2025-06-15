import express from 'express'
import { getTrendingTv,getTrailerTv,getDetailTv,getSimilarTv,getTvCategory } from '../controlles/tv.controller.js';

const router = express.Router();

router.get("/trending",getTrendingTv)
router.get(`/:id/trailer`,getTrailerTv)
router.get(`/:id/detail`,getDetailTv)
router.get(`/:id/similar`,getSimilarTv)
router.get(`/:category`,getTvCategory)

export default router;