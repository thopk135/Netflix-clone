import express from 'express'
import { searchMovie,searchPeople,searchTv,getSearchHistory,deleteSearchHistory } from '../controlles/search.controller.js';

const router = express.Router();

router.get("/person/:query",searchPeople);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",getSearchHistory);
router.delete("/history/:idDelete",deleteSearchHistory);


export default router;