import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.route'
import { useSelector } from 'react-redux'
import useAuth from '../feature/auth/Hook/useAuth'
import { useEffect } from 'react'


const App = () => {

 const {handleGetMe}= useAuth()
const loading = useSelector(state => state.auth.loading);
  const user=useSelector(state=> state.auth.user)
//console.log(user)

useEffect(() => {
  
handleGetMe()
 
}, [])

 if (loading) return <div>Loading App...</div>; 

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App