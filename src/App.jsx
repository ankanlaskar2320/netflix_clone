import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';
import { auth } from './firebase'



const firebaseConfig = {
  apiKey: "AIzaSyAcaPYbr07Ct3iBVGquHB7BD0rrgNZ3neA",
  authDomain: "netflix-clone-22465.firebaseapp.com",
  databaseURL: "https://netflix-clone-22465-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "netflix-clone-22465",
  storageBucket: "netflix-clone-22465.firebasestorage.app",
  messagingSenderId: "711775919831",
  appId: "1:711775919831:web:3058841b46cfbf85985a92"
};

const App = () => {

  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged In");
        navigate('/')
      }else{
        console.log("Logged Out");
        navigate('/login')
      }
    })
  },[])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
