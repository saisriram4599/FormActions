import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [editedDetail, setEditedDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-details/${id}`);
        setDetail(response.data);
        setEditedDetail({ ...response.data });
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/update-detail/${id}`, editedDetail);
      console.log("Detail updated successfully");
    } catch (error) {
      console.error('Error updating detail:', error);
    }
  };

  if (!detail) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Detail</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={editedDetail.name} onChange={handleChange} /><br />
        <label>Email:</label>
        <input type="email" name="email" value={editedDetail.email} onChange={handleChange} /><br />
        <label>Mobile No:</label>
        <input type="text" name="mobileNo" value={editedDetail.mobileNo} onChange={handleChange} /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
