import React, { useState } from 'react';
import VideoPlayer from '../component/videoPlayer';
import CourseContent from '../component/CourseContent';

const CoursePage = () => {
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const lectures = [
    { title: 'Introduction to React', src: 'https://www.youtube.com/embed/-6fk3PXpznY' },
    { title: 'Understanding Components', src: 'https://www.youtube.com/embed/sBws8MSXN7A' },
    { title: 'State and Props', src:"https://www.youtube.com/embed/qy4-HhU0_RU?si=CaaQTjrlgsCRPw3" },
  ];

  const handleNextLecture = () => {
    if (currentLectureIndex < lectures.length - 1) {
      setCurrentLectureIndex(currentLectureIndex + 1);
    }
  };

  const handleLectureSelect = (index) => {
    setCurrentLectureIndex(index);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Side: Video Player */}
      <div className="w-2/3 p-6">
        <VideoPlayer videoSrc={lectures[currentLectureIndex].src} />
        <div className="flex justify-between mt-4">
          <p className="text-lg font-semibold text-gray-700">
            {lectures[currentLectureIndex].title}
          </p>
          <button
            className={`p-2 rounded text-white ${
              currentLectureIndex < lectures.length - 1
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleNextLecture}
            disabled={currentLectureIndex >= lectures.length - 1}
          >
            Next Lecture
          </button>
        </div>
      </div>

      {/* Right Side: Course Content */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
        <CourseContent
          lectures={lectures}
          currentLectureIndex={currentLectureIndex}
          onLectureSelect={handleLectureSelect}
        />
      </div>
    </div>
  );
};

export default CoursePage;
