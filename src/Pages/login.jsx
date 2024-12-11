import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify'; // Assuming you're using toast for notifications

import poster from '../Utils/poster.png'; // Replace with your image path

const Login = () => {
  const navigate = useNavigate(); // Assuming you're using react-router for navigation

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required.'),
    password: Yup.string().required('Password is required.')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/users/login', values, {
          headers: {
            'Content-Type': 'application/json'
          }
          

        });

        if (response.status === 200) {
          console.log(response);
          
          const userData = response.data.UserInfo;
         
          
       
          
          // Store the token in local storage
          localStorage.setItem('user', JSON.stringify(userData));
          
          // toast.success('Login successful!', {
          //   position: 'top-right'
          // });
          // console.log('Login successful:',userData );
          navigate('/home');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(`Error: ${error.response.data.message || 'Username or Password is incorrect'}`, {
            position: 'top-right'
          });
        } else {
          console.error('Error during login:', error);
          toast.error('Network error. Please try again later.', {
            position: 'top-right'
          });
        }
      }
    }
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side Image */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-6">
        <img src={poster} alt="Login Illustration" className="max-w-xs md:max-w-md" />
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-50 p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Log in to continue your learning journey
          </h2>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}

              <label htmlFor="password" className="mt-3 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Log in button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
              >
                <i className="fas fa-envelope mr-2"></i>
                Login
              </button>
            </div>

            <p className="flex justify-center">or
              <Link className="text-purple-700 underline font-bold ml-1" to="/forget-password">Forget Password</Link>
            </p>
          </form>

          {/* Divider with "Other log in options" */}
          <div className="flex items-center justify-evenly space-x-2 my-6">
            <span className="w-3/4 h-px bg-gray-300"></span>
            <span className="w-full text-sm text-gray-500">Other log in options</span>
            <span className="w-3/4 h-px bg-gray-300"></span>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full hover:bg-gray-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link className="text-purple-500 hover:underline font-bold" to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
