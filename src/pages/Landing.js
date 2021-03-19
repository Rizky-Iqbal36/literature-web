import React from "react";
import { Button } from "react-bootstrap";
import Icon from "../asset/Icon.png";
import Background from "../asset/gambar.png";

import Signup from "../components/Signup";
import Signin from "../components/Signin";

const Landing = () => {
  const [modalShowsignin, setModalShowsignin] = React.useState(false);
  const [modalShowsignup, setModalShowsignup] = React.useState(false);
  return (
    <div
      style={{ color: "white", marginTop: "-28px", backgroundColor: "#161616" }}
    >
      <div className="container-fluid" style={{ paddingBottom: "42.5px" }}>
        <div className="row" style={{ padding: "29px 0px 110px 78px" }}>
          <img className="responsive-img" src={Icon} alt="Logo" />
        </div>
        <div className="row">
          <div className="col" style={{ marginLeft: "58px" }}>
            <h1
              style={{
                fontFamily: "Time New Rowman",
                fontSize: "96px",
                fontWeight: "700",
              }}
            >
              source <em>of</em>
              <br></br>
              intelligence
            </h1>
            <p style={{ fontSize: "24px" }}>
              Sign-up and receive unlimited access to all<br></br>
              of your literatur - share your literatur.
            </p>
            <section
              className="button"
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "25px",
              }}
            >
              <Button
                variant="none"
                style={{
                  marginBottom: "20px",
                  width: "42.5%",
                  backgroundColor: "#AF2E1C",
                  color: "white",
                }}
                onClick={() => setModalShowsignup(true)}
              >
                Sign Up
              </Button>

              <Signup
                show={modalShowsignup}
                onHide={() => setModalShowsignup(false)}
              />

              <Button
                variant="none"
                style={{
                  marginBottom: "20px",
                  width: "42.5%",
                  backgroundColor: "white",
                  color: "black",
                  marginLeft: "31px",
                }}
                variant="none"
                onClick={() => setModalShowsignin(true)}
              >
                Sign in
              </Button>
              <Signin
                show={modalShowsignin}
                onHide={() => setModalShowsignin(false)}
              />
            </section>
          </div>
          <div
            className="col"
            style={{ marginTop: "-130px", marginRight: "50px" }}
          >
            <img src={Background} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
