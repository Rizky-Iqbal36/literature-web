import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Icon from "../asset/Icon.png";
import "./landing.css";

import Signin from "../components/Signin";
import Signup from "../components/Signup";
const Landing = () => {
  const [modalShowsignin, setModalShowsignin] = useState(false);
  const [modalShowsignup, setModalShowsignup] = useState(false);
  return (
    <div
      className="container-fluid"
      id="landing"
      style={{ backgroundColor: "#161616" }}
    >
      <img src={Icon} alt="Logo" />
      <section>
        <div className="content">
          <div className="row">
            <div className="col">
              <h1>
                source <em>of</em>
                <br></br>
                intelligence
              </h1>
              <p>
                Sign-up and receive unlimited access to all<br></br>
                of your literature - share your literature.
              </p>
              <section className="button">
                <Button
                  variant="none"
                  id="signup"
                  onClick={() => setModalShowsignup(true)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="none"
                  id="signin"
                  style={{ marginLeft: "31px" }}
                  onClick={() => setModalShowsignin(true)}
                >
                  Sign In
                </Button>
                <Signup
                  show={modalShowsignup}
                  onHide={() => setModalShowsignup(false)}
                />
                <Signin
                  show={modalShowsignin}
                  onHide={() => setModalShowsignin(false)}
                />
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
