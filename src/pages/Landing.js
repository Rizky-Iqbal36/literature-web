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
      <div style={{ margin: "28px 0px 0px 78px" }}>
        <img className="responsive-img" src={Icon} alt="Logo" />
      </div>
      <div className="body" style={{ padding: "20px 122px 0px 78px" }}>
        <div
          style={{
            padding: "0px 122px 100px 0px",
            backgroundImage: "url(" + Background + ")",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div style={{ paddingBottom: "93px" }}>
            <h1
              style={{
                fontFamily: "Time New Rowman",
                fontSize: "96px",
                fontWeight: "700",
                paddingTop: "100px",
                paddingBottom: "35px",
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
                  width: "18%",
                  backgroundColor: "#ee4622",
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
                  width: "18%",
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
        </div>
      </div>
    </div>
  );
};

export default Landing;
