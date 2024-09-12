
import React from 'react';
import poster from '../Utils/poster.png'; // Replace this with your own image path

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-5 space-y-5 md:space-y-0 md:space-x-5">
      {/* Left Side Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img src={poster} alt="Sign Up Illustration" className="w-full max-w-sm md:max-w-full h-auto" />
      </div>

      {/* Right Side Form */}
      <div className="w-1/3 md:w-1/3 bg-white p-6 md:p-10 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center md:text-left">
          Sign up and start learning
        </h1>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full name"
              className="mt-1 block w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="mt-1 block w-3/4  p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="mt-1 block w-3/4  p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="offers"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="offers" className="ml-2 block text-sm text-gray-700">
              Send me special offers, personalized recommendations, and learning tips.
            </label>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-1/2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 mt-6 text-center md:text-left">
          By signing up, you agree to our{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="mt-4 text-gray-600 text-center md:text-left">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
