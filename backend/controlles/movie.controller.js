import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingMovie = async (req,res) =>{
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];
        res.json({success:true,content:randomMovie});
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server"});
    }
}

export const getTrailerMovie = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success:true,trailers:data.results});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getDetailMovie = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success:true,content:data});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getSimilarMovie = async (req,res) => {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.json({success:true,similars:data});
    } catch (error) {
        res.status(500).json({message:"can not fech trailer movie"});
    }
}

export const getMovieCategory = async (req,res) => {
    try {
        const {category} = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.json({success:true, content:data});
    } catch (error) {
        res.status(500).json({message:"fail to fetch data"});
    }
}