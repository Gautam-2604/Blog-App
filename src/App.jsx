import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth.js'
import {login, logout} from './store/authSlice'

import './App.css'
import { Footer, Header } from './components'

function App() {
    const [loading, setLoading]= useState(true)
    const dispatch= useDispatch()

    useEffect(()=>{
      authService.getCurrentUser()
        .then((userData)=>{
          if (userData){
            dispatch(login({userData}))
          }
          else{
            dispatch(logout())
          }
        })
        .finally(()=> setLoading(false))
    },[])

  return !loading ? (
    <div className='min-h-screen bg-grey-400 flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <Footer />
      </div>
    </div>
  ):null
}

export default App
