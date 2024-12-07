import React from 'react'; // Ensure this is at the top of your file
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import axios
import poster from '../Utils/poster.png'; // Replace with your image path

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'student'
    },
    validationSchema,
    onSubmit: async (values) => {
      const { name, email, password, role } = values;

      try {
        const response = await axios.post('http://localhost:3000/users/signup', { name, email, password, role });
        console.log('Success:', response.data);
        navigate("/home");
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // Determine if the form is valid for enabling the button
  const isFormValid = formik.values.password && formik.values.email && formik.values.name;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-5 space-y-5 md:space-y-0 md:space-x-5">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img src={poster} alt="Sign Up Illustration" className="w-full max-w-sm md:max-w-full h-auto" />
      </div>

      <div className="w-1/3 md:w-1/3 bg-white p-6 md:p-10 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center md:text-left">
          Sign up and start learning
        </h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 block w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 block w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-2 block w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-1/2 p-3 text-white rounded-lg ${isFormValid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-4 text-gray-600 text-center md:text-left">
          Already have an account?{' '}
          <Link className="text-purple-600 hover:underline" to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
