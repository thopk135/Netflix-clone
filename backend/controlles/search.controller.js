import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";
import { response } from "express";

export const searchPeople = async (req , res) => {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0 ) return res.status(400).json("Person not found");

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory:{ 
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType:"person",
                    createdAt: new Date(),
                },
            },
        })

        res.status(200).json({content:data});
    } catch (error) {
        return res.status(500).json({message:"Internal server"})
    }
}

export const searchMovie = async (req , res) => {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0 ) return res.status(400).json("Movie not found");

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory:{ 
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                },
            },
        })

        res.status(200).json({content:data});
    } catch (error) {
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const searchTv = async (req , res) => {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0 ) return res.status(400).json("Tv not found");

        await User.findByIdAndUpdate(req.user._id,{
            $push: {
                searchHistory:{ 
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType:"tv",
                    createdAt: new Date(),
                },
            },
        })

        res.status(200).json({content:data});
    } catch (error) {
        return res.status(500).json({message:"Internal server Error"})
    }
}

export const getSearchHistory = async (req , res) =>{
    const id = req.user._id;
    try {
        const user = await User.findById(id);
        if(!user) return res.status(400).json("User not found");

        return res.status(200).json({success:true, content:user.searchHistory});
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal server error"});
    }
}

export const deleteSearchHistory = async (req, res) => {
    let { idDelete } = req.params;
    idDelete = parseInt(idDelete);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: idDelete },
            },
        });

        res.status(200).json({ success: true, message: "Removed item successfully" });
    } catch (error) {
        console.error("DELETE SEARCH HISTORY ERROR: ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
