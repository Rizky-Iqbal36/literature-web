import React, { useState, useContext } from "react";
import { MdEmail, MdPlace } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { userContext } from "../../../context/userContext";
import { useQuery } from "react-query";
import { API, urlAsset } from "../../../config/api";
import { PageLoading } from "../../../components/Loading";
import Profile_addPP from "../../../components/Profile_addPP";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import LoadLiterature from "../../../components/LoadLiterature/LoadLiterature";
import "./Profile.css";
const Profile = () => {
  const [state] = useContext(userContext);
  const [modalShow, setModalShow] = React.useState(false);
  const { isLoading, error, data: User, refetch } = useQuery(
    "loadProfile",
    () => API.get(`/user/${state.user.id}`)
  );  
  return (
    <div className="body" id="profile" style={{ backgroundColor: "#161616" }}>
      <NavbarUser />
      {state.user === undefined || isLoading ? (
        <PageLoading />
      ) : (
        <main>
          <p>Profile</p>
          <div className="container-fluid" id="container">
            <div id="content">
              <div className="row-6" id="data">
                <div id="subData">
                  <div id="first">
                    <div className="logo">
                      <MdEmail size={30} color="#AF2E1C" />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "15px",
                      }}
                    >
                      <div className="DataUser">{state.user?.email}</div>
                      <div className="DetailDataUser">Email</div>
                    </div>
                  </div>
                </div>
                <div id="subData">
                  <div className="logo">
                    <FaTransgender size={30} color="#AF2E1C" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "15px",
                    }}
                  >
                    <div className="DataUser">{state.user?.gender}</div>
                    <div className="DetailDataUser">Gender</div>
                  </div>
                </div>
                <div id="subData">
                  <div className="logo">
                    <FaPhoneAlt size={30} color="#AF2E1C" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "15px",
                    }}
                  >
                    <div className="DataUser">{state.user?.phone}</div>
                    <div className="DetailDataUser">Phone</div>
                  </div>
                </div>
                <div id="subData">
                  <div className="logo">
                    <MdPlace size={30} color="#AF2E1C" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "15px",
                    }}
                  >
                    <div className="DataUser">{state.user?.address}</div>
                    <div className="DetailDataUser">Address</div>
                  </div>
                </div>
              </div>
              <div className="row-6" id="photo">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                  }}
                >
                  <img
                    alt="avatar"
                    className="figure-img img-fluid rounded"
                    src={urlAsset.photo + User.data.data.loadUser?.avatar}
                  />
                  <Button variant="none" onClick={() => setModalShow(true)}>
                    Change Photo Profile
                  </Button>
                  <Profile_addPP
                    refetch={() => refetch()}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
              </div>
            </div>
          </div>
          <p id="p2">My Literature</p>
          <LoadLiterature route="PROFILE" />
        </main>
      )}
    </div>
  );
};

export default Profile;
