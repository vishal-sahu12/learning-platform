import React, { Suspense } from 'react'
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home= lazy(()=> import('../Pages/home'));
const Login= lazy(()=> import('../Pages/login'));
const SignUp= lazy(()=> import('../Pages/signup'));
const Course= lazy(()=> import('../Pages/courseDescription'));
const ForgetPassword = lazy(()=> import('../Pages/forgotPassword'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>...Loading....</div>}>
         <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='course' element={<Course/>}/>
        <Route path='forget-password' element={<ForgetPassword/>}/>
        </Routes>
    </Suspense>
   
  )
}

export default AppRoutes;