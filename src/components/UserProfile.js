import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setUserData({ name: json.name, email: json.email });

        const response2 = await fetch(
          `http://localhost:5000/api/notes/fetchAllNotes`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const json2 = await response2.json();
        setNoteCount(json2.length);

        const modalElement = document.getElementById("exampleModal");
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();

        modalElement.addEventListener(
          "hidden.bs.modal",
          () => {
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
              backdrop.parentNode.removeChild(backdrop);
            }
            navigate("/");
          },
          { once: true }
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Your account</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4>Name: {userData.name}</h4>
              <h5>Email: {userData.email}</h5>
              <h5>Total notes: {noteCount}</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
