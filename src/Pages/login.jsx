import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import poster from '../Utils/poster.png';
import { setLoginAct, setLoggedInUserAct } from "../store/auth/authslice";
import { loginUserAct, getLoggedInuserAct } from "../store/auth/auththunk";
import { generateApiUrl } from "../api/apihealper";
import { setLocalStorage, getLocalStorage } from "../Utils/storageutility";
import { refreshTokenKey, accessTokenKey } from "../constants/storageconstants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginResp, loggedInUserResp, authErrorResp } = useSelector(({ auth }) => ({
    loginResp: auth.loginResp,
    loggedInUserResp: auth.loggedInUserResp,
    authErrorResp: auth.authErrorResp
  }), shallowEqual); 

  const loginRespRef = useRef({
    prevLoginResp: loginResp,
    prevLoggedInUserResp: loggedInUserResp
  })

  useEffect(() => {
    const { prevLoginResp, prevLoggedInUserResp } = loginRespRef.current;

    if (loginResp && loginResp !== prevLoginResp) {
      const { token } = loginResp;
      setLocalStorage(accessTokenKey, token);
      setLocalStorage(refreshTokenKey, token);
      dispatch(getLoggedInuserAct(generateApiUrl("loggedin_user")));
      navigate('/dashboard');
    }

    if (loggedInUserResp && loggedInUserResp !== prevLoggedInUserResp) {
      dispatch(setLoggedInUserAct(undefined));
      navigate('/dashboard');
    }

    loginRespRef.current.prevLoginResp = loginResp;
    loginRespRef.current.prevLoggedInUserResp = loggedInUserResp;
  }, [loginResp, loggedInUserResp, dispatch, navigate]);

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
      // Dispatch the login thunk
      dispatch(loginUserAct(generateApiUrl("login"), values));
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
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}

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
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            {/* Log in button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
              >
                Login
              </button>
            </div>

            <p className="flex justify-center">
              or
              <Link className="text-purple-700 underline font-bold ml-1" to="/forget-password">
                Forget Password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
