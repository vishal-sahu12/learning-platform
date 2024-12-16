import { useState, useEffect } from 'react';
import logo from '../logo.svg';
import poster from '../Utils/poster.png';
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import "./colors.css";

const banners = [
  { id: 1, image: poster },
  { id: 2, image: poster },
  { id: 3, image: poster },
];

function Home() {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(1); // Default category set to 1
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setIsLoggedIn(true);
      const userObject = JSON.parse(token);
      const firstName = userObject.UserName.split(' ')[0];
      setUsername(firstName);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getCourses = await axios.get("http://localhost:3000/api/courses");
      const getCategories = await axios.get("http://localhost:3000/api/categories");
  
      // Extracting the courses data correctly
      const coursesData = getCourses.data.data?.courses || [];
      const categoriesData = getCategories.data|| [];
  
      console.log("Courses response:", coursesData); // Debugging
      console.log("Categories response:", categoriesData); // Debugging
  
      setCourses(coursesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const handleSignUp = () => navigate('/signup');
  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const filteredCourses = activeCategoryId
    ? courses.filter((course) => course.category_id === activeCategoryId)
    : courses;
    
    const otherCourses = courses.filter((course) => course.category_id !== activeCategoryId);

    
  // Group courses by category_id
  const groupCoursesByCategory = () => {
    return courses.reduce((grouped, course) => {
      if (!grouped[course.category_id]) {
        grouped[course.category_id] = [];
      }
      grouped[course.category_id].push(course);
      return grouped;
    }, {});
  };

  const groupedCourses = groupCoursesByCategory();

  // Exclude the active category
  const otherCategories = Object.keys(groupedCourses).filter(
    (categoryId) => parseInt(categoryId) !== activeCategoryId
  );



  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
  };

  return (
<div className="min-h-screen bg-background-color text-text">
  {/* Header */}
  <header className="flex items-center h-20 space-x-4 w-full justify-between px-4 sm:px-8">
    <div className="w-2/12">
      <img className="w-16 sm:w-20" src={logo} alt="logo" />
    </div>
    <div className="w-7/12">
      <input
        className="rounded-lg w-full h-10 p-2 border border-gray-300 bg-card-background text-subtext-color placeholder-subtext-color focus:outline-highlight-color"
        type="text"
        placeholder="Search Courses"
      />
    </div>
    <div className="flex flex-row w-3/12 sm:w-1/6 justify-around">
      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="w-24 h-12 bg-button-bg text-text rounded-md hover:bg-button-hover-bg"
          >
            {username}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-card-background border border-gray-700 w-48 mt-1 rounded-lg shadow-lg z-50">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-highlight-color cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-highlight-color cursor-pointer"
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </li>
                <li
                  className="px-4 py-2 hover:bg-highlight-color cursor-pointer"
                  onClick={() => navigate('/setting')}
                >
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-highlight-color cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <div
            onClick={handleLogin}
            className="w-24 h-12 bg-button-bg text-text rounded-md flex justify-center items-center hover:bg-button-hover-bg"
          >
            Login
          </div>
          <div
            onClick={handleSignUp}
            className="w-24 h-12 bg-button-bg text-text rounded-md flex justify-center items-center hover:bg-button-hover-bg"
          >
            Sign Up
          </div>
        </>
      )}
    </div>
  </header>

  {/* Slider */}
  <Slider {...sliderSettings} className="mt-4">
    {banners.map((banner) => (
      <div key={banner.id}>
        <img className="w-full mb-4 rounded-lg shadow-lg" src={banner.image} alt={`Banner ${banner.id}`} />
      </div>
    ))}
  </Slider>

  {/* Welcome Section */}
  <div className="px-4 sm:px-10 text-center mt-6">
    <h1 className="text-3xl sm:text-5xl font-bold text-highlight-color mb-3">
      Welcome to The Learning Platform
    </h1>
    <h3 className="text-xl sm:text-2xl text-subtext-color">
      Discover Design, Finance, and Tech Courses
    </h3>
  </div>

 {/* Categories */}
 <div className="bg-card-background w-full mt-10 p-5">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.category_id}
              className={`px-6 py-2 border rounded-full text-lg font-medium ${
                activeCategoryId === category.category_id
                  ? 'bg-highlight-color text-white border-transparent'
                  : 'bg-background text-subtext-color border-highlight-color hover:bg-highlight-color hover:text-text'
              }`}
              onClick={() => handleCategoryClick(category.category_id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

     {/* Selected Category Courses */}
     <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link key={course.course_id} to={`/course/${course.title}`} state={{ course }}>
              <div className="bg-card-background p-6 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                <img
                  src={poster}
                  alt={course.title}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold text-highlight-color mb-2">{course.title}</h3>
                <p className="text-subtext-color mb-3">{course.description}</p>
                <p className="text-highlight-color font-semibold">Price: ₹{course.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-subtext-color">No courses available for this category.</p>
        )}
      </div>

  
     {/* Other Categories and Courses */}
     <div className="mt-10 px-5">
        {otherCategories.map((categoryId) => {
          const category = categories.find((cat) => cat.category_id === parseInt(categoryId));
          const categoryCourses = groupedCourses[categoryId];

          return (
            <div key={categoryId} className="mb-10">
              <h2 className="text-2xl font-bold text-highlight-color mb-4">{category?.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryCourses.map((course) => (
                  <Link key={course.course_id} to={`/course/${course.title}`} state={{ course }}>
                    <div className="bg-card-background p-6 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
                      <img
                        src={poster}
                        alt={course.title}
                        className="w-full h-40 object-cover mb-4 rounded-lg"
                      />
                      <h3 className="text-xl font-bold text-highlight-color mb-2">{course.title}</h3>
                      <p className="text-subtext-color mb-3">{course.description}</p>
                      <p className="text-highlight-color font-semibold">Price: ₹{course.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>


  {/* Footer */}
  <footer className="w-full bg-footer-bg text-subtext-color p-6 text-center mt-10">
    <div className="space-y-2 ">
      <h3 className="cursor-pointer text-subtext-color hover:text-highlight-color">Contact Us</h3>
      <h3 className="cursor-pointer text-subtext-color hover:text-highlight-color">About Us</h3>
      <h3 className="cursor-pointer text-subtext-color hover:text-highlight-color">Terms</h3>
      <h3 className="cursor-pointer text-subtext-color hover:text-highlight-color">Privacy Policy</h3>
      <h1>Made with 💗 by Vishal Sahu</h1>
    </div>
  </footer>
</div>

  )};


export default Home;
