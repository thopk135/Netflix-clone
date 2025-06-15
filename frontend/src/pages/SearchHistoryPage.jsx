import React, { useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';
import { useEffect } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
function formatDate(dateString) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Return the formatted date string
	return `${month} ${day}, ${year}`;
}

export const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
      } catch (error) {
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  if(searchHistory?.length === 0) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8 items-center flex flex-col h-full'>
          <h1 className='text-4xl font-bold mb-4'>No Search History Found</h1>
          <p className='text-gray-400 text-2xl'>Try searching for something new!</p>
        </div>
      </div>
    )
  }

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      console.error("Error deleting search history entry:", error);
    }
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Search History</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {searchHistory.map((entry) => (
            <div key={entry.id} className='bg-gray-800 p-4 rounded-lg flex items-start gap-2 justify-between'>
              <img src={SMALL_IMG_BASE_URL + entry.image} alt="History image" className='rounded-full size-16 object-cover mr-4' />
              <div className='flex flex-col'>
                <h2 className='text-white text-lg'>{entry.title}</h2>
                <p className='text-gray-400'>{formatDate(entry.createdAt)}</p>
              </div>
              <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto
                ${entry.searchType ==="movie" ? "bg-red-600" : entry.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}>
                  {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>
              <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-500' onClick={() => handleDelete(entry)}></Trash>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
