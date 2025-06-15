import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingTv = async (req,res) =>{
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];
        res.json({success:true,content:randomMovie});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server"});
    }
}

export const getTrailerTv = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({success:true,trailers:data.results});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getDetailTv = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({success:true,content:data});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getSimilarTv = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({success:true,similars:data});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getTvCategory = async (req,res) => {
    try {
        const {category} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.json({success:true, content:data});
    } catch (error) {
        res.status(500).json({message:"fail to fetch data"});
    }
}