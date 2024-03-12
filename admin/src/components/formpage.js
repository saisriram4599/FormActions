import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          courses: [...prevData.courses, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          courses: prevData.courses.filter((course) => course !== value),
        }));
      }
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    if (formData.mobileNo.length !== 10) {
      alert("Mobile number must be 10 digits long.");
      return; // Prevent form submission
    }
    axios
      .post("http://localhost:3001/add-details", formData)
      .then(() => {
        console.log("Form submitted successfully");
        // Navigate to the show page after successful submission
        window.location.href = "/show"; // Redirect to the show page
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form action="/show" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="option 1">Option 1</option>
            <option value="option 2">Option 2</option>
            <option value="option 3">Option 3</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Courses:</label>
          <div>
            <input
              type="checkbox"
              name="course"
              value="course1"
              onChange={handleChange}
            />
            <label>Course 1</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="course"
              value="course2"
              onChange={handleChange}
            />
            <label>Course 2</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="course"
              value="course3"
              onChange={handleChange}
            />
            <label>Course 3</label>
          </div>
        </div>
        {/* <div>
          <label>Image Upload:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
