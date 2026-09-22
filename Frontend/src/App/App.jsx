import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.route'
import { useSelector } from 'react-redux'
import useAuth from '../feature/auth/Hook/useAuth'
import { useEffect } from 'react'


const App = () => {

 const {handleGetMe}= useAuth()

  const user=useSelector(state=> state.auth.user)
console.log(user)

useEffect(() => {
  
handleGetMe()
 
}, [])



  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App