import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

const EditUser = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = `http://localhost:3000/users/${id}`;

  useEffect(() => {
    axios
      .get(getUserApi)
      .then((response) => setUser(response.data))
      .catch((error) => setError(error.message));
  }, [getUserApi]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(getUserApi, user);
      navigate("/show-user");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInput} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInput} />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default EditUser;
