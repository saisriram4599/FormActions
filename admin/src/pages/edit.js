import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    courses: [],
    image: "",
  });
  const id = useParams().id; // Get id from URL
  console.log(id);
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/get-details/${id}`
        );
        console.log(response.data);
        const { name, email, mobileNo, designation, gender, courses } =
          response.data;
        setFormData({ name, email, mobileNo, designation, gender, courses });
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevData[name], value]
            : prevData[name].filter((course) => course !== value)
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  const formDataToSend = new FormData();
      //  Object.entries(formData).forEach(([key, value]) => {
      //    if (Array.isArray(value)) {
      //      value.forEach((val) => formDataToSend.append(key, val));
      //    } else {
      //      formDataToSend.append(key, value);
      //    }
      //  });
      axios
        .put(`http://localhost:3001/update-detail/${id}`, formData)
        .then(() => console.log("values updated"))
        .catch((err) => console.log(err));
        window.location.href = '/show';

    } catch (error) {
      console.error("Error updating detail:", error);
    }
  };

  return (
    <div>
      <h1>Edit Detail</h1>
      <form onSubmit={handleSubmit}>
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
              name="courses"
              value="course1"
              checked={formData.courses.includes("course1")}
              onChange={handleChange}
            />
            <label>Course 1</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="courses"
              value="course2"
              checked={formData.courses.includes("course2")}
              onChange={handleChange}
            />
            <label>Course 2</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="courses"
              value="course3"
              checked={formData.courses.includes("course3")}
              onChange={handleChange}
            />
            <label>Course 3</label>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
