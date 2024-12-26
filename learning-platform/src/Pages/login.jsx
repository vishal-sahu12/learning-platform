import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import poster from '../Utils/poster.png';
import { setLocalStorage } from "../Utils/storageutility";
import { refreshTokenKey, accessTokenKey } from "../constants/storageconstants";
import ShimmerLoader from '../component/ShimmerLoader';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginResp, authErrorResp } = useSelector(({ auth }) => ({
    loginResp: auth.loginResp,
    authErrorResp: auth.authErrorResp
  }), shallowEqual);

  useEffect(() => {
    if (loginResp && loginResp.UserInfo?.usertoken) {
      const token = loginResp.UserInfo.usertoken;
      setLocalStorage(accessTokenKey, token);
      setLocalStorage(refreshTokenKey, token);
      navigate('/home');
      toast.success("Login successful! Redirecting...");
    } else if (authErrorResp) {
      toast.error(authErrorResp.message || "Login failed. Please try again.");
    }
  }, [loginResp, authErrorResp, navigate]);

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
      // Replace this line with your login API dispatch logic
      dispatch(/* login action here */);
    }
  });

  useEffect(() => {
    setLoading(false);
  }, [loginResp, authErrorResp]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background-color text-text-color">
      {/* Left Side Image */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-card-background p-6">
        <img src={poster} alt="Login Illustration" className="max-w-xs md:max-w-md" />
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-background-color p-6 md:p-10">
        <div className="w-full max-w-md bg-card-background p-8 rounded-md shadow-lg">
          <h2 className="text-4xl font-semibold text-highlight-color flex justify-center mb-6">
            Log in 
          </h2>

          {loading ? (
            <ShimmerLoader />
          ) : (
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-subtext-color">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full mt-2 p-3 border border-gray-600 rounded-lg bg-card-background text-text-color focus:outline-none focus:ring-highlight-color focus:border-highlight-color"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}

                <label htmlFor="password" className="mt-3 block text-sm font-medium text-subtext-color">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full mt-2 p-3 border border-gray-600 rounded-lg bg-card-background text-text-color focus:outline-none focus:ring-highlight-color focus:border-highlight-color"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </div>

              {/* Log in button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 bg-button-bg text-text-color p-3 rounded-lg hover:bg-button-hover-bg transition"
                >
                  Login
                </button>
              </div>

              <p className="flex justify-center">
                or
                <Link className="text-highlight-color underline font-bold ml-1" to="/forget-password">
                  Forget Password
                </Link>
              </p>
            </form>
          )}

          <p className="flex justify-center mt-5">
            Don't Have An Account
            <Link className="text-highlight-color underline font-bold ml-1" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
