import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { useFormik } from "formik";
import { Context } from "../context/Context";
import Signup from "./Signup";
import * as Yup from "yup";
const Signin = (props) => {
  const [modalShowsignup, setModalShowsignup] = React.useState(false);
  const [state, dispatch] = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email required")
        .email("Format email tidak valid!"),
      password: Yup.string()
        .required("Password Required")
        .min(8, "Harus 8 karakter atau lebih!"),
    }),
    onSubmit: (values) => {
      loginAction(values);
    },
  });

  const [loginAction, { isLoading, error }] = useMutation(async (values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(values);
    try {
      const res = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });

      setAuthToken(res.data.data.token);
      try {
        const res = await API.get("/auth");
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
        if (!res.data.data.user.isAdmin) {
          return history.push(`/Home`);
        }
        dispatch({ type: "LOGIN_ADMIN" });
        return history.push(`/HomeAdmin`);
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      setErrorMsg(err.response.data.message);
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  });

  return (
    <Modal
      {...props}
      size="lg-6"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "white" }}
    >
      <div style={{ backgroundColor: "#161616" }}>
        {errorMsg ? <Alert variant="danger">{errorMsg || error}</Alert> : null}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>Sign In</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                {...getFieldProps("email")}
              />
              <Form.Text className="text-muted">
                {touched.email && errors.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                {...getFieldProps("password")}
              />
              <Form.Text className="text-muted">
                {touched.password && errors.password ? (
                  <p style={{ color: "red" }}>{errors.password}</p>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Button
              variant="none"
              type="submit"
              style={{
                marginBottom: "20px",
                width: "100%",
                backgroundColor: "#ee4622",
                color: "white",
              }}
            >
              Sign In
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>
              Jika belum memiliki akun silakan klik link{" "}
              <a href="#" onClick={props.onHide}>
                ini
              </a>
            </p>
          </div>
          <Signup
            show={modalShowsignup}
            onHide={() => setModalShowsignup(false)}
          />
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default Signin;
