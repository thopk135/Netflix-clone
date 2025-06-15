import { Routes,Route } from "react-router-dom"
import { HomePage } from './pages/home/HomePage.jsx'
import { LoginPage } from "./pages/LoginPage.jsx"
import { SignupPage } from "./pages/SignupPage.jsx"
import Footer from "./components/Footers.jsx"
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from "./store/authUser.js"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { WatchPage } from "./pages/home/WatchPage.jsx"
import { SearchPage } from "./pages/home/SearchPage.jsx"
import {  SearchHistoryPage } from "./pages/SearchHistoryPage.jsx"
import { NotFoundPage } from "./pages/404.jsx"

function App() {

  const {user, isCheckingAuth, authCheck} = useAuthStore();
  
  useEffect(() =>{
    authCheck();
  },[authCheck]);

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className='animate-spin text-red-600 w-10 h-10 size-10'></Loader>
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/" />} />
      <Route path="/watch/:id" element={user ? <WatchPage/> : <Navigate to="/login" />}/>
      <Route path="/search" element={user ? <SearchPage/> : <Navigate to="/login" />}/>
      <Route path="/history" element={user ? <SearchHistoryPage/> : <Navigate to="/login" />}/>
      <Route path="/*" element={ <NotFoundPage/>}/>

    </Routes>
    <Footer/>
    <Toaster></Toaster>
    </>
  )
}

export default App
