import { useState, React } from 'react';
import logo from '../logo.svg';
import poster from '../Utils/poster.png';
import { useNavigate } from "react-router-dom";
import courseData from '../constants/coursesDetails';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  { id: 1, image: poster },
  { id: 2, image: poster },
  { id: 3, image: poster },
];

function Home() {
  const [activeCategory, setActiveCategory] = useState(courseData.courses[0]);
  const [activeSubCategory, setActiveSubCategory] = useState(courseData.courses[0].courses[0]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveSubCategory(category.courses[0]);
  };

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
    <div className="HomePage">
    <header className='flex items-center h-20 space-x-4 w-full bg-gray-500 justify-between px-4 sm:px-8'>
  <div className='w-2/12'>
    <img className='w-16 sm:w-20' src={logo} alt="logo" />
  </div>
  <div className='w-7/12'>
    <input className='rounded-lg w-full h-10 p-2' type="text" placeholder='Search Courses' />
  </div>
  <div className='flex flex-row sm:flex-row  place-content-around w-3/12 sm:w-1/6'>
    <div onClick={handleLogin} className=' w-24 h-12 bg-white flex justify-center items-center rounded-md text-black hover:text-white hover:bg-black'>
      Login
    </div>
    <div onClick={handleSignUp} className='  w-24 h-12 bg-white flex justify-center items-center rounded-md text-black  hover:text-white hover:bg-black'>
      Sign Up
    </div>
  </div>
</header>


      <div>
        <div>
          <Slider {...sliderSettings}>
            {banners.map((banner) => (
              <div key={banner.id}>
                <img className='w-full mb-4' src={banner.image} alt={`Banner ${banner.id}`} />
              </div>
            ))}
          </Slider>
        </div>

        <h1 className='text-3xl sm:text-5xl font-bold ml-4 mb-3 px-4 sm:px-10'>Welcome to The Learning Platform</h1>
        <h3 className='text-xl sm:text-2xl ml-4 px-4 sm:px-10'>Here You get Design, Finance, Tech Related Courses</h3>

        {/* Categories */}
        <div className='bg-white w-full h-10 mt-10 overflow-x-auto'>
          <div className='flex'>
            {courseData.courses.map((category, index) => (
              <button
                key={index}
                className={`text-lg sm:text-3xl mr-5 px-5 sm:px-14 ${activeCategory.category === category.category ? 'text-black' : 'text-gray-400'} hover:text-black`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div className='flex flex-wrap ml-4 mt-10'>
          {activeCategory.courses.map((subCategory, index) => (
            <div
              key={index}
              onClick={() => handleSubCategoryClick(subCategory)}
              className={`w-full sm:w-56 h-12 sm:h-16 flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 rounded-full ${activeSubCategory.name === subCategory.name ? 'bg-black text-white' : 'bg-gray-600 text-gray-200'} hover:bg-black hover:text-white`}
            >
              {subCategory.name}
            </div>
          ))}
        </div>

        {/* Subcourses Grid */}
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5'>
          {activeSubCategory.subCourses.map((subCourse, index) => (
            <div key={index} className='bg-white p-4 border border-gray-300 rounded-lg shadow-lg'>
              <img src={poster} alt={subCourse.name} className='w-full h-40 object-cover mb-3 rounded-lg' />
              <h3 className='text-xl font-bold'>{subCourse.name}</h3>
              <p className='text-gray-700 mb-2'>{subCourse.description}</p>
              <p className='text-gray-700 mb-1'>Duration: {subCourse.duration}</p>
              <p className='text-gray-700'>Price: {subCourse.price}</p>
            </div>
          ))}
        </div>

        {/* Another Subcategory Section */}
        {courseData.courses.map((category, index) => (
          category !== activeCategory && (
            <div key={index} className='mt-10'>
              <h2 className='text-3xl font-bold ml-4 mb-5 px-4 sm:px-10'>{category.category}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5'>
                {category.courses.map((subCategory) => (
                  subCategory.subCourses.map((subCourse, subIndex) => (
                    <div key={subIndex} className='bg-white p-4 border border-gray-300 rounded-lg shadow-lg'>
                      <img src={poster} alt={subCourse.name} className='w-full h-40 object-cover mb-3 rounded-lg' />
                      <h3 className='text-xl font-bold'>{subCourse.name}</h3>
                      <p className='text-gray-700 mb-2'>{subCourse.description}</p>
                      <p className='text-gray-700 mb-1'>Duration: {subCourse.duration}</p>
                      <p className='text-gray-700'>Price: {subCourse.price}</p>
                    </div>
                  ))
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      <footer className='w-full bg-slate-700 text-white p-4 text-center'>
        <div>
          <h3>Contact Us</h3>
          <h3>About Us</h3>
          <h3>Terms</h3>
          <h3>Privacy Policy</h3>
          <h1>Made with 💗 by Vishal Sahu</h1>
        </div>
      </footer>
    </div>
  );
}

export default Home;
