import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { Context } from "../../context/Context";
import Attach from "../../asset/Attach.png";
import AlertModal from "../../components/AlertModal";
import NavbarUser from "../../components/NavbarUser";
const AddLiterature = () => {
  const [state, dispatch] = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [when, setWhen] = useState("");

  //var getYear = parseInt(when.substring(0,4));
  let getYear = 0;
  if (when) {
    getYear = parseInt(when.substr(0, 4));
  }
  console.log(getYear);

  const SUPPORTED_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_FORMATS_FILE = ["application/pdf", "application/epub+zip"];

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      uploadBy: state.user.id,
      title: "",
      publication: "",
      pages: "",
      ISBN: "",
      author: "",
      file: "",
      thumbnail: "",
      status: "Waiting to be verified",
    },
    validationSchema: Yup.object({
      title: Yup.string().required().min(3),
      publication: Yup.string().required(),
      pages: Yup.number().required(),
      ISBN: Yup.number().required().min(12),
      author: Yup.string().required(),
      thumbnail: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept image filetype",
          (value) => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
        ),
      file: Yup.mixed()
        .required()
        .test(
          "fileFormat",
          "Sorry only accept epub/pdf filetype",
          (value) => value && SUPPORTED_FORMATS_FILE.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      console.log(values);

      storeLiterature(values);
      resetForm({ values: "" });
    },
  });

  const [storeLiterature, { isLoading, error }] = useMutation(
    async (values) => {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        formData.append("uploadBy", values.uploadBy);
        formData.append("title", values.title);
        formData.append("publication", values.publication);
        formData.append("pages", values.pages);
        formData.append("ISBN", values.ISBN);
        formData.append("author", values.author);
        formData.append("file", values.file);
        formData.append("thumbnail", values.thumbnail);
        formData.append("status", values.status);
        formData.append("year", getYear);

        console.log(formData);

        const res = await API.post("/literature", formData, config);

        setShowAlert(true);
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      }
    }
  );
  return (
    <>
      <NavbarUser />
      <div style={{ backgroundColor: "#161616" }}>
        <div
          className="container"
          style={{ color: "white", paddingBottom: "100px", marginLeft: "78px" }}
        >
          <div
            className="row"
            style={{
              fontFamily: "times news roman",
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: "101.5%",
              marginBottom: "39px",
            }}
          >
            Add Literature
          </div>
          <div style={{ marginLeft: "-20px" }}>
            {errorMsg ? (
              <Alert variant="danger">{errorMsg || error}</Alert>
            ) : null}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  {...getFieldProps("title")}
                />
                <Form.Text className="text-muted">
                  {touched.title && errors.title ? (
                    <p style={{ color: "red" }}>{errors.title}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group onChange={(e) => setWhen(e.target.value)}>
                <Form.Control
                  type="date"
                  placeholder="Publication Date"
                  name="publication"
                  {...getFieldProps("publication")}
                  style={{ width: "100%", marginTop: "31px" }}
                />
                <Form.Text className="text-muted">
                  {touched.publication && errors.publication ? (
                    <p style={{ color: "red" }}>{errors.publication}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Pages"
                  name="pages"
                  {...getFieldProps("pages")}
                  style={{ width: "100%", marginTop: "31px" }}
                />
                <Form.Text className="text-muted">
                  {touched.pages && errors.pages ? (
                    <p style={{ color: "red" }}>{errors.pages}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="ISBN"
                  name="ISBN"
                  {...getFieldProps("ISBN")}
                  style={{ width: "100%", marginTop: "31px" }}
                />
                <Form.Text className="text-muted">
                  {touched.ISBN && errors.ISBN ? (
                    <p style={{ color: "red" }}>{errors.ISBN}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  name="author"
                  {...getFieldProps("author")}
                  style={{ width: "100%", marginTop: "31px" }}
                />
                <Form.Text className="text-muted">
                  {touched.author && errors.author ? (
                    <p style={{ color: "red" }}>{errors.author}</p>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <div className="form-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => {
                      setFieldValue("thumbnail", e.target.files[0]);
                    }}
                    id="thumbnail"
                  />
                  <label
                    for="thumbnail"
                    style={{
                      padding: "10px 0px 10px 20px",
                      borderColor: "grey",
                      borderStyle: "solid",
                      borderRadius: "5px",
                      borderWidth: "thin",
                      borderColor: "#D2D2D2",
                      cursor: "pointer",
                    }}
                  >
                    Attach Literature thumbnail{" "}
                    <img
                      src={Attach}
                      style={{ paddingLeft: "50px", paddingRight: "10px" }}
                    />
                  </label>
                  <span className="help-block text-danger">
                    {touched.thumbnail ? errors.thumbnail : ""}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => {
                      setFieldValue("file", e.target.files[0]);
                    }}
                    id="file"
                  />
                  <label
                    for="file"
                    style={{
                      padding: "10px 0px 10px 20px",
                      borderColor: "grey",
                      borderStyle: "solid",
                      borderRadius: "5px",
                      borderWidth: "thin",
                      borderColor: "#D2D2D2",
                      cursor: "pointer",
                    }}
                  >
                    Attach Literature file{" "}
                    <img
                      src={Attach}
                      style={{ paddingLeft: "50px", paddingRight: "10px" }}
                    />
                  </label>
                  <span className="help-block text-danger">
                    {touched.file ? errors.file : ""}
                  </span>
                </div>
              </div>
              <div className="float-right">
                <Button
                  variant="none"
                  type="submit"
                  style={{
                    backgroundColor: "#ee4622",
                    color: "white",
                    font: "avenir",
                  }}
                >
                  Add Literature
                </Button>
              </div>
            </Form>
            <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Your literature has been successfully carried out</p>
                <p>please wait 1 x 24 hours to verify this literature</p>
              </div>
            </AlertModal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLiterature;
