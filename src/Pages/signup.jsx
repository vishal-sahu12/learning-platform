import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import poster from '../Utils/poster.png';

const Signup = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState('');
  const [modalData, setModalData] = useState({
    profileType: '',
    fullName: '',
    mobileNo: '',
    educationLevel: '',
    instituteName: '',
    otherCourse: '',
  });

  // Step 1: Signup Form Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, 'Only alphabets are allowed')
      .required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: () => {
      setShowModal(true); // Show modal after first form submission
    },
  });

  // Step 2: Handle modal form input changes
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
    setErrors(''); // Reset errors on change
  };

  // Step 3: Modal Validation & Data Submission
  const handleModalSubmit = async () => {
    const { fullName, mobileNo, profileType, educationLevel, instituteName, otherCourse } = modalData;

    if (!/^[a-zA-Z ]+$/.test(fullName)) {
      setErrors('Full name must contain only alphabets.');
      return;
    }
    if (!/^\d{10}$/.test(mobileNo)) {
      setErrors('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!profileType || !educationLevel || !instituteName  || !mobileNo ) {
      setErrors('All fields are required.');
      return;
    }

    try {
      const userData = {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        ...modalData,
      };
      const response = await axios.post('http://localhost:3000/users/signup', userData);
      console.log('Signup successful:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors('Something went wrong.'+ error);
    }
  };

  // Step 4: Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  const isFormValid = formik.values.name && formik.values.email && formik.values.password;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-background-color p-5 space-y-5 md:space-y-0 md:space-x-5">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img src={poster} alt="Sign Up" className="w-full max-w-sm md:max-w-full h-auto" />
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/3 bg-card-background p-6 md:p-10 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-highlight-color text-center">
          Sign up 
        </h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-3 bg-background-color text-text-color border border-gray-700 rounded-lg"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-3 bg-background-color text-text-color border border-gray-700 rounded-lg"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full p-3 bg-background-color text-text-color border border-gray-700 rounded-lg"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-3 text-text-color rounded-lg ${
              isFormValid ? 'bg-button-bg hover:bg-button-hover-bg' : 'bg-gray-500'
            }`}
          >
            Continue
          </button>
        </form>
        <p className="mt-4 text-subtext-color text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-highlight-color hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card-background p-6 rounded-lg shadow-lg w-1/4 md:w-1/3 relative">
            <button
              onClick={closeModal}
              className="h-5 absolute top-2 right-5 text-3xl text-subtext-color"
            >
              &times;
            </button>
            <h2 className="text-2xl text-highlight-color font-bold mb-4">Additional Details</h2>

            {errors && <p className="text-red-400 mb-4">{errors}</p>}

            <select
              name="profileType"
              className="w-full p-2 mb-4 bg-background-color text-text-color border rounded"
              onChange={handleModalChange}
            >
              <option value="">Profile Type</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-2 mb-4 bg-background-color text-text-color border rounded"
              onChange={handleModalChange}
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile Number"
              className="w-full p-2 mb-4 bg-background-color text-text-color border rounded"
              onChange={handleModalChange}
            />
            <input
              type="text"
              name="educationLevel"
              placeholder="Education Level"
              className="w-full p-2 mb-4 bg-background-color text-text-color border rounded"
              onChange={handleModalChange}
            />
            <input
              type="text"
              name="instituteName"
              placeholder="Institute Name"
              className="w-full p-2 mb-4 bg-background-color text-text-color border rounded"
              onChange={handleModalChange}
            />

            <button
              onClick={handleModalSubmit}
              className="w-full p-3 bg-button-bg hover:bg-button-hover-bg text-text-color rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
