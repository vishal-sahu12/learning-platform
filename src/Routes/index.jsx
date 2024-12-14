import React, { Suspense } from 'react'
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home= lazy(()=> import('../Pages/home'));
const Login= lazy(()=> import('../Pages/login'));
const SignUp= lazy(()=> import('../Pages/signup'));
const Course= lazy(()=> import('../Pages/courseDescription'));
const ForgetPassword = lazy(()=> import('../Pages/forgotPassword'));
const Description = lazy(()=> import('../Pages/courseDescription'));

const Setting= lazy(()=> import('../MenuPages/Setting'));
const Profile= lazy(()=> import('../MenuPages/Profile'));
const ChangePassword= lazy(()=> import('../MenuPages/ChangePassword'));
const BroughtCourses= lazy(()=> import('../MenuPages/BroughtCourses'));
const BuyingCourse = lazy(()=>import('../Pages/buyingCourse'));



const AppRoutes = () => {
  return (
    <Suspense fallback={<div>...Loading....</div>}>
         <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='home' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='/course/:id' element={<Course/>}/>
        <Route path='forget-password' element={<ForgetPassword/>}/>
        <Route path='setting' element={<Setting/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='courses' element={<BroughtCourses/>}/>
        <Route path='change-password' element={<ChangePassword/>}/>
        <Route path='bu' element={<Description/>}/>


        </Routes>
    </Suspense>
   
  )
}

export default AppRoutes;