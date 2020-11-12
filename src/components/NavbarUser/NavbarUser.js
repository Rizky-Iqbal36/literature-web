import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { Navbar, Nav } from "react-bootstrap";
import Icon from "../../asset/Icon.png";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";
import "./NavbarUser.css";
const NavbarUser = () => {
  const [state, dispatch] = useContext(userContext);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <Navbar expand="md" className="body">
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        {show ? (
          <RiToggleFill
            color="white"
            size={50}
            onClick={() => setShow(false)}
          />
        ) : (
          <RiToggleLine color="white" size={50} onClick={() => setShow(true)} />
        )}
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className="toggle">
        <Nav className="mr-auto">
          <Nav.Link
            style={{
              paddingRight: "40px",
              color:
                window.location.pathname === "/Profile" ? "#AF2E1C" : "white",
            }}
            onClick={() => history.push(`/Profile`)}
          >
            Profile
          </Nav.Link>
          <Nav.Link
            style={{
              paddingRight: "40px",
              color:
                window.location.pathname === "/MyCollection"
                  ? "#AF2E1C"
                  : "white",
            }}
            onClick={() => history.push(`/MyCollection`)}
          >
            My Collection
          </Nav.Link>
          <Nav.Link
            style={{
              paddingRight: "40px",
              color:
                window.location.pathname === "/UserAddLiterature"
                  ? "#AF2E1C"
                  : "white",
            }}
            onClick={() => history.push(`/UserAddLiterature`)}
          >
            Add Literature
          </Nav.Link>
          <Nav.Link onClick={() => islogout()} style={{ color: "white" }}>
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand>
        <img
          className="responsive-img"
          src={Icon}
          alt="Logo"
          style={{ cursor: "pointer", marginTop: "-25.5px" }}
          onClick={() => history.push(`/Home`)}
        />
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarUser;
