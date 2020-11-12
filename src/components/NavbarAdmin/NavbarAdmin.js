import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import { userContext } from "../../context/userContext";

import Icon from "../../asset/Icon.png";
import { BiBookAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { urlAsset } from "../../config/api";
import "./NavbarAdmin.css";
const NavbarAdmin = () => {
  const [state, dispatch] = useContext(userContext);

  const history = useHistory();
  if (!state.isLoginAdmin) {
    history.push(`/`);
  }
  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div id="NavbarAdmin" className="container-fluid">
      <div className="row">
        <div className="col-sm-11 col-md-11 col-lg-11 col-xl-11">
          <img src={Icon} alt="Icon" />
        </div>
        <div className="col-sm-1 col-md-1 col-lg-1 col-sm-1 col-xl-1">
          <Dropdown>
            <Dropdown.Toggle
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <img
                src={urlAsset.photo + state.user?.avatar}
                style={{
                  height: 50,
                  width: 50,
                  border: "5px solid #C4C4C4",
                  boxSizing: "border-box",
                  borderRadius: 25,
                }}
                alt="Avatar"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <Dropdown.Item
                as={Link}
                to="/HomeAdmin"
                style={{
                  marginBottom: ".5rem",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    window.location.pathname === "/HomeAdmin" ? "#0275d8" : "",
                  color:
                    window.location.pathname === "/HomeAdmin" ? "white" : "",
                  cursor:
                    window.location.pathname === "/HomeAdmin"
                      ? "default"
                      : "pointer",
                }}
              >
                <AiFillHome size={22} style={{ marginRight: 10 }} /> Admin Home
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/AdminAddLiterature"
                style={{
                  marginBottom: ".5rem",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    window.location.pathname === "/AdminAddLiterature"
                      ? "#0275d8"
                      : "",
                  color:
                    window.location.pathname === "/AdminAddLiterature"
                      ? "white"
                      : "",
                  cursor:
                    window.location.pathname === "/AdminAddLiterature"
                      ? "default"
                      : "pointer",
                }}
              >
                <BiBookAdd size={22} style={{ marginRight: 10 }} /> Add
                Literature
              </Dropdown.Item>
              <hr style={{ margin: 0 }} />
              <Dropdown.Item
                as={Button}
                style={{
                  marginTop: ".5rem",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => islogout()}
              >
                <FiLogOut
                  size={22}
                  style={{ marginRight: 10, color: "#ff0742" }}
                />{" "}
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
