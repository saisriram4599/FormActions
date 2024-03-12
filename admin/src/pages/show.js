import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Show.css'; // Import your CSS file

export const Show = () => {
  const [details, setDetails] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-details');
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Filter details array based on searchName
    const filteredDetails = details.filter(detail =>
      detail.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredDetails;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-details/${id}`);
      // Remove the deleted item from the details state
      setDetails(details.filter(detail => detail._id !== id));
      console.log("Detail deleted successfully");
    } catch (error) {
      console.error('Error deleting detail:', error);
    }
  };

  return (
    <div>
      <h1>Details</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="details-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {handleSearch().map((detail, index) => (
            <tr key={index}>
              <td>1</td>
              <td>{detail.name}</td>
              <td>{detail.email}</td>
              <td>{detail.mobileNo}</td>
              <td>{detail.designation}</td>
              <td>{detail.gender}</td>
              <td>{detail.courses}</td>
              <td>{detail.createdAt}</td>
              <td>
              <button> <Link to={`/edit/${detail._id}`}>Edit</Link> </button> 
                <button onClick={() => handleDelete(detail._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
