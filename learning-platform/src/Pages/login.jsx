import React from 'react';
import poster from '../Utils/poster.png'; // Replace with your image path

const Login = () => {
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

          <form className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Log in with email button */}
           <div className='flex justify-center'>
           <button
              type="submit"
              className="w-1/2 bg-purple-600  text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
              <i className="fas fa-envelope mr-2"></i>
              Login
            </button>
           </div>
          </form>

          {/* Divider with "Other log in options" */}
          <div className="flex items-center justify-evenly space-x-2 my-6">
            <span className="w-full h-px bg-gray-300"></span>
            <span className="text-sm text-gray-500">Other log in options</span>
            <span className="w-full h-px bg-gray-300"></span>
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
              <a href="/signup" className="text-purple-600 hover:underline">
                Sign up
              </a>
            </p>
            <p className="mt-2">
              <a href="#" className="text-purple-600 hover:underline">
                Log in with your organization
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
