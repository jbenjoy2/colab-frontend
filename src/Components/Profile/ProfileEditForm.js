import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";
import "./ProfileEditForm.scss";
import ProfilePictureUpload from "../User/profilePicture";

function ProfileEditForm({ user, updateUser }) {
  const [showModal, setShowModal] = useState(false);
  const [current] = useState(user);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: current.firstName,
    lastName: current.lastName,
    email: current.email,
    username: current.username,
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    const username = formData.username;

    try {
      await updateUser(username, profileData);
      setSuccess(true);
    } catch (error) {
      setFormErrors(error);
      return;
    }
  };

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 mt-5">
      <h3 className="text-light">Edit Profile</h3>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center mb-4">
            <div className="d-flex flex-column align-items-center">
              <div className="profile-pic" onClick={() => setShowModal(true)}>
                <img
                  src={user.imageURL}
                  width={80}
                  alt="profile-pic"
                  className="rounded-circle profile-pic-image"
                />
                <div className="profile-pic-upload-overlay">
                  <FontAwesomeIcon icon={faUpload} color="white" size="3x" />
                </div>
              </div>
              <div className="font-weight-bold">@{user.username}</div>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
              className="mt-2 mb-0"
            >
              Updated!
            </Alert>
          )}
        </div>
      </div>
      <ProfilePictureUpload
        setShowModal={setShowModal}
        showModal={showModal}
        user={user}
      />
    </div>
  );
}

export default ProfileEditForm;
