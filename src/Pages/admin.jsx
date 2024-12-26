import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage,FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";



const AdminPanel = () => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Mock data for courses
  const [courses, setCourses] = useState([
    { id: 1, title: "React for Beginners", category: "Web Development" },
    { id: 2, title: "Node.js Fundamentals", category: "Backend" },
  ]);

  
    // Form validation schema using Yup
    const courseValidationSchema = Yup.object({
        title: Yup.string().required("Course title is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
        thumbnail: Yup.mixed().required("Thumbnail is required"),
        videos: Yup.array()
          .of(
            Yup.object({
              title: Yup.string().required("Video title is required"),
              link: Yup.string().url("Enter a valid URL").required("YouTube link is required"),
            })
          )
          .min(1, "At least one video is required"),
      });

  // Handlers
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCourseSubmit = (values, { resetForm }) => {
    const newCourse = {
      id: courses.length + 1,
      title: values.title,
      category: values.category,
      videos:values.videos,
    };
    setCourses([...courses, newCourse]);
    resetForm();
    alert("Course Added Successfully!");
    handlePageChange('dashboard');
    
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  // Components for Pages
  const Dashboard = () => (
    <div>
      <h1 className="text-4xl font-bold text-highlight-color mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["add-course", "manage-courses", "tasks", "transactions"].map((page) => (
          <div
            key={page}
            onClick={() => handlePageChange(page)}
            className="cursor-pointer p-6 bg-card-background text-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold capitalize">{page.replace("-", " ")}</h2>
          </div>
        ))}
      </div>
    </div>
  );

  const AddCourse = () => (
    <div className="w-full max-w-2xl mx-auto bg-card-background p-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-highlight-color mb-6">Add Course</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          category: "",
          price: "",
          thumbnail: null,
          videos: [{ title: "", link: "" }],
        }}
        validationSchema={courseValidationSchema}
        onSubmit={handleCourseSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <div>
              <Field
                type="text"
                name="title"
                placeholder="Course Title"
                className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Course Description"
                className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                type="text"
                name="category"
                placeholder="Category/Tags"
                className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <Field
                type="number"
                name="price"
                placeholder="Price (₹)"
                className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <input
                type="file"
                placeholder="Thumbnail Image"
                name="thumbnail"
                onChange={(event) => setFieldValue("thumbnail", event.currentTarget.files[0])}
                className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600"
              />
              <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Videos</h3>
              <FieldArray name="videos">
                {({ push, remove }) => (
                  <div>
                    {values.videos.map((video, index) => (
                      <div key={index} className="space-y-4 mb-6">
                        <Field
                          type="text"
                          name={`videos[${index}].title`}
                          placeholder={`Video ${index + 1} Title`}
                          className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
                        />
                        <ErrorMessage
                          name={`videos[${index}].title`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        <Field
                          type="text"
                          name={`videos[${index}].link`}
                          placeholder={`Video ${index + 1} YouTube Link`}
                          className="w-full p-4 bg-background-color text-text-color rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-highlight-color"
                        />
                        <ErrorMessage
                          name={`videos[${index}].link`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 underline text-sm"
                          >
                            Remove Video
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ title: "", link: "" })}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Video
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <button
              type="submit"
              className="w-full bg-button-bg hover:bg-button-hover-bg text-white font-semibold py-4 rounded-lg transition-colors"
            >
              Add Course
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  const ManageCourses = () => (
    <div>
      <h1 className="text-4xl font-bold text-highlight-color mb-6">Manage Courses</h1>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="p-4 bg-card-background rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-text-color">{course.title}</h2>
              <p className="text-subtext-color">{course.category}</p>
            </div>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  // Page Rendering
  return (
    <div className="min-h-screen bg-background-color text-text-color p-10">
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "add-course" && <AddCourse />}
      {currentPage === "manage-courses" && <ManageCourses />}
      {currentPage !== "dashboard" && (
        <button
          onClick={() => handlePageChange("dashboard")}
          className="mt-6 bg-button-bg text-white px-4 py-2 rounded-lg hover:bg-button-hover-bg transition-colors"
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
};

export default AdminPanel;
