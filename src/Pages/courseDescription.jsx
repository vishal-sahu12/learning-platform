import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./colors.css";

const CourseDescription = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const { course: subCourse } = location.state || {};

  const handleBuyNow = async () => {
    if (!subCourse) {
      alert("Course details not found!");
      return;
    }

    const headers = localStorage.getItem('token')
    console.log(headers)

    try {
      // 1. Send POST request to backend
      const response = await axios.post("http://localhost:3000/payment/initiate-payment",  {
        userId: 4, // Replace with actual userId
        courseId: 4, // Assuming subCourse has an `id` property
      });

      const paymentData = response.data;

      // 2. Initialize Razorpay options
      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: paymentData.name,
        description: paymentData.description,
        image: paymentData.image,
        order_id: paymentData.order_id,
        callback_url: paymentData.callback_url,
        prefill: paymentData.prefill,
        theme: paymentData.theme,
        handler: function (paymentResponse) {
          // 3. Handle payment success
          console.log("Payment successful!", paymentResponse);

          // Optionally, verify payment on your backend
          axios.post("https://your-backend-url.com/api/payment/verify", {
            ...paymentResponse,
            courseId: subCourse.id,
            userId: 8, // Replace with actual userId
          });
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed.");
          },
        },
      };

      // 3. Open Razorpay payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Unable to process payment. Please try again later.");
    }
  };

  if (!subCourse) {
    return <div>Course details not found!</div>;
  }

  return (
    <div className="p-8" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
      {/* Course Title and Overview */}
      <div className="flex justify-evenly mb-10">
        {/* Left Side */}
        <div className="w-3/5">
          <h1 className="text-3xl font-bold mb-4">{subCourse.name}</h1>
          <p className="text-xl mb-4">{subCourse.description}</p>
          <h3>{subCourse.duration}</h3>
          <div className="flex items-center mb-4">
            <span className="font-bold text-xl mr-2" style={{ color: "var(--highlight-color)" }}>4.7</span>
            <span style={{ color: "var(--subtext-color)" }}>(402,262 ratings) • 1,339,358 students</span>
          </div>
          <p>
            Created by{" "}
            <span style={{ color: "var(--highlight-color)", textDecoration: "underline", fontWeight: "bold" }}>
              Vishal Sahu
            </span>
          </p>
          <p style={{ color: "var(--subtext-color)" }}>Last updated 8/2024</p>

          {/* Course Details Sections */}
          <div className="space-y-8">
            {/* What You'll Learn */}
            <div className="mt-3 p-6 rounded-lg" style={{ backgroundColor: "var(--card-background)" }}>
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Build modern websites using HTML, CSS, and JavaScript</li>
                <li>Understand the fundamentals of Web3 and decentralized apps</li>
                <li>Create full-stack applications with Node and React</li>
                <li>Master PostgreSQL for database management</li>
                <li>Deploy applications to the cloud</li>
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--card-background)" }}>
              <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>A computer with internet access</li>
                <li>Basic understanding of programming concepts</li>
                <li>No prior web development experience needed</li>
              </ul>
            </div>

            {/* Description */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--card-background)" }}>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p style={{ color: "var(--text-color)" }}>
                This comprehensive web development bootcamp is designed for beginners and experienced developers alike.
                From front-end basics to advanced back-end topics, this course covers everything you need to build professional websites and applications.
              </p>
              <p className="mt-4" style={{ color: "var(--text-color)" }}>
                With hands-on projects and real-world examples, you'll gain practical skills that employers value. Whether
                you're looking to start a career in tech or enhance your current skills, this course is for you!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/4 h-min p-6 rounded-lg flex flex-col items-center" style={{ backgroundColor: "var(--card-background)" }}>
          {/* Video player */}
          <div className="w-full h-48">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg"
              controls
              playsInline
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4" // Example video source
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 flex space-x-4"></div>
          <p className="text-2xl mb-2" style={{ color: "var(--line-through-color)", textDecoration: "line-through" }}>₹3,099</p>
          <p className="text-3xl font-bold mt-4" style={{ color: "var(--text-color)" }}>₹499</p>
          <p className="mb-6" style={{ color: "var(--discount-color)" }}>84% off • 2 days left at this price!</p>
          <button
            className="px-6 py-3 rounded-md font-semibold mb-4"
            style={{ backgroundColor: "var(--button-bg)", color: "var(--text-color)" }}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
