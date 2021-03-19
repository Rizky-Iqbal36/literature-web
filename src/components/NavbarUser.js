import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Icon from "../asset/Icon.png";
import { Context } from "../context/Context";
const NavbarUser = () => {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const islogout = () => {
    return dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div style={{ color: "white", backgroundColor: "#161616" }}>
      <div
        style={{
          paddingRight: "100px",
          marginRight: "78px",
          paddingBottom: "69px",
        }}
      >
        <div
          className="container"
          style={{ font: "avenir", paddingTop: "28px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-20px",
            }}
            className="container"
          >
            <div className="col-11">
              <ul
                style={{
                  listStyle: "none",
                  color: "white",
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "18px",
                }}
              >
                <li
                  style={{
                    paddingRight: "40px",
                    cursor: "pointer",
                    color:
                      window.location.pathname === "/Profile" ? "#AF2E1C" : "",
                  }}
                  onClick={() => history.push(`/Profile`)}
                >
                  Profile
                </li>

                <li
                  style={{
                    paddingRight: "40px",
                    cursor: "pointer",
                    color:
                      window.location.pathname === "/MyCollection"
                        ? "#AF2E1C"
                        : "",
                  }}
                  onClick={() => history.push(`/MyCollection`)}
                >
                  My Collection
                </li>

                <li
                  style={{
                    paddingRight: "40px",
                    cursor: "pointer",
                    color:
                      window.location.pathname === "/AddLiterature"
                        ? "#AF2E1C"
                        : "",
                  }}
                  onClick={() => history.push(`/AddLiterature`)}
                >
                  Add Literature
                </li>

                <li style={{ cursor: "pointer" }} onClick={() => islogout()}>
                  Log Out
                </li>
              </ul>
            </div>
            <div
              className="col-1"
              style={{ marginTop: "-27.5px", cursor: "pointer" }}
            >
              <img
                className="responsive-img"
                src={Icon}
                alt="Logo"
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/Home`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
